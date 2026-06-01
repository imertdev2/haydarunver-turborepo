import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Хайдар Юнвер | Дыхание, семейные расстановки, биоэнергия",
  description:
    "Индивидуальные и групповые сессии: дыхательная терапия, биоэнергия, семейные расстановки и звуковая медитация. Анталья, Чиралы.",
  alternates: {
    canonical: "/ru",
    languages: {
      "tr-TR": "/",
      "ru-RU": "/ru",
    },
  },
  robots: { index: true, follow: true },
}

const WA_URL =
  "https://wa.me/908503031559?text=" +
  encodeURIComponent("Здравствуйте, хочу узнать о сессиях.")

export default function RuLanding() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-24 pb-20 md:pt-28 md:pb-24" lang="ru">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <header className="mb-10 text-center md:mb-14">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:text-base">
            Русская версия
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Дыхание, энергия и осознанность — возвращение к себе
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
            Индивидуальные сеансы, групповые встречи, семейные расстановки,
            звуковая медитация и дыхательные практики — поддержка телесного,
            ментального и эмоционального баланса.
          </p>
        </header>

        {/* Hizmetler */}
        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { title: "Дыхательная терапия", desc: "Осознанное дыхание для регуляции нервной системы." },
            { title: "Семейные расстановки", desc: "Системный взгляд на скрытые семейные динамики." },
            { title: "Биоэнергия", desc: "Балансировка тонкого энергетического поля тела." },
            { title: "Звуковая медитация", desc: "Тибетские чаши и вибрации звука для глубокого расслабления." },
          ].map((s) => (
            <article
              key={s.title}
              className="rounded-2xl border border-white/10 bg-[#141414] p-5"
            >
              <h2 className="text-base font-semibold text-white md:text-lg">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{s.desc}</p>
            </article>
          ))}
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-[#C8A96A]/15 bg-gradient-to-br from-[#141414] via-[#0D0D0D] to-[#141414] p-6 md:p-8">
          <h2 className="text-lg font-semibold text-white md:text-xl">
            Записаться на сеанс
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/60 md:text-base">
            Свяжитесь со мной напрямую в WhatsApp или забронируйте онлайн.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#20bd5a]"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
            <Link
              href="/randevu"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C8A96A] px-5 py-2.5 text-sm font-semibold text-[#0D0D0D] transition-all hover:bg-[#d4b87a]"
            >
              Онлайн-запись
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <p className="mt-10 text-center text-xs italic text-white/30">
          Полная русская версия сайта готовится. Спасибо за терпение.
        </p>

        <p className="mt-4 text-center text-xs text-white/40">
          <Link href="/" className="underline-offset-4 hover:text-[#C8A96A] hover:underline">
            ← Türkçe versiyon / Türkçeye dön
          </Link>
        </p>
      </div>
    </main>
  )
}
