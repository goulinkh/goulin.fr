import { useContext, useEffect, useState } from "react";
import { userPreferencesContext } from "../context/userPreferences";

type Theme =
  | "github-light"
  | "github-dark"
  | "preferred-color-scheme"
  | "github-dark-orange"
  | "icy-dark"
  | "dark-blue"
  | "photon-dark"
  | "boxy-light"
  | "gruvbox-dark";
export default function BlogPostComments() {
  const [utterancesEl, setUtterancesEl] = useState<Element | null>(null);
  const [theme] = useContext(userPreferencesContext).theme;
  const [commentTheme, setCommentTheme] = useState<Theme>(
    theme === "dark" ? "photon-dark" : "github-light"
  );

  // Inject styling classes and remove the default style
  useEffect(() => {
    if (!utterancesEl) return;
    utterancesEl.classList.add("w-full", "max-w-full");
    utterancesEl.removeAttribute("style");
    // const iframe = utterancesEl.querySelector(".utterances-frame");
  }, [utterancesEl]);

  useEffect(() => {
    setCommentTheme(theme === "dark" ? "photon-dark" : "github-light");
  }, [theme]);

  // Starts the client whenever it's stopped
  useEffect(() => {
    // remove the existing element and create a new one with the new theme
    if (utterancesEl) {
      utterancesEl.remove();
      setUtterancesEl(null);
    }

    renderUtterances().then((el) => setUtterancesEl(el));
  }, [commentTheme]);

  const renderUtterances = (): Promise<Element> =>
    new Promise((s) => {
      let script = document.createElement("script");
      let anchor = document.getElementById("utterances");
      // Documentation: https://utteranc.es/
      script.setAttribute("src", "https://utteranc.es/client.js");
      script.setAttribute("crossorigin", "anonymous");
      script.setAttribute("async", "true");
      script.setAttribute("repo", "goulinkh/goulin.fr");
      script.setAttribute("issue-term", "title");
      script.setAttribute("label", "blog Comments");
      script.setAttribute("theme", commentTheme);
      anchor?.appendChild(script);
      setInterval(() => {
        const utterancesDivEl = document.querySelector(".utterances");
        if (utterancesDivEl) s(utterancesDivEl);
      }, 60);
    });

  return <section id="utterances"></section>;
}
