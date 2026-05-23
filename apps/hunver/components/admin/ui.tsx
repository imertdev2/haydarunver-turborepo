"use client"

import { cn } from "@workspace/ui/lib/utils"
import { Loader2 } from "lucide-react"

// Ortak admin UI parçaları. Stil rehber/randevu sayfalarındaki desenden çıkarıldı.
// Tema: bg #0D0D0D / kart #141414 / vurgu #C8A96A.

export function Field({
  label,
  required,
  full,
  children,
}: {
  label?: string
  required?: boolean
  full?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className={cn(full && "md:col-span-2")}>
      {label && (
        <label className="mb-1 block text-xs text-white/40">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      {children}
    </div>
  )
}

export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#C8A96A]/40 focus:outline-none"
    />
  )
}

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
  mono,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
  mono?: boolean
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className={cn(
        "w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-white placeholder:text-white/20 focus:border-[#C8A96A]/40 focus:outline-none",
        mono ? "font-mono text-xs" : "text-sm"
      )}
    />
  )
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-[#141414] px-3 py-2.5 text-sm text-white focus:border-[#C8A96A]/40 focus:outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-[#141414]">
          {o.label}
        </option>
      ))}
    </select>
  )
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <label className="inline-flex items-center gap-2 text-xs text-white/60">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 accent-[#C8A96A]"
      />
      {label}
    </label>
  )
}

export function Button({
  children,
  onClick,
  type = "button",
  disabled,
  loading,
  variant = "primary",
}: {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  loading?: boolean
  variant?: "primary" | "ghost"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all disabled:opacity-50",
        variant === "primary"
          ? "bg-[#C8A96A] text-[#0D0D0D] hover:bg-[#d4b87a]"
          : "border border-white/10 text-white/60 hover:border-[#C8A96A]/30 hover:text-white"
      )}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  )
}

export function IconBtn({
  children,
  onClick,
  title,
  danger,
}: {
  children: React.ReactNode
  onClick: () => void
  title: string
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "rounded-lg border px-2 py-1.5 transition-colors",
        danger
          ? "border-red-500/20 text-red-400 hover:bg-red-500/10"
          : "border-white/10 text-white/60 hover:border-[#C8A96A]/30 hover:text-[#C8A96A]"
      )}
    >
      {children}
    </button>
  )
}

export function FilterTabs<T extends string>({
  value,
  onChange,
  tabs,
}: {
  value: T
  onChange: (v: T) => void
  tabs: { key: T; label: string; count?: number }[]
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            value === t.key
              ? "bg-[#C8A96A]/15 text-[#C8A96A]"
              : "text-white/40 hover:text-white/60"
          )}
        >
          {t.label}
          {t.count !== undefined && <span className="ml-1 text-[10px]">({t.count})</span>}
        </button>
      ))}
    </div>
  )
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold text-white md:text-2xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-white/40">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-[#141414] p-5 md:p-6", className)}>
      {children}
    </div>
  )
}

export function EmptyState({ loading, message }: { loading?: boolean; message: string }) {
  return (
    <p className="py-12 text-center text-sm text-white/30">
      {loading ? "Yükleniyor..." : message}
    </p>
  )
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="size-6 animate-spin text-[#C8A96A]" />
    </div>
  )
}
