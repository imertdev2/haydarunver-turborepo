export interface ServiceContent {
  slug: string
  title: string
  tagline: string
  metaDescription: string
  intro: string[]
  forWhom: string[]
  howItWorks: { title: string; description: string }[]
  duration: string
  format: string
  image: string
}

export const SERVICES: ServiceContent[] = [
  {
    slug: "nefes-terapisi",
    title: "Nefes Terapisi",
    tagline: "Bilinçli nefesle bedeni dinleme pratiği",
    metaDescription:
      "Nefes terapisi seansları — sinir sistemini düzenleyen, duygusal blokajları çözen birebir nefes çalışması.",
    intro: [
      "Nefes, bedeni ve zihni birbirine bağlayan en sade kapıdır. Bilinçli ve yapılandırılmış nefes seanslarında; uzun süredir taşıdığın gerilim, kapalı duygular ve düşünce yorgunluğu için fark edilebilir bir alan açılır.",
      "Seans birebir, güvenli ve senin temponda ilerler. Hedef performans değil; bedenin kendi zekâsına geri dönmesi.",
    ],
    forWhom: [
      "Sürekli kafa karışıklığı, gerginlik veya yoğun stres yaşayanlar",
      "Duygularını ifade etmekte zorlanan, beden farkındalığını derinleştirmek isteyenler",
      "Travma sonrası destekleyici bir nefes pratiğine ihtiyaç duyanlar",
    ],
    howItWorks: [
      {
        title: "Niyet Belirleme",
        description:
          "Seansın başında neyle çalışmak istediğini birlikte konuşuruz. Bedeninin nereyi işaret ettiğine bakarız.",
      },
      {
        title: "Nefes Pratiği",
        description:
          "Sana uygun bir nefes ritmiyle ilerleriz. Müzik, ses ve sessizlik aralarında alan açılır.",
      },
      {
        title: "Entegrasyon",
        description:
          "Yaşadıklarını kelimeye, beden duyumuna ve günlük hayata bağlamak için kapanış paylaşımı yaparız.",
      },
    ],
    duration: "60–90 dk",
    format: "Yüz yüze veya online",
    image: "/images/nefes-terapisi.png",
  },
  {
    slug: "bioenerji",
    title: "Bioenerji",
    tagline: "Bedenin enerji alanında dengeleyici dokunuş",
    metaDescription:
      "Bioenerji seansları — bedenin enerji blokajlarını çözmeye yönelik birebir dengeleyici çalışma.",
    intro: [
      "Bioenerji; bedeni saran ince enerji alanında oluşmuş tıkanıklıkları fark etmeye ve nazikçe çözmeye dönük bir çalışmadır. Fiziksel rahatsızlığın ardındaki duygusal/zihinsel yükü de okur.",
      "Seans temas içermez; el ile alanla çalışılır. Etkisi gevşeme, denge ve içsel berraklık olarak hissedilir.",
    ],
    forWhom: [
      "Sürekli yorgunluk, uyku düzensizliği veya kronik gerginlik yaşayanlar",
      "Tıbbi tedaviyi destekleyici, tamamlayıcı bir yöntem arayanlar",
      "Beden-zihin bütünlüğünde dengeyi tazelemek isteyenler",
    ],
    howItWorks: [
      {
        title: "Değerlendirme",
        description:
          "Bedenin enerji alanını birlikte tararız; dikkat istediğin bölgeyi paylaşırsın.",
      },
      {
        title: "Dengeleme",
        description:
          "Uzak/yakın ellerle alana çalışılır. Sen sırtüstü, rahat bir konumdasındır.",
      },
      {
        title: "Kapanış",
        description:
          "Seansın etkisini günlük yaşamına nasıl taşıyacağına dair kısa öneriler veririz.",
      },
    ],
    duration: "45–60 dk",
    format: "Yüz yüze",
    image: "/images/bio-enerji.png",
  },
  {
    slug: "aile-dizimi",
    title: "Aile Dizimi",
    tagline: "Sistemdeki görünmez bağları sahaya çıkar",
    metaDescription:
      "Aile dizimi seansları — sistem içindeki dinamikleri görünür kılan, gruba veya birebire açık çalışma.",
    intro: [
      "Aile dizimi; ailenin içinde nesilden nesle taşınan görünmez bağları, sadakatleri ve eksik kalmış hareketleri sahnede temsillerle görmemizi sağlar.",
      "Sonuç; bilgiyle değil, sistemde yeniden yer alma deneyimiyle gelir. Çözüm bazen sade bir cümle, bazen bir baş eğiştir.",
    ],
    forWhom: [
      "Tekrar eden ilişki veya iş örüntülerini fark edip kırmak isteyenler",
      "Anne-baba, kardeş, eski eş ilişkilerinde tıkanıklık yaşayanlar",
      "Sistemik bir bakışla kendi yaşamına yeni bir kapı açmak isteyenler",
    ],
    howItWorks: [
      {
        title: "Mevzu Belirleme",
        description:
          "Hangi konuyu sahaya açacağımızı netleştiririz; sadeleştirilmiş bir niyet belirleriz.",
      },
      {
        title: "Diziliş",
        description:
          "Grup formatında temsiller, birebir formatta nesnelerle sahne kurulur ve sistem hareket eder.",
      },
      {
        title: "Tamamlama",
        description:
          "Görünen hareketin ardından sahneyi nazikçe kapatır, deneyimi entegre ederiz.",
      },
    ],
    duration: "Grup: 3–4 saat · Bireysel: 90 dk",
    format: "Grup veya bireysel",
    image: "/images/aile-dizilimi.png",
  },
  {
    slug: "ses-meditasyonu",
    title: "Ses Meditasyonu",
    tagline: "Titreşimle gevşemeye davet",
    metaDescription:
      "Ses meditasyonu seansları — Tibet çanakları, gong ve sesin frekansıyla derin gevşeme deneyimi.",
    intro: [
      "Ses meditasyonu; Tibet çanakları, gong ve insan sesinin oluşturduğu frekanslarla bedeni doğal gevşeme moduna alır. Söze ihtiyaç duymadan sinir sistemine doğrudan konuşur.",
      "Bireysel sound healing seansları kadar grup seanslarını da yürütüyorum.",
    ],
    forWhom: [
      "Düşünce trafiği yoğun, susmakta zorlanan zihinler",
      "Uyku sorunu, yorgunluk veya bedensel gerginlik yaşayanlar",
      "Meditasyona henüz oturmamış ama içsel sessizliği tadmak isteyenler",
    ],
    howItWorks: [
      {
        title: "Yerleşme",
        description:
          "Şilte üzerinde rahat bir konuma geçilir, gözler kapatılır.",
      },
      {
        title: "Ses Banyosu",
        description:
          "Farklı enstrümanların ardışık titreşimleriyle beden derin gevşemeye iner.",
      },
      {
        title: "Sessizlik",
        description:
          "Seansın son bölümünde kısa bir sessizlik alanında deneyim sindirilir.",
      },
    ],
    duration: "60 dk",
    format: "Bireysel veya grup",
    image: "/images/ses-meditasyonu.png",
  },
  {
    slug: "watsu",
    title: "Watsu / Su Terapisi",
    tagline: "Suyun taşıyıcılığıyla bedene dönüş",
    metaDescription:
      "Watsu / su terapisi — sıcak suda taşınarak gerçekleştirilen, bedeni derin gevşeten birebir seans.",
    intro: [
      "Watsu; vücut ısısına yakın sıcaklıktaki suda, terapistin taşımasıyla yapılan bir su terapisi yöntemidir. Bedenin zorlanmadan açılmasına izin verir.",
      "Sinir sistemi için derin bir reset; uzun süreli stres ve tutuk beden için nadir bulunur bir alandır.",
    ],
    forWhom: [
      "Yoğun zihinsel/duygusal yük taşıyan herkes",
      "Bedensel ağrı, kısıtlı hareket alanı ya da kronik gerginliği olanlar",
      "Suyla sağaltıcı bir ilişki kurmak isteyen kişiler",
    ],
    howItWorks: [
      {
        title: "Yerleşme",
        description:
          "Sıcak havuzda yüzdürülürken bedenin desteklenmesine alışırsın.",
      },
      {
        title: "Akış",
        description:
          "Hareket, dokunuş ve nefes eşliğinde beden yumuşak bir koreografide gezinir.",
      },
      {
        title: "Dinlenme",
        description:
          "Seans sonunda kısa bir kuru dinlenme ile etkinin sindirilmesine alan açılır.",
      },
    ],
    duration: "45–60 dk",
    format: "Sıcak havuz · Yüz yüze",
    image: "/images/hakkimda.png",
  },
  {
    slug: "retreatler",
    title: "Retreatler",
    tagline: "Doğa içinde derin bir tazelenme programı",
    metaDescription:
      "Çoklu günlük retreat programları — nefes, beden, doğa ve sessizlikle hayatına geri dönüş.",
    intro: [
      "Retreatler; günlük rutinden bir süreliğine çekilip nefes, beden ve sessizlikle birlikte derinleşmek isteyenler için tasarlanmış programlardır.",
      "Yılın belirli dönemlerinde küçük gruplarla, doğanın içinde gerçekleşir. Beslenme, hareket, susma ve paylaşım bir bütün olarak kurgulanır.",
    ],
    forWhom: [
      "Yoğun bir dönemin ardından kendine zaman ayırmak isteyenler",
      "Grupla, doğada ve niyetli bir alanda derinleşmek isteyenler",
      "Pratiğini bir adım öteye taşımak isteyen meditasyon ve nefes çalışanları",
    ],
    howItWorks: [
      {
        title: "Başvuru",
        description: "Sana uygun programı birlikte değerlendirir, başvurunu alırız.",
      },
      {
        title: "Program",
        description:
          "Günlük akış; sabah pratiği, atölyeler, doğa yürüyüşleri ve akşam paylaşımları üzerine kurulur.",
      },
      {
        title: "Kapanış",
        description:
          "Programın sonunda öğrenilenleri günlük yaşama taşımak için entegrasyon önerileri verilir.",
      },
    ],
    duration: "2–5 gün",
    format: "Doğa · Küçük grup",
    image: "/images/beyouretreat.png",
  },
  {
    slug: "online-seanslar",
    title: "Online Seanslar",
    tagline: "Nerede olursan ol, alanı birlikte açalım",
    metaDescription:
      "Online seanslar — nefes, danışmanlık ve farkındalık çalışması için uzaktan bağlanılan birebir oturumlar.",
    intro: [
      "Şehir, ülke veya program farketmeden bağlanabileceğin online seanslar; nefes pratiği, danışmanlık ve farkındalık çalışmasını uzaktan da güvenli şekilde mümkün kılıyor.",
      "Sessiz, kesintisiz bir alan ve sabit bir kamera açısı yeterli.",
    ],
    forWhom: [
      "Yurt dışında yaşayan veya yoğun seyahat eden danışanlar",
      "Bireysel takip seansları için sürekliliğe ihtiyaç duyanlar",
      "Yüz yüze gelmeden önce ortak bir alanı tanımak isteyenler",
    ],
    howItWorks: [
      {
        title: "Randevu",
        description:
          "Randevu sayfasından uygun zamanı seç; onayla birlikte bağlantı linki ulaşır.",
      },
      {
        title: "Seans",
        description:
          "Görüşme; sohbet, nefes pratiği ve gerektiğinde rehberli meditasyondan oluşur.",
      },
      {
        title: "Takip",
        description:
          "Seans sonrası kısa bir öneri notu ve ihtiyaç halinde takip planı paylaşılır.",
      },
    ],
    duration: "50 dk",
    format: "Online görüşme",
    image: "/images/hunver-man.png",
  },
]

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}
