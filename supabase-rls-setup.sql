-- ─────────────────────────────────────────────────────────────────────────────
-- Kerala Cyber Cell Portal — Supabase RLS Policy Setup
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- Project: zjqsdmpwgqliexgnzwwm
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Make sure RLS is enabled on all tables
ALTER TABLE categories  ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries   ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations   ENABLE ROW LEVEL SECURITY;

-- 2. Drop any existing conflicting policies (safe to run multiple times)
DROP POLICY IF EXISTS "anon_select_categories"  ON categories;
DROP POLICY IF EXISTS "anon_insert_categories"  ON categories;
DROP POLICY IF EXISTS "anon_update_categories"  ON categories;
DROP POLICY IF EXISTS "anon_select_inquiries"   ON inquiries;
DROP POLICY IF EXISTS "anon_insert_inquiries"   ON inquiries;
DROP POLICY IF EXISTS "anon_select_locations"   ON locations;

-- 3. SELECT (read) policies — allow anon to read all rows
CREATE POLICY "anon_select_categories"
  ON categories FOR SELECT TO anon USING (true);

CREATE POLICY "anon_select_inquiries"
  ON inquiries FOR SELECT TO anon USING (true);

CREATE POLICY "anon_select_locations"
  ON locations FOR SELECT TO anon USING (true);

-- 4. INSERT policies — allow anon to create categories and inquiries
CREATE POLICY "anon_insert_categories"
  ON categories FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_insert_inquiries"
  ON inquiries FOR INSERT TO anon WITH CHECK (true);

-- 5. UPDATE policy — allow anon to edit categories (for the Categories page)
CREATE POLICY "anon_update_categories"
  ON categories FOR UPDATE TO anon USING (true) WITH CHECK (true);
