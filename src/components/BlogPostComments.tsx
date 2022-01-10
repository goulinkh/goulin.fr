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
const commentTheme: { dark: Theme; light: Theme } = {
  dark: "photon-dark",
  light: "github-light",
};
export default function BlogPostComments() {
  const [utterancesEl, setUtterancesEl] = useState<Element | null>(null);
  const [theme] = useContext(userPreferencesContext).theme;
  const [scriptIsLoading, setScriptIsLoading] = useState<Promise<void> | null>(
    null
  );
  // Inject styling classes and remove the default style
  useEffect(() => {
    if (!utterancesEl) return;
    utterancesEl.classList.add("w-full", "max-w-full");
    utterancesEl.removeAttribute("style");
    // const iframe = utterancesEl.querySelector(".utterances-frame");
  }, [utterancesEl]);

  useEffect(() => {
    // remove the existing element and create a new one with the new theme
    if (scriptIsLoading) {
      scriptIsLoading.then(() => {
        document.querySelectorAll(".utterances").forEach((e) => e.remove());
        setUtterancesEl(null);
        setScriptIsLoading(renderUtterances());
      });
    } else setScriptIsLoading(renderUtterances());
  }, [theme]);

  const renderUtterances = (): Promise<void> =>
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
      script.setAttribute("theme", commentTheme[theme]);
      anchor?.appendChild(script);
      setInterval(() => {
        const utterancesDivEl = document.querySelector(".utterances");
        if (utterancesDivEl) {
          setUtterancesEl(utterancesDivEl);
          s();
        }
      }, 60);
    });

  return <section id="utterances"></section>;
}
