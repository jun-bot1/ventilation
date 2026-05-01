import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { sql, ensureSchema, type ConsultationRow } from "@/lib/db";

export const dynamic = "force-dynamic";

const PHOTO_SLOTS = ["leftMachine", "rightMachine", "diffuser1", "diffuser2"];
const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "heic"]);
const MAX_FILE_SIZE = 10 * 1024 * 1024;

interface ConsultationResponse {
  consultationId: string;
  selectedCategory: string;
  selectedModel: string;
  orderType: string;
  paymentMethod: string;
  installationType: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerAddressDetail: string;
  selectedPyeong: string;
  selectedController: string;
  selectedMonitor: string;
  rentalPrice: number;
  purchasePrice: number;
  pyeongLabel: string;
  controllerLabel: string;
  monitorLabel: string;
  photos: Record<string, string>;
  submittedAt: string;
  receivedAt: string;
}

function rowToResponse(row: ConsultationRow): ConsultationResponse {
  return {
    consultationId: row.consultation_id,
    selectedCategory: row.selected_category,
    selectedModel: row.selected_model,
    orderType: row.order_type,
    paymentMethod: row.payment_method,
    installationType: row.installation_type,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerAddress: row.customer_address,
    customerAddressDetail: row.customer_address_detail,
    selectedPyeong: row.selected_pyeong,
    selectedController: row.selected_controller,
    selectedMonitor: row.selected_monitor,
    rentalPrice: row.rental_price,
    purchasePrice: row.purchase_price,
    pyeongLabel: row.pyeong_label,
    controllerLabel: row.controller_label,
    monitorLabel: row.monitor_label,
    photos: row.photos ?? {},
    submittedAt: new Date(row.submitted_at).toISOString(),
    receivedAt: new Date(row.received_at).toISOString(),
  };
}

export async function GET() {
  try {
    await ensureSchema();
    const rows = (await sql`
      SELECT * FROM consultations ORDER BY received_at DESC
    `) as ConsultationRow[];
    return NextResponse.json({ success: true, data: rows.map(rowToResponse) });
  } catch (err) {
    console.error("[consultation:GET]", err);
    return NextResponse.json(
      { success: false, error: "조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureSchema();

    const consultationId = `NV-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const receivedAt = new Date().toISOString();

    const contentType = request.headers.get("content-type") ?? "";
    let selectedCategory = "";
    let selectedModel = "";
    let orderType = "";
    let paymentMethod = "";
    let installationType = "";
    let customerName = "";
    let customerPhone = "";
    let customerAddress = "";
    let customerAddressDetail = "";
    let selectedPyeong = "";
    let selectedController = "";
    let selectedMonitor = "";
    let rentalPrice = 0;
    let purchasePrice = 0;
    let pyeongLabel = "";
    let controllerLabel = "";
    let monitorLabel = "";
    let submittedAt = receivedAt;
    const photos: Record<string, string> = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      selectedCategory = (formData.get("selectedCategory") as string) ?? "";
      selectedModel = (formData.get("selectedModel") as string) ?? "";
      orderType = (formData.get("orderType") as string) ?? "";
      paymentMethod = (formData.get("paymentMethod") as string) ?? "";
      installationType = (formData.get("installationType") as string) ?? "";
      customerName = (formData.get("customerName") as string) ?? "";
      customerPhone = (formData.get("customerPhone") as string) ?? "";
      customerAddress = (formData.get("customerAddress") as string) ?? "";
      customerAddressDetail = (formData.get("customerAddressDetail") as string) ?? "";
      submittedAt = (formData.get("submittedAt") as string) ?? receivedAt;
      selectedPyeong = (formData.get("selectedPyeong") as string) ?? "";
      selectedController = (formData.get("selectedController") as string) ?? "";
      selectedMonitor = (formData.get("selectedMonitor") as string) ?? "";
      rentalPrice = parseInt((formData.get("rentalPrice") as string) ?? "0", 10);
      purchasePrice = parseInt((formData.get("purchasePrice") as string) ?? "0", 10);
      pyeongLabel = (formData.get("pyeongLabel") as string) ?? "";
      controllerLabel = (formData.get("controllerLabel") as string) ?? "";
      monitorLabel = (formData.get("monitorLabel") as string) ?? "";

      for (const slot of PHOTO_SLOTS) {
        const file = formData.get(slot);
        if (file && file instanceof File && file.size > 0) {
          if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
              { success: false, error: `파일 크기가 10MB를 초과합니다. (${slot})` },
              { status: 413 }
            );
          }
          const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
          if (!ALLOWED_EXTENSIONS.has(ext)) {
            return NextResponse.json(
              { success: false, error: `허용되지 않는 파일 형식입니다. (${slot}: .${ext})` },
              { status: 422 }
            );
          }
          const blob = await put(`consultations/${consultationId}/${slot}.${ext}`, file, {
            access: "public",
            addRandomSuffix: false,
            contentType: file.type || undefined,
          });
          photos[slot] = blob.url;
        }
      }
    } else if (contentType.includes("application/json")) {
      const json = await request.json();
      selectedCategory = json.selectedCategory ?? "";
      selectedModel = json.selectedModel ?? "";
      orderType = json.orderType ?? "";
      paymentMethod = json.paymentMethod ?? "";
      installationType = json.installationType ?? "";
      customerName = json.customerName ?? "";
      customerPhone = json.customerPhone ?? "";
      customerAddress = json.customerAddress ?? "";
      customerAddressDetail = json.customerAddressDetail ?? "";
      submittedAt = json.submittedAt ?? receivedAt;
    } else {
      return NextResponse.json(
        { success: false, error: "지원하지 않는 Content-Type입니다." },
        { status: 415 }
      );
    }

    if (!selectedModel || !orderType) {
      return NextResponse.json(
        { success: false, error: "필수 항목이 누락되었습니다." },
        { status: 422 }
      );
    }

    if (customerName.length > 100) {
      return NextResponse.json(
        { success: false, error: "이름은 100자를 초과할 수 없습니다." },
        { status: 422 }
      );
    }

    if (customerAddress.length > 500) {
      return NextResponse.json(
        { success: false, error: "주소는 500자를 초과할 수 없습니다." },
        { status: 422 }
      );
    }

    if (customerPhone && !/^[0-9\-+() ]{7,20}$/.test(customerPhone)) {
      return NextResponse.json(
        { success: false, error: "유효하지 않은 전화번호 형식입니다." },
        { status: 422 }
      );
    }

    const inserted = (await sql`
      INSERT INTO consultations (
        consultation_id, selected_category, selected_model, order_type,
        payment_method, installation_type, customer_name, customer_phone,
        customer_address, customer_address_detail, selected_pyeong,
        selected_controller, selected_monitor, rental_price, purchase_price,
        pyeong_label, controller_label, monitor_label, photos,
        submitted_at, received_at
      ) VALUES (
        ${consultationId}, ${selectedCategory}, ${selectedModel}, ${orderType},
        ${paymentMethod}, ${installationType}, ${customerName}, ${customerPhone},
        ${customerAddress}, ${customerAddressDetail}, ${selectedPyeong},
        ${selectedController}, ${selectedMonitor}, ${rentalPrice}, ${purchasePrice},
        ${pyeongLabel}, ${controllerLabel}, ${monitorLabel}, ${JSON.stringify(photos)}::jsonb,
        ${submittedAt}, ${receivedAt}
      )
      RETURNING *
    `) as ConsultationRow[];

    const record = rowToResponse(inserted[0]);

    return NextResponse.json(
      { success: true, consultationId, message: "상담 신청이 완료되었습니다.", data: record },
      { status: 201 }
    );
  } catch (err) {
    console.error("[consultation:POST]", err);
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
