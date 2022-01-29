import React, {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

export type UserPreferences = {
  theme: [
    "light" | "dark",
    React.Dispatch<React.SetStateAction<"light" | "dark">>
  ];
};

export const userPreferencesContext = createContext<UserPreferences>(
  null as unknown as UserPreferences
);

type Props = {
  children: ReactNode;
};

// when old nav with no prefers-color-scheme and no theme selected
export const DEFAULT_THEME: Theme = "light";

export const UserPreferencesProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  /* Theme */
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
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
