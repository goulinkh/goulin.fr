import { CheckIcon, ClipboardIcon, CodeIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { userPreferencesContext } from "../../context/userPreferences";
import { copyTextToClipboard } from "../../utils/common";

const CodeCopyPastBtn: React.FC<{ content: string }> = ({ content }) => {
  const successShowTime = 2000;
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip();
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), successShowTime);
  }, [copied]);
  return (
    <div
      className={clsx(
        "absolute top-3 right-4 transition-opacity group-hover:opacity-100",
        { "opacity-0": !copied }
      )}
    >
      <button
        className={clsx("btn flex transition-all", {
          "!bg-green-600/70 text-white": copied,
        })}
        ref={setTriggerRef}
        onClick={() => {
          copyTextToClipboard(content);
          setCopied(true);
        }}
      >
        {copied ? (
          <CheckIcon className="w-5" />
        ) : (
          <ClipboardIcon className="w-5" />
        )}
      </button>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: "tooltip-container default blurry blurry-2",
          })}
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </div>
      )}
    </div>
  );
};
const CodeLanguage: React.FC<{ language: string }> = ({ language }) => {
  return (
    <div className="pointer-events-none absolute bottom-4 right-5 flex items-center space-x-1 font-mono text-sm text-sky-500 dark:text-sky-400">
      <CodeIcon className="w-4" /> <span>{language}</span>
    </div>
  );
};

const Code: React.FC<any> = ({ className, ...props }) => {
  const [theme] = useContext(userPreferencesContext).theme;
  const match = /language-(\w+)/.exec(className || "");
  const inlineCode = !className;
  const codeToShow = inlineCode ? props.children : props.children.slice(0, -1);
  const language = match?.[1];
  return (
    <div className="group relative">
      <CodeCopyPastBtn content={props.children} />
      {language ? <CodeLanguage language={language} /> : null}
      <SyntaxHighlighter
        className="not-prose rounded-lg border border-gray-200 !p-4 !font-mono shadow dark:border-gray-600"
        language={language || "ini"}
        PreTag={inlineCode ? "pre" : "span"}
        CodeTag={inlineCode ? "code" : "span"}
        {...props}
        style={theme === "dark" ? atomOneDark : atomOneLight}
      >
        {codeToShow}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
