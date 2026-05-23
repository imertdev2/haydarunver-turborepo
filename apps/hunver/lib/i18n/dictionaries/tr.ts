export interface Dictionary {
  nav: {
    about: string
    services: string
    events: string
    trainings: string
    blog: string
    gallery: string
    appointment: string
  }
  hero: {
    welcome: string
    title: string
    cta: string
  }
  footer: {
    pages: string
    social: string
    contact: string
    rights: string
    privacy: string
    kvkk: string
  }
  appointment: {
    title: string
    chooseService: string
    chooseDate: string
    availableTimes: string
    continue: string
    confirm: string
    success: string
  }
}

export const tr: Dictionary = {
  nav: {
    about: "Hakkımda",
    services: "Hizmetler",
    events: "Etkinlikler",
    trainings: "Eğitimler",
    blog: "Blog",
    gallery: "Galeri",
    appointment: "Randevu",
  },
  hero: {
    welcome: "Hoş geldin",
    title: "Ben Haydar Ünver",
    cta: "WhatsApp ile Ulaş",
  },
  footer: {
    pages: "Sayfalar",
    social: "Sosyal Medya",
    contact: "İletişim",
    rights: "Tüm hakları saklıdır.",
    privacy: "Gizlilik Politikası",
    kvkk: "KVKK",
  },
  appointment: {
    title: "Seans Planla",
    chooseService: "Hizmet Seçin",
    chooseDate: "Tarih Seç",
    availableTimes: "Uygun Saatler",
    continue: "Devam Et",
    confirm: "Randevuyu Onayla",
    success: "Randevunuz Alındı!",
  },
}
