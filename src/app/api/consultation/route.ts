import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ConsultationSchema = z.object({
  selectedCategory: z.enum(["dehumidifier", "air-purifier"]).optional(),
  selectedModel: z.enum(["THE6500_150", "THE6500_200", "TAA931", "TAA530", "TAE330", "TAE530"]),
  orderType: z.enum(["rental", "purchase"]),
  paymentMethod: z.enum(["lotte", "hana"]),
  photoCount: z.coerce.number().int().min(0).max(4).optional(),
  submittedAt: z.string().optional(),
});

const MODEL_CATEGORY_MAP: Record<string, "dehumidifier" | "air-purifier"> = {
  THE6500_150: "dehumidifier",
  THE6500_200: "dehumidifier",
  TAA931: "air-purifier",
  TAA530: "air-purifier",
  TAE330: "air-purifier",
  TAE530: "air-purifier",
};

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  let rawData: Record<string, unknown>;

  if (contentType.includes("application/json")) {
    try {
      rawData = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "잘못된 요청 형식입니다." },
        { status: 400 }
      );
    }
  } else if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    try {
      const formData = await request.formData();
      const model = formData.get("model") as string | null;
      rawData = {
        selectedModel: model,
        selectedCategory: model ? MODEL_CATEGORY_MAP[model] : undefined,
        orderType: formData.get("orderType"),
        paymentMethod: formData.get("paymentMethod"),
      };
    } catch {
      return NextResponse.json(
        { success: false, error: "잘못된 요청 형식입니다." },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, error: "지원하지 않는 Content-Type입니다." },
      { status: 415 }
    );
  }

  const result = ConsultationSchema.safeParse(rawData);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: "입력 데이터가 올바르지 않습니다.",
        details: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = result.data;

  // 접수 번호 생성 (실제 서비스에서는 DB에 저장)
  const consultationId = `NV-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  return NextResponse.json(
    {
      success: true,
      consultationId,
      message: "상담 신청이 완료되었습니다.",
      data: {
        ...data,
        receivedAt: new Date().toISOString(),
      },
    },
    { status: 201 }
  );
}
