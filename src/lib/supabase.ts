import { createClient } from "@supabase/supabase-js";

// ─── Supabase Connection ─────────────────────────────────────────────────────
// Uses the anon (public) key. RLS policies must be set correctly in Supabase.
// See supabase-rls-setup.sql for the required policies.
// ─────────────────────────────────────────────────────────────────────────────

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ??
  "https://sslcoqeigkcrlwivtavq.supabase.co";

const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ?? "";

if (!supabaseKey) {
  console.error("[Supabase] VITE_SUPABASE_ANON_KEY not set in .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export type Category = { id: number; name: string; description: string };
export type Location = { id: number; name: string; taluk: string };
export type Inquiry = {
  id: number;
  category_id: number;
  location_id: number;
  description: string;
  rating: number | null;
  complainant_name: string | null;
  complainant_phone: string | null;
  feedback: string | null;
  reference_id: string | null;
  created_at: string;
  money_lost: number | null;
  categories?: Category | null;
  locations?: Location | null;
};

export async function getInquiries(): Promise<Inquiry[]> {
  const [catsRes, locsRes, inquiriesRes] = await Promise.all([
    supabase.from("categories").select("*"),
    supabase.from("locations").select("*"),
    supabase.rpc("get_all_inquiries"),
  ]);

  if (inquiriesRes.error) throw inquiriesRes.error;
  if (catsRes.error) throw catsRes.error;
  if (locsRes.error) throw locsRes.error;

  const cats = catsRes.data || [];
  const locs = locsRes.data || [];
  const inquiries = inquiriesRes.data || [];

  const catMap = new Map(cats.map((c) => [c.id, c]));
  const locMap = new Map(locs.map((l) => [l.id, l]));

interface RawInquiry {
  id: number;
  category_id: number;
  location_id: number;
  description: string;
  rating: number | null;
  complainant_name: string | null;
  complainant_phone: string | null;
  feedback: string | null;
  reference_id: string | null;
  created_at: string;
  category_name: string | null;
  location_name: string | null;
  money_lost: number | null;
  taluk?: string | null;
}

  return inquiries.map((i: RawInquiry) => ({
    ...i,
    categories: catMap.get(i.category_id) || {
      id: i.category_id,
      name: i.category_name || "—",
      description: "",
    },
    locations: locMap.get(i.location_id) || {
      id: i.location_id,
      name: i.location_name || "—",
      taluk: i.taluk || "Other",
    },
  })) as Inquiry[];
}
