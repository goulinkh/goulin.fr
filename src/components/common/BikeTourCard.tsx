import { BikeTour } from "../../utils/komoot";
import clsx from "clsx";
import Image from "next/image";
import { ClockIcon, FireIcon, TrendingUpIcon } from "@heroicons/react/outline";

const toHHMMSS = (sec_num: number) => {
  let hours: any = Math.floor(sec_num / 3600);
  let minutes: any = Math.floor((sec_num - hours * 3600) / 60);
  let seconds: any = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

type Props = { tour: BikeTour; className?: string };

const BikeTourCard: React.FC<Props> = ({ tour, className }) => {
  return (
    <a href={`https://www.komoot.com/tour/${tour.id}`}>
      <div
        className={clsx(
          "blurry blurry-2 h-[500px] overflow-hidden rounded-lg",
          className
        )}
      >
        <div className="relative h-full w-full ">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={tour.coverImage.src}
            alt={tour.name}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          <div className="absolute top-[10%] left-[10%] h-[80%] w-[80%] rotate-12 overflow-hidden">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              src={`data:image/svg+xml;base64,${new Buffer(
                tour.routePathSvg
              ).toString("base64")}`}
              objectFit="contain"
              layout="fill"
            />
          </div>
          <div className="absolute top-0 left-0 flex h-full max-h-full w-full max-w-full flex-col justify-between p-4 text-sm text-zinc-200">
            <div>
              <div className="text-zinc-100/50">
                {new Date().toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="text-base">{tour.name}</div>
            </div>
            <ul className="flex flex-col gap-1">
              <li className="w -full flex flex-row items-center gap-1">
                <svg
                  className="h-3.5"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="none"
                >
                  <path
                    d="M22 16C22 10.4772 17.5228 6 12 6C6.47715 6 2 10.4772 2 16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M22 17C22.5523 17 23 16.5523 23 16C23 15.4477 22.5523 15 22 15C21.4477 15 21 15.4477 21 16C21 16.5523 21.4477 17 22 17Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span className="text-zinc-200/60">Distance</span>
                <hr className="flex-1 border-dotted border-zinc-200/30" />

                <span className="font-mono text-xs text-zinc-100">
                  {Math.round(tour.distanceKM)} km
                </span>
              </li>
              <li className="w -full flex flex-row items-center gap-1">
                <svg
                  className="h-3.5"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 7.01L12.01 6.99889"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M16 9.01L16.01 8.99889"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M8 9.01L8.01 8.99889"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M18 13.01L18.01 12.9989"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M6 13.01L6.01 12.9989"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M17 17.01L17.01 16.9989"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M7 17.01L7.01 16.9989"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 17L13 11"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M8.5 20.001H4C2.74418 18.3295 2 16.2516 2 14C2 8.47715 6.47715 4 12 4C17.5228 4 22 8.47715 22 14C22 16.2516 21.2558 18.3295 20 20.001L15.5 20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 23C13.6569 23 15 21.6569 15 20C15 18.3431 13.6569 17 12 17C10.3431 17 9 18.3431 9 20C9 21.6569 10.3431 23 12 23Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span className="text-zinc-200/60">Average speed</span>
                <hr className="flex-1 border-dotted border-zinc-200/30" />
                <span className="font-mono text-xs text-zinc-100">
                  {(tour.distanceKM / tour.durationHours).toFixed(1)} km/h
                </span>
              </li>

              <li className="w -full flex flex-row items-center gap-1">
                <ClockIcon className="h-3.5" />
                <span className="text-zinc-200/60">Duration</span>
                <hr className="flex-1 border-dotted border-zinc-200/30" />
                <span className="font-mono text-xs text-zinc-100">
                  {toHHMMSS(tour.durationSeconds)}
                </span>
              </li>
              <li className="w -full flex flex-row items-center gap-1">
                <FireIcon className="h-3.5" />
                <span className="text-zinc-200/60">Calories</span>
                <hr className="flex-1 border-dotted border-zinc-200/30" />
                <span className="font-mono text-xs text-zinc-100">
                  {Math.round(tour.burnCalories)} kcal
                </span>
              </li>
              <li className="w -full flex flex-row items-center gap-1">
                <TrendingUpIcon className="h-3.5" />
                <span className="text-zinc-200/60">Elevation</span>
                <hr className="flex-1 border-dotted border-zinc-200/30" />
                <span className="font-mono text-xs text-zinc-100">
                  {Math.round(tour.elevation)} m
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </a>
  );
};

export default BikeTourCard;
