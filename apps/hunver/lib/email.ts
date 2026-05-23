import nodemailer from "nodemailer"

let cachedTransporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (cachedTransporter) return cachedTransporter

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    return null
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  return cachedTransporter
}

interface SendArgs {
  to: string
  subject: string
  html: string
  text: string
  icsContent?: string
  icsFilename?: string
}

async function send({ to, subject, html, text, icsContent, icsFilename }: SendArgs) {
  const transporter = getTransporter()
  if (!transporter) {
    console.warn("[email] SMTP not configured, skipping send to:", to)
    return { skipped: true }
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER!

  const attachments = icsContent
    ? [
        {
          filename: icsFilename || "randevu.ics",
          content: icsContent,
          contentType: "text/calendar; charset=utf-8; method=PUBLISH",
        },
      ]
    : undefined

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html,
    text,
    attachments,
  })

  return { messageId: info.messageId }
}

interface AppointmentEmailData {
  serviceName: string
  customerName: string
  customerPhone: string
  customerEmail: string | null
  customerNote: string | null
  date: string
  startTime: string
  endTime: string
}

function formatDateTR(dateISO: string) {
  return new Date(dateISO + "T00:00").toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function summaryRow(label: string, value: string) {
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;font-size:13px;">${label}</td><td style="padding:6px 0;color:#111;font-size:13px;font-weight:600;">${value}</td></tr>`
}

export async function sendAdminNewAppointmentEmail(data: AppointmentEmailData, icsContent?: string) {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    console.warn("[email] ADMIN_EMAIL not configured")
    return { skipped: true }
  }

  const dateText = formatDateTR(data.date)
  const subject = `Yeni Randevu: ${data.customerName} — ${dateText} ${data.startTime}`

  const text = [
    `Yeni randevu alındı.`,
    ``,
    `Hizmet: ${data.serviceName}`,
    `Tarih: ${dateText}`,
    `Saat: ${data.startTime} - ${data.endTime}`,
    `Müşteri: ${data.customerName}`,
    `Telefon: ${data.customerPhone}`,
    data.customerEmail ? `E-posta: ${data.customerEmail}` : null,
    data.customerNote ? `Not: ${data.customerNote}` : null,
  ]
    .filter(Boolean)
    .join("\n")

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
      <h2 style="margin:0 0 16px;color:#111;font-size:20px;">Yeni Randevu Alındı</h2>
      <table style="border-collapse:collapse;width:100%;">
        ${summaryRow("Hizmet", data.serviceName)}
        ${summaryRow("Tarih", dateText)}
        ${summaryRow("Saat", `${data.startTime} - ${data.endTime}`)}
        ${summaryRow("Müşteri", data.customerName)}
        ${summaryRow("Telefon", `<a href="tel:${data.customerPhone}" style="color:#258989;text-decoration:none;">${data.customerPhone}</a>`)}
        ${data.customerEmail ? summaryRow("E-posta", `<a href="mailto:${data.customerEmail}" style="color:#258989;text-decoration:none;">${data.customerEmail}</a>`) : ""}
        ${data.customerNote ? summaryRow("Not", data.customerNote.replace(/\n/g, "<br>")) : ""}
      </table>
      <p style="margin:24px 0 0;color:#888;font-size:12px;">Onaylamak için admin paneline gir.</p>
    </div>
  `

  return send({
    to: adminEmail,
    subject,
    html,
    text,
    icsContent,
    icsFilename: `randevu-${data.date}.ics`,
  })
}

export async function sendCustomerStatusEmail(
  data: AppointmentEmailData,
  status: "confirmed" | "cancelled",
  icsContent?: string
) {
  if (!data.customerEmail) {
    return { skipped: true }
  }

  const dateText = formatDateTR(data.date)
  const isCancelled = status === "cancelled"

  const subject = isCancelled
    ? `Randevunuz iptal edildi — ${dateText}`
    : `Randevunuz onaylandı — ${dateText} ${data.startTime}`

  const intro = isCancelled
    ? "Randevunuz iptal edilmiştir. Yeniden randevu almak isterseniz aşağıdaki bilgilerle bize ulaşabilirsiniz."
    : "Randevunuz onaylanmıştır. Aşağıdaki bilgilerle sizi bekliyoruz."

  const text = [
    `Merhaba ${data.customerName},`,
    ``,
    intro,
    ``,
    `Hizmet: ${data.serviceName}`,
    `Tarih: ${dateText}`,
    `Saat: ${data.startTime} - ${data.endTime}`,
  ].join("\n")

  const accent = isCancelled ? "#b54040" : "#258989"

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
      <h2 style="margin:0 0 8px;color:#111;font-size:20px;">
        ${isCancelled ? "Randevunuz iptal edildi" : "Randevunuz onaylandı"}
      </h2>
      <p style="margin:0 0 20px;color:#444;font-size:14px;line-height:1.6;">
        Merhaba <strong>${data.customerName}</strong>,<br>${intro}
      </p>
      <table style="border-collapse:collapse;width:100%;border-left:3px solid ${accent};padding-left:12px;">
        ${summaryRow("Hizmet", data.serviceName)}
        ${summaryRow("Tarih", dateText)}
        ${summaryRow("Saat", `${data.startTime} - ${data.endTime}`)}
      </table>
      <p style="margin:24px 0 0;color:#888;font-size:12px;">
        ${isCancelled ? "Sorunuz olursa cevap verin." : "Görüşmek üzere."}
      </p>
    </div>
  `

  return send({
    to: data.customerEmail,
    subject,
    html,
    text,
    icsContent: isCancelled ? undefined : icsContent,
    icsFilename: `randevu-${data.date}.ics`,
  })
}
