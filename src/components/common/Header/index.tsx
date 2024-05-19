import styles from "./header.module.scss"
import ThemeToggle from "./ThemeToggle"
import Avatar from "../Avatar"
import Link from "../Link"
import clsx from "clsx"
import { useRouter } from "next/router"
import {
  AnchorHTMLAttributes,
  CSSProperties,
  DetailedHTMLProps,
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react"

const LinkWithEffect: FC<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
> = ({ children, className, ...props }) => {
  const router = useRouter()
  const linkRef = useRef(null)
  useEffect(() => {
    if (router.pathname === props.href && linkRef.current && props.onClick) {
      props.onClick({ currentTarget: linkRef.current } as any)
    }
  }, [router, linkRef.current])
  return (
    <Link
      linkRef={linkRef}
      {...props}
      className={clsx(className, "px-1 sm:px-4", {
        [styles.active]: router.pathname === props.href,
      })}
    >
      {children}
    </Link>
  )
}

const ToggleTheme = ({ isDraft = false }) => (
  <div className="flex items-center px-4">
    {isDraft ? (
      <span className="rounded-md bg-yellow-200/60 px-1 py-0.5 text-yellow-700 dark:bg-yellow-200/20 dark:text-yellow-400 sm:px-2 sm:py-1">
        Draft
      </span>
    ) : null}
    <ThemeToggle />
  </div>
)

type LightEffect = {
  x: number
  y: number
  height: number
  width: number
  element?: HTMLAnchorElement
}
const Header: React.FC<{ takeSpace?: boolean; isDraft?: boolean }> = ({
  takeSpace = true,
  isDraft = false,
}) => {
  const [lightEffectPosition, setLightEffectPosition] = useState<LightEffect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const handleLinkActive: MouseEventHandler<HTMLAnchorElement> = (e) => {
    const x = e.currentTarget.offsetLeft,
      y = e.currentTarget.offsetTop
    const target = e.currentTarget as HTMLAnchorElement
    const previousEl = lightEffectPosition.element
    if (previousEl) previousEl.classList.remove(styles.active)
    target.classList.add(styles.active)
    setLightEffectPosition({
      width: target.offsetWidth,
      height: target.offsetHeight,
      x,
      y,
      element: target,
    })
  }

  return (
    <div
      className={clsx(
        "max-w-container fixed top-0 z-30 mx-auto flex w-full select-none content-between items-center",
        {
          sticky: takeSpace,
          fixed: !takeSpace,
        }
      )}
    >
      <Link href="/">
        <Avatar />
      </Link>
      <header
        className={clsx(
          styles.header,
          "blurry mx-auto my-2 flex w-fit items-center overflow-hidden rounded-3xl !border-none"
        )}
      >
        <nav
          style={
            {
              "--x": `${lightEffectPosition.x}px`,
              "--y": `${lightEffectPosition.y}px`,
              "--width": `${lightEffectPosition.width}px`,
              "--height": `${lightEffectPosition.height}px`,
            } as CSSProperties
          }
          className="dark-border relative flex flex-nowrap items-center overflow-hidden rounded-3xl border px-2 py-2 text-xs sm:flex-wrap sm:text-base"
        >
          <LinkWithEffect
            href="/"
            className="mr-1 sm:mr-5"
            onClick={handleLinkActive}
          >
            Home
          </LinkWithEffect>
          <LinkWithEffect
            href="/blogs"
            className="mr-1 sm:mr-5"
            onClick={handleLinkActive}
          >
            Writing
          </LinkWithEffect>
          <LinkWithEffect href="/about" onClick={handleLinkActive}>
            About
          </LinkWithEffect>
          <div
            className={clsx(
              `pointer-events-none absolute inset-0 -z-20 h-[50%] w-full translate-y-[80%]`,
              styles.lightEffect
            )}
          ></div>
        </nav>
      </header>
      <ToggleTheme isDraft={isDraft} />
    </div>
  )
}

export default Header
