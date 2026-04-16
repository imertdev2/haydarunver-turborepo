import Link from "next/link"

const navLinks = [
  { label: "Hakkımda", href: "/hakkimda" },
  { label: "Eğitimler", href: "/egitimler" },
  { label: "Etkinlikler", href: "/etkinlikler" },
  { label: "Blog", href: "/blog" },
  { label: "Galeri", href: "/galeri" },
]

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Telegram", href: "https://telegram.org" },
]

export function Footer() {
  return (
    <footer className="border-t border-[#C8A96A]/10 bg-[#0D0D0D]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center border border-[#C8A96A]/40 text-base font-semibold tracking-tight text-[#C8A96A]">
                <span className="font-serif">HÜ</span>
              </div>
              <span className="text-sm font-medium tracking-widest text-white uppercase">
                Haydar Ünver
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/40 md:text-sm">
              Zihnini sıfırla, sistemini yeniden başlat. Nefes, bilinç ve dönüşüm yolculuğuna katıl.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-widest text-[#C8A96A]/60 uppercase">
              Sayfalar
            </h4>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-[#C8A96A]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-widest text-[#C8A96A]/60 uppercase">
              Sosyal Medya
            </h4>
            <nav className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 transition-colors hover:text-[#C8A96A]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-widest text-[#C8A96A]/60 uppercase">
              İletişim
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-white/50">
              <a href="mailto:info@haydarunver.com" className="transition-colors hover:text-[#C8A96A]">
                info@haydarunver.com
              </a>
              <p>Antalya, Türkiye</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#C8A96A]/10 pt-6 sm:flex-row md:mt-12 md:pt-8">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Haydar Ünver. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-4">
            <Link href="/gizlilik" className="text-xs text-white/30 transition-colors hover:text-white/60">
              Gizlilik Politikası
            </Link>
            <Link href="/kvkk" className="text-xs text-white/30 transition-colors hover:text-white/60">
              KVKK
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
