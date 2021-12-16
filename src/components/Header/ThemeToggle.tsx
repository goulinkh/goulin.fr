import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import { userPreferencesContext } from "../../context/userPreferences";

const ThemeToggle = () => {
  const [theme, setTheme] = useContext(userPreferencesContext).theme;

  const handleToggleClick = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  return (
    <button onClick={handleToggleClick}>
      {theme === "dark" ? (
        <SunIcon className="h-6" />
      ) : (
        <MoonIcon className="h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
