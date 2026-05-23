import type { Metadata } from "next"
import { LegalPage } from "../(legal)/legal-page"

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Haydar Ünver web sitesi gizlilik politikası — toplanan veriler, kullanım amacı ve haklarınız.",
  alternates: { canonical: "/gizlilik" },
  robots: { index: true, follow: false },
}

export default function GizlilikPage() {
  return (
    <LegalPage
      title="Gizlilik Politikası"
      intro="Bu gizlilik politikası, haydarunver.com'u ziyaret ettiğinizde hangi bilgilerin toplandığını, nasıl kullanıldığını ve haklarınızı açıklar."
      updatedAt="20 Mayıs 2026"
      sections={[
        {
          heading: "Toplanan Bilgiler",
          body: (
            <>
              <p>
                Randevu, iletişim veya bülten formlarını doldurduğunuzda ad-soyad,
                telefon ve e-posta bilgilerinizi sizden talep ederiz.
              </p>
              <p>
                Ek olarak; ziyaret tarihi, tarayıcı türü, kullanılan cihaz ve IP adresi
                gibi teknik veriler analitik ve güvenlik amacıyla kaydedilebilir.
              </p>
            </>
          ),
        },
        {
          heading: "Çerezler",
          body: (
            <p>
              Site, deneyimi iyileştirmek ve tercihlerinizi hatırlamak için çerez
              kullanabilir. Tarayıcı ayarlarınızdan çerezleri yönetebilir veya
              engelleyebilirsiniz.
            </p>
          ),
        },
        {
          heading: "Verilerin Kullanımı",
          body: (
            <p>
              Toplanan bilgiler yalnızca; randevu yönetimi, sizinle iletişim, hizmet
              kalitesinin iyileştirilmesi ve yasal yükümlülüklerin yerine getirilmesi
              amacıyla kullanılır. Üçüncü taraflarla pazarlama amaçlı paylaşılmaz.
            </p>
          ),
        },
        {
          heading: "Üçüncü Taraf Hizmetler",
          body: (
            <p>
              Site; barındırma, e-posta gönderim ve analitik için üçüncü taraf
              hizmetlerden yararlanır. Bu sağlayıcılar yalnızca işin gerektirdiği
              verilere erişir ve kendi gizlilik politikaları çerçevesinde işlem yapar.
            </p>
          ),
        },
        {
          heading: "Veri Güvenliği",
          body: (
            <p>
              Verileriniz; SSL şifreleme, erişim kısıtlaması ve güncel altyapı
              uygulamalarıyla korunur. Yine de internet üzerinde hiçbir iletim yöntemi
              %100 güvenli değildir; makul tedbirler dışında garanti verilmez.
            </p>
          ),
        },
        {
          heading: "İletişim",
          body: (
            <p>
              Gizlilik politikasıyla ilgili sorularınız için{" "}
              <a href="mailto:info@haydarunver.com" className="text-[#C8A96A] underline">
                info@haydarunver.com
              </a>{" "}
              adresinden ulaşabilirsiniz.
            </p>
          ),
        },
      ]}
    />
  )
}
