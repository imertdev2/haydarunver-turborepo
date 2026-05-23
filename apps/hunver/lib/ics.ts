interface IcsArgs {
  uid: string
  title: string
  description?: string
  location?: string
  date: string // "YYYY-MM-DD"
  startTime: string // "HH:MM"
  endTime: string // "HH:MM"
  organizerEmail?: string
  organizerName?: string
  attendeeEmail?: string
  attendeeName?: string
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function formatLocalDateTime(date: string, time: string) {
  const [y, m, d] = date.split("-").map(Number)
  const [h, min] = time.split(":").map(Number)
  return `${y}${pad(m!)}${pad(d!)}T${pad(h!)}${pad(min!)}00`
}

function escapeIcs(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n")
}

function foldLine(line: string) {
  if (line.length <= 75) return line
  const chunks: string[] = []
  let i = 0
  while (i < line.length) {
    chunks.push((i === 0 ? "" : " ") + line.slice(i, i + 73))
    i += 73
  }
  return chunks.join("\r\n")
}

export function buildIcs({
  uid,
  title,
  description,
  location,
  date,
  startTime,
  endTime,
  organizerEmail,
  organizerName,
  attendeeEmail,
  attendeeName,
}: IcsArgs) {
  const dtStart = formatLocalDateTime(date, startTime)
  const dtEnd = formatLocalDateTime(date, endTime)
  const now = new Date()
  const dtStamp =
    `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}` +
    `T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//hunver//randevu//TR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;TZID=Europe/Istanbul:${dtStart}`,
    `DTEND;TZID=Europe/Istanbul:${dtEnd}`,
    `SUMMARY:${escapeIcs(title)}`,
    description ? `DESCRIPTION:${escapeIcs(description)}` : null,
    location ? `LOCATION:${escapeIcs(location)}` : null,
    organizerEmail
      ? `ORGANIZER;CN=${escapeIcs(organizerName || organizerEmail)}:mailto:${organizerEmail}`
      : null,
    attendeeEmail
      ? `ATTENDEE;CN=${escapeIcs(attendeeName || attendeeEmail)};RSVP=FALSE:mailto:${attendeeEmail}`
      : null,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean) as string[]

  return lines.map(foldLine).join("\r\n")
}
