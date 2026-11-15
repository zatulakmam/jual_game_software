CREATE TABLE IF NOT EXISTS public.product_deletions (
  slug TEXT PRIMARY KEY,
  deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  deleted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.product_deletions ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.product_deletions TO anon, authenticated;
GRANT INSERT ON public.product_deletions TO authenticated;

DROP POLICY IF EXISTS "Product deletion records are publicly readable"
  ON public.product_deletions;
CREATE POLICY "Product deletion records are publicly readable"
  ON public.product_deletions FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can hide catalog products"
  ON public.product_deletions;
CREATE POLICY "Admins can hide catalog products"
  ON public.product_deletions FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );
