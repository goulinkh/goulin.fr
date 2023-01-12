import { userPreferencesContext } from "../../../context/userPreferences"
import { isBrowser } from "../../../hooks/use-media"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"
import { usePopperTooltip } from "react-popper-tooltip"

const ThemeToggle = () => {
  const [theme, setTheme] = useContext(userPreferencesContext).theme
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip()
  const handleToggleClick = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark")
  }
  if (!isBrowser) return null
  return (
    <>
      <button
        onClick={handleToggleClick}
        className="btn blurry !rounded-2xl !p-2"
        ref={setTriggerRef}
        aria-label={`Switch to the ${
          theme === "dark" ? "light" : "dark"
        } theme`}
      >
        {theme === "dark" ? (
          <SunIcon className="h-6" />
        ) : (
          <MoonIcon className="h-6" />
        )}
      </button>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: "tooltip-container default blurry blurry-2",
          })}
        >
          Switch to {theme === "dark" ? "light" : "dark"} theme
        </div>
      )}
    </>
  )
}

export default ThemeToggle
