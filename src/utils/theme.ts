export function getUserTheme(): Theme | null {
  if (!process.browser) return null;
  return (localStorage.getItem('theme') as Theme) || 'light';
}

export function setUserTheme(theme: Theme) {
  if (!process.browser) return;
  localStorage.setItem('theme', theme);
}
