"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@workspace/ui/lib/utils"
import {
  LayoutDashboard,
  CalendarDays,
  Clock,
  Sparkles,
  Store,
  Newspaper,
  CalendarHeart,
  GraduationCap,
  Images,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin-auth"

interface NavItem {
  href: string
  label: string
  icon: typeof LayoutDashboard
  soon?: boolean
}

const NAV: NavItem[] = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard },
  { href: "/admin/randevular", label: "Randevular", icon: CalendarDays },
  { href: "/admin/rehber", label: "İşletme Rehberi", icon: Store },
  { href: "/admin/musaitlik", label: "Müsaitlik", icon: Clock },
  { href: "/admin/hizmetler", label: "Hizmetler", icon: Sparkles },
  { href: "/admin/blog", label: "Blog", icon: Newspaper, soon: true },
  { href: "/admin/etkinlikler", label: "Etkinlikler", icon: CalendarHeart, soon: true },
  { href: "/admin/egitimler", label: "Eğitimler", icon: GraduationCap, soon: true },
  { href: "/admin/galeri", label: "Galeri", icon: Images, soon: true },
  { href: "/admin/ayarlar", label: "Site Ayarları", icon: Settings },
]

function LoginScreen() {
  const { login } = useAdminAuth()
  const [pinInput, setPinInput] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const submit = async () => {
    setError("")
    setBusy(true)
    const ok = await login(pinInput)
    setBusy(false)
    if (!ok) setError("PIN hatalı")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0D0D0D] px-4">
      <div className="w-full max-w-xs rounded-xl border border-white/10 bg-[#141414] p-6 text-center">
        <h1 className="mb-4 text-lg font-bold text-white">Admin Panel</h1>
        <input
          type="password"
          value={pinInput}
          onChange={(e) => {
            setPinInput(e.target.value)
            setError("")
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && pinInput) submit()
          }}
          placeholder="PIN giriniz"
          className="mb-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-center text-sm text-white placeholder:text-white/20 focus:border-[#C8A96A]/40 focus:outline-none"
        />
        {error && <p className="mb-2 text-xs text-red-400">{error}</p>}
        <button
          onClick={submit}
          disabled={!pinInput || busy}
          className="w-full rounded-lg bg-[#C8A96A] py-2.5 text-sm font-semibold text-[#0D0D0D] transition-all hover:bg-[#d4b87a] disabled:opacity-50"
        >
          Giriş
        </button>
      </div>
    </main>
  )
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { logout } = useAdminAuth()

  return (
    <nav className="flex h-full flex-col gap-1 p-4">
      <div className="mb-4 px-3 text-sm font-bold tracking-wide text-[#C8A96A]">
        Çıralı Admin
      </div>
      {NAV.map((item) => {
        const active = pathname === item.href
        const Icon = item.icon
        const content = (
          <span
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              active
                ? "bg-[#C8A96A]/15 font-medium text-[#C8A96A]"
                : item.soon
                  ? "text-white/25"
                  : "text-white/60 hover:bg-white/[0.04] hover:text-white"
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{item.label}</span>
            {item.soon && (
              <span className="ml-auto rounded-full bg-white/[0.05] px-1.5 py-0.5 text-[9px] text-white/30">
                yakında
              </span>
            )}
          </span>
        )
        return item.soon ? (
          <div key={item.href} title="Yakında">
            {content}
          </div>
        ) : (
          <Link key={item.href} href={item.href} onClick={onNavigate}>
            {content}
          </Link>
        )
      })}
      <button
        onClick={logout}
        className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut className="size-4" /> Çıkış
      </button>
    </nav>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  const { authed, ready } = useAdminAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!ready) {
    return <main className="min-h-screen bg-[#0D0D0D]" />
  }
  if (!authed) {
    return <LoginScreen />
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Masaüstü sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-white/10 bg-[#0F0F0F] md:block">
        <Sidebar />
      </aside>

      {/* Mobil üst bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#0F0F0F] px-4 py-3 md:hidden">
        <span className="text-sm font-bold text-[#C8A96A]">Çıralı Admin</span>
        <button onClick={() => setMobileOpen(true)} className="text-white/60">
          <Menu className="size-5" />
        </button>
      </header>

      {/* Mobil sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-white/10 bg-[#0F0F0F]">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 text-white/50"
            >
              <X className="size-5" />
            </button>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="md:pl-60">
        <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-10">{children}</div>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <Shell>{children}</Shell>
    </AdminAuthProvider>
  )
}
