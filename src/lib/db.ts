import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const url =
      process.env.DATABASE_URL ??
      process.env.POSTGRES_URL ??
      process.env.DATABASE_URL_UNPOOLED ??
      process.env.POSTGRES_URL_NON_POOLING;
    if (!url) {
      throw new Error(
        "Postgres connection string is not set (checked DATABASE_URL, POSTGRES_URL, DATABASE_URL_UNPOOLED, POSTGRES_URL_NON_POOLING)"
      );
    }
    _sql = neon(url);
  }
  return _sql;
}

export const sql: NeonQueryFunction<false, false> = ((
  strings: TemplateStringsArray,
  ...values: unknown[]
) => getSql()(strings, ...values)) as NeonQueryFunction<false, false>;

export interface ConsultationRow {
  consultation_id: string;
  selected_category: string;
  selected_model: string;
  order_type: string;
  payment_method: string;
  installation_type: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_address_detail: string;
  selected_pyeong: string;
  selected_controller: string;
  selected_monitor: string;
  rental_price: number;
  purchase_price: number;
  pyeong_label: string;
  controller_label: string;
  monitor_label: string;
  photos: Record<string, string>;
  submitted_at: string;
  received_at: string;
}

let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS consultations (
          consultation_id TEXT PRIMARY KEY,
          selected_category TEXT NOT NULL DEFAULT '',
          selected_model TEXT NOT NULL,
          order_type TEXT NOT NULL,
          payment_method TEXT NOT NULL DEFAULT '',
          installation_type TEXT NOT NULL DEFAULT '',
          customer_name TEXT NOT NULL DEFAULT '',
          customer_phone TEXT NOT NULL DEFAULT '',
          customer_address TEXT NOT NULL DEFAULT '',
          customer_address_detail TEXT NOT NULL DEFAULT '',
          selected_pyeong TEXT NOT NULL DEFAULT '',
          selected_controller TEXT NOT NULL DEFAULT '',
          selected_monitor TEXT NOT NULL DEFAULT '',
          rental_price INTEGER NOT NULL DEFAULT 0,
          purchase_price INTEGER NOT NULL DEFAULT 0,
          pyeong_label TEXT NOT NULL DEFAULT '',
          controller_label TEXT NOT NULL DEFAULT '',
          monitor_label TEXT NOT NULL DEFAULT '',
          photos JSONB NOT NULL DEFAULT '{}'::jsonb,
          submitted_at TIMESTAMPTZ NOT NULL,
          received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS consultations_received_at_idx ON consultations (received_at DESC)`;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}
