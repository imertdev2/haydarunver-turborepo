// Sunucu tarafı admin yardımcıları — tüm /api/admin rotaları bunu kullanır.

// PIN doğrulama. ADMIN_PIN env tanımlı değilse tüm istekleri reddeder.
export function checkAuth(request: Request) {
  const expected = process.env.ADMIN_PIN
  if (!expected) {
    console.warn("[admin] ADMIN_PIN env not set — refusing all requests")
    return false
  }
  const pin = request.headers.get("x-admin-pin")
  return pin === expected
}

// 401 yanıtı (yetkisiz).
export function unauthorized() {
  return Response.json({ error: "Yetkisiz" }, { status: 401 })
}

// Türkçe karakter destekli URL-safe slug üretici.
export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ıİ]/g, "i")
    .replace(/[şŞ]/g, "s")
    .replace(/[çÇ]/g, "c")
    .replace(/[ğĞ]/g, "g")
    .replace(/[üÜ]/g, "u")
    .replace(/[öÖ]/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
