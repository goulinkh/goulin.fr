import { currentPlayingSong } from "../../../lib/spotify"
import { NextApiRequest, NextApiResponse } from "next"

export default async function spotifyCurrentSong(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const song = await currentPlayingSong()
    res.status(200).json(song)
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message })
  }
}
