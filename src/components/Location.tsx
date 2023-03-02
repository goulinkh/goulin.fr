import { MapPinIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

const Location = ({ className }: { className?: string }) => (
  <div
    className={clsx(
      "flex w-fit select-none items-center justify-center rounded-full border border-black/10 border-opacity-5 bg-black/5 pr-2 text-sm opacity-75 backdrop-blur-sm transition dark:border-white/10 dark:bg-white/5",
      className
    )}
  >
    <div className="dark-border mr-1.5 flex h-6 w-6 scale-110 items-center justify-center rounded-full !border-black/20 bg-zinc-100 dark:!border-white/20 dark:bg-zinc-700">
      <MapPinIcon className="w-3h-3.5 h-3.5" />
    </div>{" "}
    France, Toulouse
  </div>
)

export default Location
