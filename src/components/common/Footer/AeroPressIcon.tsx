import { usePopperTooltip } from "react-popper-tooltip";

const AeroPressIcon = ({ className }: { className: string }) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip();
  return (
    <>
      <div className={className} ref={setTriggerRef}>
        <svg viewBox="0 0 256 256" fill="currentColor">
          <path d="M190.6 168h-7.5c.5-4.2.8-7.8.9-10.5.2-3-2.2-5.5-5.1-5.5h9.1c2.2 0 4-1.8 4-4s-1.8-4-4-4h-28V68c0-4.4-3.6-8-8-8V24h12.8c1.7 0 3.2-1.4 3.2-3.2V20c0-2.2-1.8-4-4-4H91.2c-1.7 0-3.2 1.4-3.2 3.2v1.7c0 1.7 1.4 3.2 3.2 3.2H104v36c-4.4 0-8 3.6-8 8v76H68c-2.2 0-4 1.8-4 4s1.8 4 4 4h9.1c-2.9 0-5.3 2.5-5.1 5.5 1.1 19.2 8.2 82.5 56 82.5 26.5 0 40.5-19.4 47.9-40h10c.2 0 7.1 0 9.4-4.6 2.3-4.6 4.7-13.8 4.7-18.3s-4.9-9.2-9.4-9.2zM112 24h32v36h-32V24zm-8 44h48v76h-48V68zm24 164c-17.2 0-29.7-9.6-38.2-29.2-6.7-15.6-8.9-33.4-9.6-42.8h95.6c-.7 9.3-2.9 27.2-9.6 42.8-8.5 19.6-21 29.2-38.2 29.2zm60.3-40.5c-.5.3-1.6.5-2.4.5H179l3.8-16h7.6c.5.1 1.3.8 1.5 1.3-.1 3-1.8 10.3-3.6 14.2z"></path>
          <path d="M164.6 181.7c0-1.6-1.9-2.9-4.1-3.5-.2-.1-.5-.1-.7-.2-1.2-.3-2.4-.4-3.5-.2l-9.6 1.1c-.6.1-1.3.1-1.9 0l-16.7-1.9-16.5-1.9c-.6-.1-1.3-.1-1.9 0L98 176.4c-2.8.3-6.8 2-6.8 4 1.4 6.3 3.3 13 6 19.2 9.5 21.9 22.1 24.4 30.8 24.4s21.4-2.4 30.8-24.3c2.5-5.8 4.3-11.7 5.7-17.7l.1-.3z"></path>
        </svg>
      </div>

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: "tooltip-container default blurry blurry-2",
          })}
        >
          <span>
            <span className="rounded bg-red-600 p-[.2rem] text-white">
              AeroPress
            </span>{" "}
            coffee maker
          </span>
        </div>
      )}
    </>
  );
};

export default AeroPressIcon;
