import redis, { key } from "./redis"
import Vibrant from "node-vibrant"
import SpotifyWebApi from "spotify-web-api-node"

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } =
  process.env
const credentials = {
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: SPOTIFY_REDIRECT_URI,
}
const scopes = [
  "user-read-email",
  "user-top-read",
  "user-read-recently-played",
  "user-read-currently-playing",
]
export const spotifyApi = new SpotifyWebApi(credentials)

const config = {
  // 10 minutes
  accessTokenTTL: 600,
}

export type Song = {
  id: string
  name: string
  duration: number
  progress: number
  expireAt: number | string
  url: string
  previewUrl: string | null
  artist: string
  image: string
  backgroundColor: string
  foregroundColor: string
  isPlaying: boolean
}

export async function loginUrl() {
  if (await redis.get(key("spotify.refresh_token"))) return "/?status=success"
  return spotifyApi.createAuthorizeURL(scopes, "")
}

export async function accessToken(code?: string) {
  if (!code) return
  if (await redis.get(key("spotify.refresh_token"))) return
  const data = await spotifyApi.authorizationCodeGrant(code)
  const { access_token, refresh_token } = data.body
  await redis.setex(
    key("spotify.access_token"),
    config.accessTokenTTL,
    access_token
  )
  await redis.set(key("spotify.refresh_token"), refresh_token)
}

async function refreshToken() {
  const accessToken = await redis.get(key("spotify.access_token"))
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken)
    return
  }
  const refreshToken = await redis.get(key("spotify.refresh_token"))
  if (!refreshToken) {
    throw new Error("Not authorized")
  }
  spotifyApi.setRefreshToken(refreshToken)
  const { access_token, refresh_token } = (
    await spotifyApi.refreshAccessToken()
  ).body
  await redis.setex(
    key("spotify.access_token"),
    config.accessTokenTTL,
    access_token
  )
  spotifyApi.setAccessToken(access_token)
  if (refresh_token) {
    await redis.set(key("spotify.refresh_token"), refresh_token)
  }
}

async function cachedSong() {
  const song = await redis.get(key("spotify.current_song"))
  if (!song) return
  return JSON.parse(song)
}

async function extractSongColors(imageUrl: string) {
  const pallette = await Vibrant.from(imageUrl).getPalette()
  const fg = pallette.Vibrant?.hex || pallette.DarkVibrant?.hex
  const bg = pallette.LightVibrant?.hex || pallette.LightMuted?.hex
  return {
    backgroundColor: bg || "#000000",
    foregroundColor: fg || "#ffffff",
  }
}

function extractLastSong(last: SpotifyApi.PlayHistoryObject): Song {
  const { track, played_at } = last
  const { name, artists, album } = track
  const { images } = album
  const imageUrl = images[0].url
  const artist = artists[0].name
  const playedAt = new Date(played_at)
  return {
    id: track.id,
    name,
    duration: track.duration_ms,
    progress: 0,
    expireAt: playedAt.getTime() + track.duration_ms,
    url: track.external_urls.spotify,
    previewUrl: track.preview_url,
    artist,
    image: imageUrl,
    isPlaying: false,
    backgroundColor: "#000000",
    foregroundColor: "#ffffff",
  }
}

function extractCurrentPlaying(current: SpotifyApi.CurrentlyPlayingResponse) {
  if (!current.item) return null
  return {
    id: current.item.id,
    name: current.item.name,
    url: current.item.external_urls.spotify,
    duration: current.item.duration_ms,
    expireAt: current.timestamp + current.item.duration_ms,
    isPlaying: current.is_playing,
    progress: current.progress_ms,
    // @ts-ignore
    artist: current.item.artists[0].name || "",
    // @ts-ignore
    image: current.item.album.images[0].url,
    // @ts-ignore
    previewUrl: current.item.preview_url,
  }
}

async function lastPlayed() {
  await refreshToken()
  const last = extractLastSong(
    (await spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 })).body.items[0]
  )
  return last
}

export async function currentPlayingSong() {
  await refreshToken()
  const current =
    extractCurrentPlaying((await spotifyApi.getMyCurrentPlayingTrack()).body) ||
    (await lastPlayed())
  const cached = await cachedSong()
  if (current) {
    if (cached?.id === current.id) {
      return cached
    } else {
      const colors = await extractSongColors(current.image)
      const song = { ...current, ...colors }
      await redis.set(key("spotify.current_song"), JSON.stringify(song))
      return song
    }
  } else {
    throw new Error("No song playing")
  }
}
