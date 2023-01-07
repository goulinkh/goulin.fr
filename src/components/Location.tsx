import { MapPinIcon } from "@heroicons/react/24/outline"

const Location = () => (
  <div className="mx-auto flex w-fit items-center justify-center rounded-full border border-black/10 border-opacity-5 bg-black/5 px-2 py-1 text-sm opacity-75 backdrop-blur-sm transition dark:border-white/10 dark:bg-white/5">
    <MapPinIcon className="mr-2 h-4 w-4" /> France, Toulouse
  </div>
)

export default Location
