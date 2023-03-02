import { Redis } from "ioredis"

const redis = new Redis(process.env.REDIS_URL as string)
// prefix dev if local
const isDev = process.env.NODE_ENV === "development"

export const key = (k: string) => `${isDev ? "dev." : ""}goulin.fr.${k}`
export default redis
