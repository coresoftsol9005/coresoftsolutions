CREATE TABLE public.lead_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  category TEXT NOT NULL,
  category_other TEXT,
  city TEXT NOT NULL,
  area TEXT,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT NOT NULL,
  is_online TEXT,
  has_assets TEXT[],
  has_assets_other TEXT,
  services TEXT[] NOT NULL DEFAULT '{}',
  main_goal TEXT,
  timeline TEXT,
  budget TEXT,
  heard_from TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
ON public.lead_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(business_name) BETWEEN 1 AND 200
  AND char_length(owner_name) BETWEEN 1 AND 100
  AND char_length(category) BETWEEN 1 AND 100
  AND char_length(city) BETWEEN 1 AND 100
  AND char_length(phone) BETWEEN 5 AND 30
  AND char_length(email) BETWEEN 3 AND 255
);

CREATE POLICY "Admins can view leads"
ON public.lead_submissions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE INDEX idx_lead_submissions_created_at ON public.lead_submissions(created_at DESC);