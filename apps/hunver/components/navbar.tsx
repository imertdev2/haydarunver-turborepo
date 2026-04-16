"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Search, ChevronDown } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@workspace/ui/components/navigation-menu"
import { Separator } from "@workspace/ui/components/separator"

const navLinks = [
  { label: "Hakkımda", href: "/hakkimda" },
  { label: "Etkinlikler", href: "/etkinlikler" },
]

const blogLinks = [
  { label: "Tüm Yazılar", href: "/blog" },
  { label: "Sanat", href: "/blog/sanat" },
  { label: "Kültür", href: "/blog/kultur" },
  { label: "Mimarlık", href: "/blog/mimarlik" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [locale, setLocale] = useState<"TR" | "RU">("RU")

  return (
    <header className="absolute inset-x-0 top-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center border border-[#C8A96A]/40 text-base font-semibold tracking-tight text-[#C8A96A]">
            <span className="font-serif">HÜ</span>
          </div>
          <span className="text-sm font-medium tracking-widest text-white uppercase">
            Haydar Ünver
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className="inline-flex h-9 items-center px-3 text-sm font-medium text-white/70 transition-colors hover:text-[#C8A96A]"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Blog Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex h-9 items-center gap-1 px-3 text-sm font-medium text-white/70 transition-colors hover:text-[#C8A96A] focus:outline-none">
                Blog
                <ChevronDown className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              {blogLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="mx-1 h-5 bg-[#C8A96A]/20" />

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-medium tracking-wider text-white/70 hover:bg-white/10 hover:text-[#C8A96A]"
            onClick={() => setLocale(locale === "TR" ? "RU" : "TR")}
          >
            {locale}
          </Button>

          {/* Search */}
          <Button variant="ghost" size="icon-sm" aria-label="Ara" className="text-white/70 hover:bg-white/10 hover:text-[#C8A96A]">
            <Search className="size-4" />
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-1 md:hidden">
          <Button variant="ghost" size="icon-sm" aria-label="Ara" className="text-white/70 hover:bg-white/10 hover:text-[#C8A96A]">
            <Search className="size-4" />
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menü" className="text-white/70 hover:bg-white/10 hover:text-[#C8A96A]">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-[#C8A96A]/10 bg-[#0D0D0D] p-0">
              <SheetHeader className="border-b border-[#C8A96A]/10 px-6 py-4">
                <SheetTitle className="text-left text-sm tracking-widest text-white uppercase">
                  Haydar Ünver
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col px-4 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-[#C8A96A]"
                  >
                    {link.label}
                  </Link>
                ))}

                <Separator className="my-2 bg-[#C8A96A]/10" />

                <p className="px-3 py-2 text-xs font-medium text-[#C8A96A]/60">
                  Blog
                </p>
                {blogLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2.5 pl-5 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-[#C8A96A]"
                  >
                    {link.label}
                  </Link>
                ))}

                <Separator className="my-2 bg-[#C8A96A]/10" />

                <button
                  onClick={() => setLocale(locale === "TR" ? "RU" : "TR")}
                  className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-[#C8A96A]"
                >
                  {locale === "RU" ? "Русский" : "Türkçe"}
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
