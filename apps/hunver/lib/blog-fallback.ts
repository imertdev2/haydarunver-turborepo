import type { BlogCategory, BlogPost } from "@/lib/database.types"

// DB boşsa / yapılandırılmamışsa /blog ve /blog/kategori sayfaları
// bu listeleri kullanır. DB seed (supabase/content.sql) ile aynı içerik.

export const BLOG_CATEGORIES_FALLBACK: BlogCategory[] = [
  { id: "c-nefes", slug: "nefes", label: "Nefes Terapisi", description: "Nefesin beden ve zihindeki etkileri üzerine yazılar.", sort_order: 1, created_at: "" },
  { id: "c-bioenerji", slug: "bioenerji", label: "Bioenerji", description: "Beden, enerji alanı ve dengeleme pratikleri.", sort_order: 2, created_at: "" },
  { id: "c-meditasyon", slug: "meditasyon", label: "Meditasyon", description: "Ses meditasyonu, dikkat ve içsel sessizlik.", sort_order: 3, created_at: "" },
  { id: "c-aile-dizimi", slug: "aile-dizimi", label: "Aile Dizimi", description: "Sistemik bakış ve aile dizimi deneyimleri.", sort_order: 4, created_at: "" },
  { id: "c-yasam", slug: "yasam", label: "Bilinçli Yaşam", description: "Günlük hayata taşınabilir farkındalık önerileri.", sort_order: 5, created_at: "" },
]

export const BLOG_POSTS_FALLBACK: BlogPost[] = [
  {
    id: "p-nefes",
    slug: "nefes-terapisi",
    title: "Nefes Terapisi Nedir ve Nasıl Çalışır?",
    excerpt:
      "Nefes, sadece yaşamın değil dönüşümün de anahtarıdır. Bilinçli nefesle sinir sistemini nasıl düzenleyebileceğini keşfet.",
    body: "",
    category: "nefes",
    date: "12 Nisan 2026",
    image: "/images/nefes-terapisi.png",
    is_published: true,
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-bioenerji",
    slug: "bioenerji",
    title: "Bioenerji ile Bedenin Dilini Anlamak",
    excerpt:
      "Bedenin sürekli mesaj gönderir. Bioenerji çalışmalarıyla bu mesajları duymayı ve yanıtlamayı öğren.",
    body: "",
    category: "bioenerji",
    date: "8 Nisan 2026",
    image: "/images/bio-enerji.png",
    is_published: true,
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-ses",
    slug: "ses-meditasyonu",
    title: "Ses Meditasyonu: İçsel Sessizliğe Yolculuk",
    excerpt:
      "Kadim çanakların ve sesin titreşimiyle zihinsel gürültüyü sustur, derinlere in.",
    body: "",
    category: "meditasyon",
    date: "3 Nisan 2026",
    image: "/images/ses-meditasyonu.png",
    is_published: true,
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-aile-dizimi",
    slug: "aile-dizimi",
    title: "Aile Dizimi Nedir? Sistemik Bakışın Görünmez Bağları",
    excerpt:
      "Aile sisteminde nesilden nesle taşınan görünmez sadakatleri ve aile dizimi çalışmasının ardındaki bilgeliği keşfet.",
    body: "",
    category: "aile-dizimi",
    date: "15 Mayıs 2026",
    image: "/images/aile-dizilimi.png",
    is_published: true,
    sort_order: 4,
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-farkindalik",
    slug: "farkindalik-pratikleri",
    title: "Günlük Hayata Taşıyabileceğin 5 Farkındalık Pratiği",
    excerpt:
      "Sabah açılışından gün sonu kapanışına kadar günlük rutinine ekleyebileceğin sade ama dönüştürücü beş pratik.",
    body: "",
    category: "yasam",
    date: "22 Mayıs 2026",
    image: "/images/hakkimda.png",
    is_published: true,
    sort_order: 5,
    created_at: "",
    updated_at: "",
  },
]
