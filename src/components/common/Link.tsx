import clsx from "clsx"
import L from "next/link"
import { AnchorHTMLAttributes, DetailedHTMLProps, Ref } from "react"

export type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & { linkRef?: Ref<HTMLAnchorElement> }
const Link: React.FC<LinkProps> = ({
  href,
  children,
  className,
  linkRef,
  ...props
}) => {
  return (
    <L legacyBehavior href={href!} passHref>
      <a
        ref={linkRef}
        className={clsx(
          "p-1 opacity-75 before:bg-black/10 hover:opacity-100 before:dark:bg-white/10",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    </L>
  )
}

export default Link
