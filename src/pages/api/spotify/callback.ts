import { accessToken } from "../../../lib/spotify"
import { NextApiRequest, NextApiResponse } from "next"

export default async function spotifyOAuth2CB(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { code } = req.query
  if (!code || Array.isArray(code)) {
    res.status(400).json({ error: "Missing code" })
    return
  }
  try {
    await accessToken(code)
    res.redirect("/?status=success")
  } catch (error: unknown) {
    res.redirect("/?status=error")
  }
}
