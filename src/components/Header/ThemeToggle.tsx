import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { userPreferencesContext } from "../../context/userPreferences";

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
        className="btn"
        ref={setTriggerRef}
        aria-label={`Switch to the ${theme === "dark" ? "light" : "dark"} theme`}
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
  );
};

export default ThemeToggle;
