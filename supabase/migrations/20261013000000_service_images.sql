-- Service card/hero images managed from the admin panel.
-- One row per service slug; `url` points at /api/public/service-image/... stored in
-- the private `service-images` bucket.
CREATE TABLE IF NOT EXISTS public.service_images (
  slug TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.service_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read service images"
  ON public.service_images FOR SELECT
  USING (true);

GRANT ALL ON public.service_images TO service_role;

-- Private bucket for uploaded service images (idempotent).
INSERT INTO storage.buckets (id, name, public)
VALUES ('service-images', 'service-images', false)
ON CONFLICT (id) DO NOTHING;
