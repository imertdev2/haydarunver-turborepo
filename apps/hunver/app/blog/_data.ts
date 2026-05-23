export interface BlogCategory {
  slug: string
  label: string
  description: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string // BlogCategory.slug
  date: string
  image: string
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "nefes",
    label: "Nefes Terapisi",
    description: "Nefesin beden ve zihindeki etkileri üzerine yazılar.",
  },
  {
    slug: "bioenerji",
    label: "Bioenerji",
    description: "Beden, enerji alanı ve dengeleme pratikleri.",
  },
  {
    slug: "meditasyon",
    label: "Meditasyon",
    description: "Ses meditasyonu, dikkat ve içsel sessizlik.",
  },
  {
    slug: "aile-dizimi",
    label: "Aile Dizimi",
    description: "Sistemik bakış ve aile dizimi deneyimleri.",
  },
  {
    slug: "yasam",
    label: "Bilinçli Yaşam",
    description: "Günlük hayata taşınabilir farkındalık önerileri.",
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "nefes-terapisi",
    title: "Nefes Terapisi Nedir ve Nasıl Çalışır?",
    excerpt:
      "Nefes, sadece yaşamın değil dönüşümün de anahtarıdır. Bilinçli nefesle sinir sistemini nasıl düzenleyebileceğini keşfet.",
    category: "nefes",
    date: "12 Nisan 2026",
    image: "/images/nefes-terapisi.png",
  },
  {
    slug: "bioenerji",
    title: "Bioenerji ile Bedenin Dilini Anlamak",
    excerpt:
      "Bedenin sürekli mesaj gönderir. Bioenerji çalışmalarıyla bu mesajları duymayı ve yanıtlamayı öğren.",
    category: "bioenerji",
    date: "8 Nisan 2026",
    image: "/images/bio-enerji.png",
  },
  {
    slug: "ses-meditasyonu",
    title: "Ses Meditasyonu: İçsel Sessizliğe Yolculuk",
    excerpt:
      "Kadim çanakların ve sesin titreşimiyle zihinsel gürültüyü sustur, derinlere in.",
    category: "meditasyon",
    date: "3 Nisan 2026",
    image: "/images/ses-meditasyonu.png",
  },
]

export function getCategory(slug: string) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)
}

export function getPostsByCategory(slug: string) {
  return BLOG_POSTS.filter((p) => p.category === slug)
}

export function getCategoryLabel(slug: string) {
  return getCategory(slug)?.label ?? slug
}
