-- =============================================
-- Site Ayarları — key/value tablosu
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştır (schema.sql'den sonra)
-- =============================================

create table if not exists site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;

-- Herkes ayarları okuyabilsin (public sayfalar iletişim/sosyal bilgileri gösterir).
-- Yazma yalnızca service_role (admin API) üzerinden yapılır.
create policy "Herkes ayarlari gorebilir" on site_settings for select using (true);

-- Varsayılan anahtarlar (boş değerlerle başlat — admin panelinden doldurulur)
insert into site_settings (key, value) values
  ('contact_phone', ''),
  ('contact_email', ''),
  ('contact_whatsapp', ''),
  ('contact_address', ''),
  ('social_instagram', ''),
  ('social_youtube', ''),
  ('social_facebook', ''),
  ('site_title', 'Haydar Ünver'),
  ('site_description', ''),
  ('booking_enabled', 'true')
on conflict (key) do nothing;
