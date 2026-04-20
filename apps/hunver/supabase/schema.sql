-- =============================================
-- Haydar Ünver — Randevu Sistemi Veritabanı
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştır
-- =============================================

-- 1. Hizmetler tablosu
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null default '',
  duration_minutes int not null default 60,
  price numeric(10,2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 2. Haftalık müsaitlik tablosu
create table if not exists availability (
  id uuid default gen_random_uuid() primary key,
  day_of_week int not null check (day_of_week between 0 and 6), -- 0=Pazar
  start_time time not null,
  end_time time not null,
  is_active boolean not null default true
);

-- 3. Randevular tablosu
create table if not exists appointments (
  id uuid default gen_random_uuid() primary key,
  service_id uuid not null references services(id) on delete cascade,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  customer_note text,
  date date not null,
  start_time time not null,
  end_time time not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now()
);

-- 4. Bloklanmış günler (tatil, özel gün vs.)
create table if not exists blocked_dates (
  id uuid default gen_random_uuid() primary key,
  date date not null unique,
  reason text
);

-- Indexler
create index if not exists idx_appointments_date on appointments(date);
create index if not exists idx_appointments_status on appointments(status);
create index if not exists idx_availability_day on availability(day_of_week);

-- RLS (Row Level Security) — herkes randevu oluşturabilsin, sadece service_role okuyabilsin
alter table appointments enable row level security;
alter table services enable row level security;
alter table availability enable row level security;
alter table blocked_dates enable row level security;

-- Herkes hizmetleri görebilsin
create policy "Herkes hizmetleri görebilir" on services for select using (true);

-- Herkes müsaitliği görebilsin
create policy "Herkes müsaitliği görebilir" on availability for select using (true);

-- Herkes bloklanmış günleri görebilsin
create policy "Herkes bloklanmış günleri görebilir" on blocked_dates for select using (true);

-- Herkes randevu oluşturabilsin
create policy "Herkes randevu oluşturabilir" on appointments for insert with check (true);

-- Herkes kendi randevusunun durumunu görebilsin (telefon ile)
create policy "Randevu sorgulama" on appointments for select using (true);

-- =============================================
-- Varsayılan veriler
-- =============================================

-- Hizmetler
insert into services (name, description, duration_minutes, price) values
  ('Nefes Terapisi', 'Bilinçli nefes teknikleri ile sinir sistemini düzenle, duygusal blokajları çöz.', 60, 0),
  ('Bioenerji', 'Bedenin enerji blokajlarını çöz, fiziksel ve duygusal dengeyi yeniden kur.', 60, 0),
  ('Ses Meditasyonu', 'Tibet çanakları ve sesin titreşimi ile derin iç huzura ulaş.', 90, 0),
  ('Aile Dizilimi', 'Aile sistemindeki görünmez dinamikleri keşfet ve dönüştür.', 120, 0)
on conflict do nothing;

-- Haftalık müsaitlik (Pazartesi-Cuma, 09:00-18:00)
insert into availability (day_of_week, start_time, end_time) values
  (1, '09:00', '18:00'),  -- Pazartesi
  (2, '09:00', '18:00'),  -- Salı
  (3, '09:00', '18:00'),  -- Çarşamba
  (4, '09:00', '18:00'),  -- Perşembe
  (5, '09:00', '18:00')   -- Cuma
on conflict do nothing;
