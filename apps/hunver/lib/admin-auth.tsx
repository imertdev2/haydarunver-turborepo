"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

const PIN_STORAGE_KEY = "hunver_admin_pin"
// PIN doğrulama için kullanılan hafif uç nokta (GET, yan etkisiz).
const VERIFY_ENDPOINT = "/api/admin/appointments"

interface AdminAuthValue {
  pin: string
  authed: boolean
  ready: boolean
  login: (pin: string) => Promise<boolean>
  logout: () => void
  // x-admin-pin header'ını otomatik ekleyen fetch sarmalayıcı.
  authedFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
}

const AdminAuthContext = createContext<AdminAuthValue | null>(null)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [pin, setPin] = useState("")
  const [authed, setAuthed] = useState(false)
  const [ready, setReady] = useState(false)

  // Sayfa yenilemede sessionStorage'daki PIN'i doğrulayıp oturumu sürdür.
  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? sessionStorage.getItem(PIN_STORAGE_KEY) : null
    if (!stored) {
      setReady(true)
      return
    }
    fetch(VERIFY_ENDPOINT, { headers: { "x-admin-pin": stored } })
      .then((res) => {
        if (res.ok) {
          setPin(stored)
          setAuthed(true)
        } else {
          sessionStorage.removeItem(PIN_STORAGE_KEY)
        }
      })
      .catch(() => {})
      .finally(() => setReady(true))
  }, [])

  const login = useCallback(async (candidate: string) => {
    try {
      const res = await fetch(VERIFY_ENDPOINT, {
        headers: { "x-admin-pin": candidate },
      })
      if (!res.ok) return false
      setPin(candidate)
      setAuthed(true)
      sessionStorage.setItem(PIN_STORAGE_KEY, candidate)
      return true
    } catch {
      return false
    }
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(PIN_STORAGE_KEY)
    setPin("")
    setAuthed(false)
  }, [])

  const authedFetch = useCallback(
    async (input: RequestInfo | URL, init: RequestInit = {}) => {
      const headers = new Headers(init.headers)
      headers.set("x-admin-pin", pin)
      if (init.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json")
      }
      return fetch(input, { ...init, headers })
    },
    [pin]
  )

  const value = useMemo(
    () => ({ pin, authed, ready, login, logout, authedFetch }),
    [pin, authed, ready, login, logout, authedFetch]
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider")
  return ctx
}
