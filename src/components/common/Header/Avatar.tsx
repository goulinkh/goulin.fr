import Image from "next/image";
import Link from "next/link";
import { usePopperTooltip } from "react-popper-tooltip";

const Avatar = () => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip();
  const backgroundAnimation = `
    @keyframes rainbow {
      0% {
        background-position: 0 82%;
      }
    
      50% {
        background-position: 100% 19%;
      }
    
      to {
        background-position: 0 82%;
      }
    }
  `;

  return (
    <>
      <Link passHref href="/">
        <a className="relative isolate h-14 w-14 hover:motion-safe:animate-disk-rotation">
          <div
            className="relative z-10 h-full w-full overflow-hidden rounded-full"
            ref={setTriggerRef}
          >
            <Image
              src="/images/personal-photo.png"
              alt="Goulin's personal photo"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <style>{backgroundAnimation}</style>
          <div
            style={{
              animation: "rainbow 28s ease infinite",
              background:
                "linear-gradient(124deg, #c678dd, #9449ab, #e06c75, #1f80bc, #9449ab,#c678dd)",
              backgroundSize: "1000% 1000%",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(110%)",
              borderRadius: "50%",
            }}
          ></div>
        </a>
      </Link>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: "tooltip-container default blurry blurry-2",
          })}
        >
          A disc record
        </div>
      )}
    </>
  );
};

export default Avatar;
