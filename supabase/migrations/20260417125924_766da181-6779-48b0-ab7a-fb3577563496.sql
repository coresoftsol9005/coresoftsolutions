create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

create policy "Anyone can submit contact form"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 100
    and char_length(email) between 3 and 255
    and char_length(message) between 1 and 2000
    and (company is null or char_length(company) <= 100)
  );