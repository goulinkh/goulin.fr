import { loginUrl } from "../../../lib/spotify"
import { NextApiRequest, NextApiResponse } from "next"

export default async function spotifyOAuth2Login(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  res.redirect(await loginUrl())
}
