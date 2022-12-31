import toGeoJSON from "@mapbox/togeojson"
import { geoMercator } from "d3-geo"
import fetch from "node-fetch"

const DOMParser = require("xmldom").DOMParser
export type BikeTour = {
  routePathSvg: string
  images: {
    src: string
    isCover: boolean
  }[]
  coverImage: {
    src: string
    isCover: boolean
  }
  id: string
  name: string
  distanceKM: number
  durationSeconds: number
  durationHours: number
  burnCalories: number
  elevation: number
  date: Date
}

export class Komoot {
  private get: (url: string, type?: string) => Promise<Response> = async (
    url: string,
    type = "application/json"
  ) => {
    const response = await fetch(url, {
      headers: {
        accept: type,
        "accept-language": "en",
        onlyprops: "true",
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
      },
      method: "GET",
    })
    return response as Response
  }

  async fetchTours(userId: string, page = 0, perPage = 24): Promise<any[]> {
    const url = `https://www.komoot.com/api/v007/users/${userId}/tours/?sport_types=&type=tour_recorded&sort_field=date&sort_direction=desc&name=&status=public&hl=en&page=${page}&limit=${perPage}`
    let response = await this.get(url, "application/hal+json,application/json")
    let payload = await response.json()
    if (payload.status && payload.status > 200) {
      return []
    }
    const totalPages = payload.page.totalPages
    let totalTours = payload._embedded.tours
    if (page + 1 < totalPages) {
      totalTours = totalTours.concat(await this.fetchTours(userId, page + 1))
    }
    return totalTours.filter((tour: any) => tour.status === "public")
  }

  async customTourDetails(tour: any) {
    const gpxUrl = `https://www.komoot.com/api/v007/tours/${tour.id}.gpx?hl=en`
    const tourDetailsUrl = `https://www.komoot.com/tour/${tour.id}`
    let response = await this.get(gpxUrl, "*/*")
    const gpx = new DOMParser().parseFromString(await response.text())
    response = await this.get(tourDetailsUrl)
    const tourDetails = await response.json()
    const images: { src: string; isCover: boolean }[] =
      tourDetails.page._embedded.tour._embedded.timeline._embedded.items
        .filter((item: any) => item.type === "image")
        .map((image: any) => ({
          src: image._embedded.reference.src.replace(/\?.+$/, ""),
          isCover: image._embedded.reference.cover !== null,
        }))
    const coverImage = images.find((image) => image.isCover) || images[0]
    const geoJson = toGeoJSON.gpx(gpx)
    const geoToScreen = geoMercator().fitExtent(
      [
        [0, 0],
        [1000, 1000],
      ],
      geoJson
    )
    const svgPath = `M ${geoJson.features[0].geometry.coordinates
      .map(geoToScreen)
      .join(" L ")}`
    const routePathSvg =
      /* HTML */
      `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="1000"
        height="1000"
        viewbox="0 0 1000 1000"
      >
        <path
          d="${svgPath}"
          fill="none"
          stroke="rgba(255,255,255,1)"
          stroke-width="6"
          stroke-linecap="round"
          stroke-miterlimit="4"
        />
      </svg>`
    const durationHours =
      tourDetails.page._embedded.tour.time_in_motion / 60 / 60
    const burnCalories = 7 * 80 * durationHours
    return {
      routePathSvg,
      images,
      coverImage,
      id: tourDetails.page._embedded.tour.id,
      name: tourDetails.page._embedded.tour.name,
      distanceKM: tourDetails.page._embedded.tour.distance / 1000,
      durationSeconds: tourDetails.page._embedded.tour.time_in_motion,
      durationHours,
      burnCalories,
      date: tourDetails.page._embedded.tour.date,
      elevation: tourDetails.page._embedded.tour.elevation_up,
    }
  }
}
