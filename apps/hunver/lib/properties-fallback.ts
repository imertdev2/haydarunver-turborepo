import type { Property } from "@/lib/database.types"

// DB boşsa / yapılandırılmamışsa /emlak sayfası bu listeyi gösterir.
// DB seed'i (supabase/content.sql) ile aynı içerik.
export const PROPERTIES_FALLBACK: Property[] = [
  {
    id: "fb-1",
    title: "Çıralı'da Doğa İçinde Yatırımlık Arsa",
    category: "Arsa",
    location: "Çıralı, Kemer / Antalya",
    size: "1.500 m²",
    price: "Fiyat için iletişime geçiniz",
    status: "Satılık",
    description:
      "Çıralı'nın doğal dokusuna yakın, butik konaklama veya özel yaşam projesi için değerlendirilebilecek arsa fırsatı.",
    features: ["Doğa içinde konum", "Yatırım potansiyeli", "Sessiz bölge", "Turizm hattına yakın"],
    photos: [],
    is_active: true,
    sort_order: 0,
    created_at: "",
  },
  {
    id: "fb-2",
    title: "Olympos Yakınında Butik Otel Fırsatı",
    category: "Otel",
    location: "Olympos / Antalya",
    size: "12 oda",
    price: "Fiyat için iletişime geçiniz",
    status: "Satılık",
    description:
      "Olympos ve Çıralı hattında, yaz sezonunda aktif çalışabilecek butik otel yatırım fırsatı.",
    features: ["Hazır işletme altyapısı", "Turistik lokasyon", "Sezonluk gelir potansiyeli", "Butik konsept"],
    photos: [],
    is_active: true,
    sort_order: 1,
    created_at: "",
  },
  {
    id: "fb-3",
    title: "Kemer Bölgesinde Bungalov Tesis",
    category: "Bungalov Tesis",
    location: "Kemer / Antalya",
    size: "8 bungalov",
    price: "Fiyat için iletişime geçiniz",
    status: "Devren",
    description:
      "Yoga kampı, retreat, doğa tatili ve wellness etkinlikleri için uygun bungalov tesis fırsatı.",
    features: ["Hazır konsept", "Doğa turizmine uygun", "Kamp ve retreat potansiyeli", "İşletme devri"],
    photos: [],
    is_active: true,
    sort_order: 2,
    created_at: "",
  },
  {
    id: "fb-4",
    title: "Denize Yakın Havuzlu Villa",
    category: "Villa",
    location: "Çıralı / Antalya",
    size: "4+1",
    price: "Fiyat için iletişime geçiniz",
    status: "Satılık",
    description:
      "Aile yaşamı, sezonluk kiralama veya yatırım amaçlı değerlendirilebilecek özel villa portföyü.",
    features: ["Havuzlu", "Bahçeli", "Denize yakın", "Kiralama potansiyeli"],
    photos: [],
    is_active: true,
    sort_order: 3,
    created_at: "",
  },
]
