import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "consultations.json");
const UPLOADS_DIR = path.join(process.cwd(), ".data", "uploads");

const PHOTO_SLOTS = ["leftMachine", "rightMachine", "diffuser1", "diffuser2"];
const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "heic"]);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function ensureDirs() {
  for (const dir of [DATA_DIR, UPLOADS_DIR]) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
}

interface ConsultationRecord {
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

function readConsultations(): ConsultationRecord[] {
  ensureDirs();
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function saveConsultations(data: ConsultationRecord[]) {
  ensureDirs();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const consultations = readConsultations();
  consultations.sort(
    (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
  );
  return NextResponse.json({ success: true, data: consultations });
}

export async function POST(request: NextRequest) {
  try {
    ensureDirs();

    const consultationId = `NV-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const receivedAt = new Date().toISOString();

    // 상담별 사진 폴더
    const photoDir = path.join(UPLOADS_DIR, consultationId);

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

      // 사진 파일 저장
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
          if (!fs.existsSync(photoDir)) fs.mkdirSync(photoDir, { recursive: true });
          const filename = `${slot}.${ext}`;
          const buffer = Buffer.from(await file.arrayBuffer());
          fs.writeFileSync(path.join(photoDir, filename), buffer);
          photos[slot] = `/api/uploads/${consultationId}/${filename}`;
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

    const record: ConsultationRecord = {
      consultationId,
      selectedCategory,
      selectedModel,
      orderType,
      paymentMethod,
      installationType,
      customerName,
      customerPhone,
      customerAddress,
      customerAddressDetail,
      selectedPyeong,
      selectedController,
      selectedMonitor,
      rentalPrice,
      purchasePrice,
      pyeongLabel,
      controllerLabel,
      monitorLabel,
      photos,
      submittedAt,
      receivedAt,
    };

    const consultations = readConsultations();
    consultations.push(record);
    saveConsultations(consultations);

    return NextResponse.json(
      { success: true, consultationId, message: "상담 신청이 완료되었습니다.", data: record },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
