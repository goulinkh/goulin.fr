import { atob } from "buffer";
import makeFetchCookie from "fetch-cookie";
import fs, { fstat, writeFileSync } from "fs";

const CookieJar = makeFetchCookie.toughCookie.CookieJar;

import fetch from "node-fetch";
import toGeoJSON from "@mapbox/togeojson";
import { geoMercator } from "d3-geo";

const DOMParser = require("xmldom").DOMParser;
export type BikeTour = {
  routePathSvg: string;
  images: {
    src: string;
    isCover: boolean;
  }[];
  coverImage: {
    src: string;
    isCover: boolean;
  };
  id: string;
  name: string;
  distanceKM: number;
  durationSeconds: number;
  durationHours: number;
  burnCalories: number;
  elevation: number;
  date: Date;
};

export class Komoot {
  cookieJar: typeof CookieJar;
  fetch: any;
  constructor() {
    if (
      fs.existsSync("./cookie.json") &&
      process.env.NODE_ENV === "development"
    ) {
      this.cookieJar = CookieJar.deserializeSync(
        JSON.parse(fs.readFileSync("./cookie.json").toString("utf-8"))
      );
    } else {
      this.cookieJar = new CookieJar();
    }
    this.fetch = makeFetchCookie(fetch, this.cookieJar);
  }

  private get: (url: string, type?: string) => Promise<Response> = async (
    url: string,
    type = "application/json"
  ) => {
    const response = await this.fetch(url, {
      // @ts-ignore
      headers: {
        accept: type,
        "accept-language": "en",
        onlyprops: "true",
      },
      body: null,
      method: "GET",
      // @ts-ignore
      credentials: "include",
    });
    await fs.promises.writeFile(
      "./cookie.json",
      JSON.stringify(this.cookieJar)
    );
    return response as Response;
  };
  getUserId() {
    try {
      return JSON.parse(
        atob(
          this.cookieJar.store.idx["www.komoot.com"]["/"]["kmt_session"].value
        )
      ).profile.username;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    let userId = this.getUserId();
    if (userId) {
      return userId;
    }
    let response = (await this.fetch("https://account.komoot.com/v1/signin", {
      method: "POST",
      // @ts-ignore
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })) as Response;
    let payload = await response.json();

    const loginSuccessfully = payload.type === "logged_in" && !payload.error;
    if (!loginSuccessfully)
      throw new Error(
        `Failed to login to Komoot, action: ${payload.type} errors: ${payload.error}`
      );

    // a silly request to init the cookies in www.komoot.com (needed to know the user id)
    response = await this.get(
      `https://www.komoot.com/user/null/tours?type=recorded`
    );
    userId = this.getUserId();
    if (!userId)
      throw new Error(
        "Failed to get the user id, wrong login (most likely) or komoot did un update to the auth service."
      );
    return userId;
  }

  async fetchTours(userId: string, page = 0, perPage = 24): Promise<any[]> {
    const url = `https://www.komoot.com/api/v007/users/2127024967400/tours/?sport_types=&type=tour_recorded&sort_field=date&sort_direction=desc&name=&status=private&hl=en&page=${page}&limit=${perPage}`;
    let response = await this.get(url, "application/hal+json,application/json");
    let payload = await response.json();
    if (payload.status && payload.status > 200) {
      return [];
    }
    const totalPages = payload.page.totalPages;
    let totalTours = payload._embedded.tours;
    if (page + 1 < totalPages) {
      totalTours = totalTours.concat(await this.fetchTours(userId, page + 1));
    }
    writeFileSync("tours.json", JSON.stringify(totalTours));
    return totalTours.filter((tour: any) => tour.status === "public");
  }

  async customTourDetails(tour: any) {
    const gpxUrl = `https://www.komoot.com/api/v007/tours/${tour.id}.gpx?hl=en`;
    const tourDetailsUrl = `https://www.komoot.com/tour/${tour.id}`;
    let response = await this.get(gpxUrl, "*/*");
    const gpx = new DOMParser().parseFromString(await response.text());
    response = await this.get(tourDetailsUrl);
    const tourDetails = await response.json();
    const images: { src: string; isCover: boolean }[] =
      tourDetails.page._embedded.tour._embedded.timeline._embedded.items
        .filter((item: any) => item.type === "image")
        .map((image: any) => ({
          src: image._embedded.reference.src.replace(/\?.+$/, ""),
          isCover: image._embedded.reference.cover !== null,
        }));
    const coverImage = images.find((image) => image.isCover) || images[0];
    // const coverImageDate = await (await fetch(coverImage.src)).blob();
    const geoJson = toGeoJSON.gpx(gpx);
    const geoToScreen = geoMercator().fitExtent(
      [
        [0, 0],
        [1000, 1000],
      ],
      geoJson
    );
    const svgPath =
      "M " +
      geoJson.features[0].geometry.coordinates.map(geoToScreen).join(" L ");
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
      </svg>`;
    const durationHours =
      tourDetails.page._embedded.tour.time_in_motion / 60 / 60;
    const burnCalories = 7 * 80 * durationHours;
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
    };
  }
}