import type { Metadata } from "next"
import { LegalPage } from "../(legal)/legal-page"

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
  robots: { index: true, follow: false },
}

export default function KvkkPage() {
  return (
    <LegalPage
      title="KVKK Aydınlatma Metni"
      intro="6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, Haydar Ünver tarafından sunulan hizmetler kapsamında işlenen kişisel verileriniz hakkında sizi bilgilendirmek isteriz."
      updatedAt="20 Mayıs 2026"
      sections={[
        {
          heading: "Veri Sorumlusu",
          body: (
            <p>
              Bu metin kapsamındaki kişisel verileriniz, veri sorumlusu sıfatıyla Haydar
              Ünver tarafından işlenmektedir. İletişim: info@haydarunver.com.
            </p>
          ),
        },
        {
          heading: "İşlenen Kişisel Veriler",
          body: (
            <>
              <p>
                Randevu, eğitim ve etkinliklere kayıt sırasında ad-soyad, telefon, e-posta
                ve serbest metin alanlarına yazdığınız notlar işlenmektedir.
              </p>
              <p>
                Site kullanımına ilişkin teknik veriler (IP, tarayıcı bilgisi, log kayıtları)
                güvenlik ve performans amacıyla işlenebilir.
              </p>
            </>
          ),
        },
        {
          heading: "İşleme Amaçları",
          body: (
            <p>
              Verileriniz; randevu ve hizmet sürecinin yürütülmesi, sizinle iletişime
              geçilmesi, hizmet kalitesinin geliştirilmesi ve yasal yükümlülüklerin yerine
              getirilmesi amacıyla işlenir.
            </p>
          ),
        },
        {
          heading: "Aktarılan Taraflar",
          body: (
            <p>
              Verileriniz, hizmet aldığımız altyapı sağlayıcıları (barındırma, e-posta
              gönderim, veritabanı) ile yalnızca işin gerektirdiği ölçüde paylaşılır.
              Yetkili kamu kurumlarına yasal zorunluluk halinde aktarım yapılabilir.
            </p>
          ),
        },
        {
          heading: "Haklarınız",
          body: (
            <>
              <p>
                KVKK md. 11 uyarınca verilerinize ilişkin bilgi talep etme, düzeltme,
                silme, işlemeye itiraz etme ve zararın giderilmesini talep etme haklarına
                sahipsiniz.
              </p>
              <p>
                Taleplerinizi <a href="mailto:info@haydarunver.com" className="text-[#C8A96A] underline">info@haydarunver.com</a> adresine iletebilirsiniz.
              </p>
            </>
          ),
        },
      ]}
    />
  )
}
