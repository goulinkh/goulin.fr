import clsx from "clsx";
import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
const LinkPreview = () => {
  const [hidden, setHidden] = useState(true);
  return (
    <div className="not-prose rounded-lg bg-zinc-200/60 p-5 dark:bg-zinc-800">
      <p className="opacity-70">↓ hover over this link</p>
      <a
        href="https://www.ubuntu.com"
        className="relative my-2 block w-fit rounded border border-zinc-300 bg-white p-3 dark:border-zinc-600 dark:bg-black/50"
        onMouseEnter={() => setHidden(false)}
        onMouseLeave={() => setHidden(true)}
      >
        Ubuntu Linux distribution
        <div
          className={clsx(
            "pointer-events-none absolute left-0 top-[125%] z-20 flex h-[200px] w-[600px] flex-row overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-lg transition-all dark:border-zinc-600 dark:bg-zinc-700",
            { "opacity-0": hidden }
          )}
        >
          <div className="flex flex-col content-start items-start gap-[10px] whitespace-nowrap p-[10px] text-left">
            <div className="flex flex-1 flex-col gap-[10px]">
              <div className="w-[380px] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold">
                Enterprise Open Source and Linux | Ubuntu
              </div>
              <div
                className="overflow-ellipsis whitespace-pre-wrap text-sm"
                style={{
                  lineClamp: 3,
                  boxOrient: "vertical",
                  display: "-webkit-box",
                }}
              >
                Ubuntu is the modern, open source operating system on Linux for
                the enterprise server, desktop, cloud, and IoT.
              </div>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <img
                src="https://assets.ubuntu.com/v1/49a1a858-favicon-32x32.png"
                alt="Ubuntu's favicon"
                className="h-[20px] w-[20px]"
              />
              <div className="uppercase text-gray-50">ubuntu.com</div>
            </div>
          </div>
          <img
            src="/assets/projects/images/ubuntu-screenshot.png"
            alt="Ubuntu main page screenshot"
            className="h-[200px] w-[200px]"
          />
        </div>
      </a>
    </div>
  );
};

export default LinkPreview;
