import { userPreferencesContext } from "../../context/userPreferences";
import Giscus from "@giscus/react";
import { useContext, useEffect, useState } from "react";

export default function BlogPostComments() {
  const [theme] = useContext(userPreferencesContext).theme;
  const [giscusThemeSrc, setGiscusThemeSrc] = useState(
    "preferred_color_scheme"
  );
  useEffect(() => {
    setGiscusThemeSrc(
      theme === "dark"
        ? location.origin + "/css/giscus-theme-dark.css"
        : location.origin + "/css/giscus-theme-light.css"
    );
  }, [theme]);
  return (
    <section className="blurry blurry-2 rounded-lg px-2 py-4 shadow">
      <Giscus
        repo="goulinkh/goulin.fr"
        repoId="MDEwOlJlcG9zaXRvcnkxNzMxNTg0MDY="
        mapping="title"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusThemeSrc}
        lang="en"
        category="Blog"
        categoryId="DIC_kwDOClIwBs4CBEvj"
      />
    </section>
  );
}
