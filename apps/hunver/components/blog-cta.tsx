import { MessageCircle, CalendarCheck } from "lucide-react"
import Link from "next/link"

interface BlogCtaProps {
  topic?: string // örn. "Nefes Terapisi"
}

export function BlogCta({ topic }: BlogCtaProps) {
  const waText = topic
    ? `Merhaba, ${topic} hakkında bilgi almak ve randevu konusunda görüşmek istiyorum.`
    : "Merhaba, bireysel seans hakkında bilgi almak istiyorum."
  const waUrl = `https://wa.me/908503031559?text=${encodeURIComponent(waText)}`

  return (
    <aside className="mt-12 rounded-2xl border border-[#C8A96A]/15 bg-gradient-to-br from-[#141414] via-[#0D0D0D] to-[#141414] p-6 md:mt-16 md:p-8">
      <p className="text-sm leading-relaxed text-white/70 md:text-base">
        Bu çalışmayı deneyimlemek için bireysel seans veya grup çalışması hakkında bilgi
        alabilirsiniz.
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#20bd5a]"
        >
          <MessageCircle className="size-4" />
          WhatsApp ile Randevu Al
        </a>
        <Link
          href="/randevu"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#C8A96A]/40 bg-[#C8A96A]/10 px-5 py-2.5 text-sm font-semibold text-[#C8A96A] transition-all hover:bg-[#C8A96A]/15"
        >
          <CalendarCheck className="size-4" />
          Online Randevu
        </Link>
      </div>
    </aside>
  )
}
