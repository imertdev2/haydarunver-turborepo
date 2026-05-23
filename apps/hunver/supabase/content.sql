-- =============================================
-- İçerik tabloları — Blog / Etkinlik / Eğitim / Galeri
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştır (schema.sql'den sonra).
-- Seed bölümü mevcut statik içeriği DB'ye taşır.
-- =============================================

-- 1. Blog kategorileri
create table if not exists blog_categories (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  label text not null,
  description text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 2. Blog yazıları (category = blog_categories.slug)
create table if not exists blog_posts (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  category text not null,
  date text not null default '',
  image text not null default '',
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Etkinlikler
create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  image_src text not null default '',
  image_alt text not null default '',
  is_featured boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 4. Eğitimler
create table if not exists trainings (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  image_src text not null default '',
  image_alt text not null default '',
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 5. Galeri görselleri
create table if not exists gallery_images (
  id uuid default gen_random_uuid() primary key,
  src text not null,
  alt text not null default '',
  category text not null default 'Doğa',
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Indexler
create index if not exists idx_blog_posts_category on blog_posts(category);
create index if not exists idx_blog_posts_published on blog_posts(is_published);
create index if not exists idx_gallery_category on gallery_images(category);

-- RLS — herkes yayınlanmış/aktif içeriği okuyabilir; yazma yalnızca service_role
alter table blog_categories enable row level security;
alter table blog_posts enable row level security;
alter table events enable row level security;
alter table trainings enable row level security;
alter table gallery_images enable row level security;

create policy "Herkes blog kategorilerini gorebilir" on blog_categories for select using (true);
create policy "Herkes yayinlanmis yazilari gorebilir" on blog_posts for select using (is_published = true);
create policy "Herkes aktif etkinlikleri gorebilir" on events for select using (is_active = true);
create policy "Herkes aktif egitimleri gorebilir" on trainings for select using (is_active = true);
create policy "Herkes aktif galeriyi gorebilir" on gallery_images for select using (is_active = true);

-- =============================================
-- Seed — mevcut statik içerik
-- =============================================

insert into blog_categories (slug, label, description, sort_order) values
  ('nefes', 'Nefes Terapisi', 'Nefesin beden ve zihindeki etkileri üzerine yazılar.', 1),
  ('bioenerji', 'Bioenerji', 'Beden, enerji alanı ve dengeleme pratikleri.', 2),
  ('meditasyon', 'Meditasyon', 'Ses meditasyonu, dikkat ve içsel sessizlik.', 3),
  ('aile-dizimi', 'Aile Dizimi', 'Sistemik bakış ve aile dizimi deneyimleri.', 4),
  ('yasam', 'Bilinçli Yaşam', 'Günlük hayata taşınabilir farkındalık önerileri.', 5)
on conflict (slug) do nothing;

insert into blog_posts (slug, title, excerpt, category, date, image, sort_order) values
  ('nefes-terapisi', 'Nefes Terapisi Nedir ve Nasıl Çalışır?',
   'Nefes, sadece yaşamın değil dönüşümün de anahtarıdır. Bilinçli nefesle sinir sistemini nasıl düzenleyebileceğini keşfet.',
   'nefes', '12 Nisan 2026', '/images/nefes-terapisi.png', 1),
  ('bioenerji', 'Bioenerji ile Bedenin Dilini Anlamak',
   'Bedenin sürekli mesaj gönderir. Bioenerji çalışmalarıyla bu mesajları duymayı ve yanıtlamayı öğren.',
   'bioenerji', '8 Nisan 2026', '/images/bio-enerji.png', 2),
  ('ses-meditasyonu', 'Ses Meditasyonu: İçsel Sessizliğe Yolculuk',
   'Kadim çanakların ve sesin titreşimiyle zihinsel gürültüyü sustur, derinlere in.',
   'meditasyon', '3 Nisan 2026', '/images/ses-meditasyonu.png', 3)
on conflict (slug) do nothing;

insert into events (title, image_src, image_alt, is_featured, sort_order) values
  ('Kokopellis Festivali', '/images/kokopellis.png', 'Kokopellis Festivali', true, 0),
  ('Masal Festivali', '/images/masal-festivali.png', 'Masal Festivali', false, 1),
  ('Namaste Festivali', '/images/namaste-festivali.png', 'Namaste Festivali', false, 2),
  ('Be Your Retreat', '/images/beyouretreat.png', 'Be Your Retreat', false, 3)
on conflict do nothing;

insert into trainings (title, image_src, image_alt, sort_order) values
  ('Nefes Terapisi', '/images/nefes-terapisi.png', 'Nefes Terapisi', 1),
  ('Bioenerji', '/images/bio-enerji.png', 'Bioenerji', 2),
  ('Aile Dizilimi', '/images/aile-dizilimi.png', 'Aile Dizilimi', 3),
  ('Ses Meditasyonu', '/images/ses-meditasyonu.png', 'Ses Meditasyonu', 4)
on conflict do nothing;

insert into gallery_images (src, alt, category, sort_order) values
  ('/images/galleries/2N8A1247.JPG', 'Antik kentte grup çalışması', 'Festival', 1),
  ('/images/galleries/2N8A1274.JPG', 'Antik kentte buluşma', 'Festival', 2),
  ('/images/galleries/2N8A5834.jpg', 'Doğada grup buluşması', 'Festival', 3),
  ('/images/galleries/4a5f97d2-b0d1-45ff-abbd-ebfa38bccb71.jpg', 'Mağarada buluşma', 'Festival', 4),
  ('/images/galleries/6263022f-354b-4bc6-af2c-17f4ce987655.jpg', 'Budist keşiş ile buluşma', 'Festival', 5),
  ('/images/galleries/2N8A5742.jpg', 'İç mekan meditasyon seansı', 'Meditasyon', 6),
  ('/images/galleries/2N8A5776.jpg', 'Ağaçlar altında grup meditasyonu', 'Meditasyon', 7),
  ('/images/galleries/2N8A5799.jpg', 'Doğada bireysel meditasyon', 'Meditasyon', 8),
  ('/images/galleries/WhatsApp%20Image%202026-04-10%20at%20.jpeg', 'Dağ zirvesinde meditasyon', 'Meditasyon', 9),
  ('/images/galleries/WhatsApp%20Image%202026-04-10%20at%2016.53.15.jpeg', 'Shiva heykeli önünde meditasyon', 'Meditasyon', 10),
  ('/images/galleries/WhatsApp%20Image%202026.jpeg', 'Bali tapınağında dua', 'Meditasyon', 11),
  ('/images/galleries/88aacd54-ee2d-4486-8094-0f1501034292.jpg', 'Barış stupa önünde meditasyon', 'Meditasyon', 12),
  ('/images/galleries/07b31ee6-3e44-4586-a289-8e5f90c5f94a.jpg', 'Hindu tapınağında dua', 'Meditasyon', 13),
  ('/images/galleries/3b1dcf04-2751-40c0-a9f4-50674bba7f9e.jpg', 'Mağara tapınağında dua', 'Meditasyon', 14),
  ('/images/galleries/60954c18-9ef0-429f-991c-9024d50d051a.jpg', 'Mağarada meditasyon', 'Meditasyon', 15),
  ('/images/galleries/cb7f088f-960b-42a3-abc5-8eb77defea9c.jpg', 'Shiva heykeli önünde namaste', 'Meditasyon', 16),
  ('/images/galleries/ec66b174-483c-44ef-be7c-bb663ce3f068.jpg', 'Çin tapınağında dua', 'Meditasyon', 17),
  ('/images/galleries/2N8A6599.jpg', 'İç mekan nefes çalışması', 'Nefes', 18),
  ('/images/galleries/DSC_3168_Haydar%20Olga.jpg', 'Havuzda ses terapisi seansı', 'Nefes', 19),
  ('/images/galleries/photo_5823467859848841138_y.jpg', 'Nefes terapisi seansı', 'Nefes', 20),
  ('/images/galleries/2N8A5821.jpg', 'Doğada enerji çalışması', 'Bioenerji', 21),
  ('/images/galleries/2N8A7336.jpg', 'Bioenerji terapi seansı', 'Bioenerji', 22),
  ('/images/galleries/DSC_3160.jpg', 'Havuzda rahatlama terapisi', 'Bioenerji', 23),
  ('/images/galleries/2N8A5757.jpg', 'Doğa yürüyüşü', 'Doğa', 24),
  ('/images/galleries/WhatsApp%20Image%202026-04-10%20at%2016.53.16.jpeg', 'Okyanus kıyısında', 'Doğa', 25),
  ('/images/galleries/WhatsApp%20Image%202026-04-10.jpeg', 'Dağ zirvesinde gün doğumu', 'Doğa', 26),
  ('/images/galleries/0ef25e40-7c2c-4e88-a7ab-d36b5bec018f.jpg', 'Batu Caves merdivenleri', 'Doğa', 27),
  ('/images/galleries/5de313fe-bb88-42eb-9af6-3f3400c14883.jpg', 'Mağara içi keşif', 'Doğa', 28),
  ('/images/galleries/5f147e22-4324-48d3-b814-6ce100c68745.jpg', 'Mağara tapınağında namaste', 'Doğa', 29),
  ('/images/galleries/c5177a0b-77a5-46b6-94b3-c2d43a16b94b.jpg', 'Dağ tapınağında buluşma', 'Doğa', 30),
  ('/images/galleries/d6e428cd-1c7f-450d-b5d4-91c13468209d.jpg', 'Nepal stupa ile selfie', 'Doğa', 31)
on conflict do nothing;
