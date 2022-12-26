import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import useMedia from "../hooks/use-media";

type Theme = "light" | "dark";

export type UserPreferences = {
  theme: [Theme, React.Dispatch<React.SetStateAction<"light" | "dark">>];
};

export const userPreferencesContext = createContext<UserPreferences>(
  null as unknown as UserPreferences
);

type Props = {
  children: ReactNode;
};

export const UserPreferencesProvider: FC<Props> = ({ children }) => {
  const isDark = useMedia("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState<Theme>("dark");
  /* Theme */
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && isDark)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  useEffect(() => {
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(
      theme === "dark" ? "light" : "dark"
    );
    localStorage.theme = theme;
  }, [theme]);
  return (
    <userPreferencesContext.Provider value={{ theme: [theme, setTheme] }}>
      {children}
    </userPreferencesContext.Provider>
  );
};
