import {
  createContext, Dispatch, SetStateAction, useState,
} from 'react';

import { getUserTheme, setUserTheme } from 'src/utils/theme';

type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};
export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<any> = ({ children }: any) => {
  const [theme, setTheme] = useState<Theme>(getUserTheme() || 'light');
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (props) => {
          setUserTheme(props.toString() as Theme);
          setTheme(props);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
