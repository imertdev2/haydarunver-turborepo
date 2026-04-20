import { NextResponse } from "next/server"

export interface YouTubeShort {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
}

const API_KEY = process.env.YOUTUBE_API_KEY
const CHANNEL_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE || "@haydar_unversal"

async function getChannelId(): Promise<string | null> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.items?.[0]?.id ?? null
}

async function getShorts(channelId: string): Promise<YouTubeShort[]> {
  // Fetch recent videos from the channel, then filter shorts (duration < 60s)
  const searchRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=50&key=${API_KEY}`
  )
  if (!searchRes.ok) return []
  const searchData = await searchRes.json()

  const videoIds = searchData.items
    ?.map((item: { id: { videoId: string } }) => item.id.videoId)
    .filter(Boolean)
    .join(",")

  if (!videoIds) return []

  // Get video details to check duration (shorts are < 60 seconds)
  const detailsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${API_KEY}`
  )
  if (!detailsRes.ok) return []
  const detailsData = await detailsRes.json()

  return (detailsData.items ?? [])
    .filter((video: { contentDetails: { duration: string } }) => {
      const duration = video.contentDetails.duration
      // Parse ISO 8601 duration — shorts are typically PT<60S or PT<1M
      const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/)
      if (!match) return false
      const minutes = parseInt(match[1] || "0", 10)
      const seconds = parseInt(match[2] || "0", 10)
      return minutes === 0 && seconds <= 60
    })
    .map(
      (video: {
        id: string
        snippet: {
          title: string
          thumbnails: { high: { url: string } }
          publishedAt: string
        }
      }) => ({
        id: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.high.url,
        publishedAt: video.snippet.publishedAt,
      })
    )
}

// Revalidate every 1 hour — new shorts appear within an hour
export const revalidate = 3600

export async function GET() {
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    return NextResponse.json(
      { error: "YouTube API key not configured", shorts: [] },
      { status: 200 }
    )
  }

  try {
    const channelId = await getChannelId()
    if (!channelId) {
      return NextResponse.json(
        { error: "Channel not found", shorts: [] },
        { status: 200 }
      )
    }

    const shorts = await getShorts(channelId)
    return NextResponse.json({ shorts })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch shorts", shorts: [] },
      { status: 200 }
    )
  }
}
