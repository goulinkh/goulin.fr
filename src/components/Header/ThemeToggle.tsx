import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import { userPreferencesContext } from "../../context/userPreferences";
import { usePopperTooltip } from "react-popper-tooltip";

const ThemeToggle = () => {
  const [theme, setTheme] = useContext(userPreferencesContext).theme;
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip();
  const handleToggleClick = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  return (
    <>
      <button
        onClick={handleToggleClick}
        className="p-1 rounded opacity-75 hover:opacity-100 dark:hover:bg-white/10 hover:bg-black/5"
        ref={setTriggerRef}
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
          {...getTooltipProps({ className: "tooltip-container default blurry blurry-2" })}
        >
          Switch to {theme === "dark" ? "light" : "dark"} theme
        </div>
      )}
    </>
  );
};

export default ThemeToggle;
