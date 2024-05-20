import { userPreferencesContext } from "../../context/userPreferences"
import { Song } from "../../lib/spotify"
import clsx from "clsx"
import { useContext, useEffect, useState } from "react"

const useLCD = (text: string, displaySize: number) => {
  const [displayText, setDisplayText] = useState(text.slice(0, displaySize))
  const [direction, setDirection] = useState("right")
  const [position, setPosition] = useState(0)
  const [switching, setSwitching] = useState(false)

  const sleep = (duration: number) =>
    new Promise((resolve) => setTimeout(resolve, duration))

  useEffect(() => {
    const interval = setInterval(async () => {
      if (switching) return
      if (direction === "right" && position < text.length - displaySize) {
        setPosition((prev) => prev + 1)
      } else if (direction === "left" && position > 0) {
        setPosition((prev) => prev - 1)
      }
      setDisplayText(text.slice(position, position + displaySize))
      if (position === text.length - displaySize && direction === "right") {
        setSwitching(true)
        setDirection("left")
        await sleep(600)
        setSwitching(false)
      } else if (position === 0 && direction === "left") {
        setSwitching(true)
        setDirection("right")
        await sleep(600)
        setSwitching(false)
      }
    }, 250)

    return () => clearInterval(interval) // clear interval on unmount
  }, [direction, position, text, switching, displaySize])
  return displayText
}

const LCD = ({ text, color }: { text: string; color: string }) => {
  const displaySize = 17
  const displayFont =
    "ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace"

  const displayText = useLCD(text, displaySize)

  return (
    <>
      <text
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
        xmlSpace="preserve"
        className={`whitespace-pre`}
        style={{ textShadow: `0 1px 2px ${color}` }}
        fontFamily={displayFont}
        fontSize="15"
        fontWeight="regular"
        letterSpacing="0.055em"
      >
        <tspan x="206" y="93.625">
          {displayText}
        </tspan>
      </text>
      <filter
        id="u"
        width={169.281}
        height={15.28}
        x={207.075}
        y={81.9}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.960784 0 0 0 0 0.705882 0 0 0 0 0.176471 0 0 0 0 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_10_186" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_10_186"
          result="shape"
        />
      </filter>
    </>
  )
}

const SpotifyButton = ({ songLink }: { songLink?: string }) => {
  const [theme] = useContext(userPreferencesContext).theme
  const [focused, setFocus] = useState(false)
  return (
    <>
      <circle cx={96} cy={88} r={43} fill="url(#g)" />

      <a
        href={songLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group focus:outline-none"
        onClick={(e) => {
          // blur
          e.currentTarget.blur()
          setFocus(false)
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        <g className="transition group-hover:translate-x-[4px] group-hover:translate-y-[4px] group-hover:scale-[0.96] group-focus:translate-x-[5px] group-focus:translate-y-[5px] group-focus:scale-95">
          <g filter="url(#h)">
            <circle cx={96.5} cy={87.5} r={31.5} fill="url(#i)" />
          </g>
          <g filter="url(#j)">
            <circle cx={96} cy={88} r={22} fill="url(#k)" />
          </g>
          <g filter="url(#l)">
            <path
              fill="#1ED760"
              d="M104.8 96.43c-.34.56-1.069.739-1.626.394-4.453-2.736-10.058-3.356-16.659-1.838a1.182 1.182 0 0 1-1.415-.896 1.188 1.188 0 0 1 .889-1.424c7.224-1.662 13.42-.946 18.419 2.128.557.344.734 1.076.392 1.636Zm2.321-5.197c-.428.701-1.339.922-2.034.492C99.99 88.57 92.219 87.658 86.19 89.5a1.479 1.479 0 0 1-1.845-.992 1.492 1.492 0 0 1 .986-1.855c6.887-2.103 15.449-1.084 21.303 2.535.695.431.915 1.347.487 2.046Zm.199-5.41c-6.112-3.653-16.196-3.99-22.031-2.207a1.772 1.772 0 0 1-2.212-1.19 1.788 1.788 0 0 1 1.182-2.226c6.699-2.046 17.834-1.65 24.871 2.553a1.79 1.79 0 0 1 .621 2.446 1.766 1.766 0 0 1-2.43.624h-.001Z"
            />
          </g>
        </g>
      </a>
      <linearGradient
        id="g"
        x1={111.5}
        x2={96}
        y1={45}
        y2={131}
        gradientUnits="userSpaceOnUse"
      >
        {theme === "light" ? (
          <>
            <stop stopColor="#E8E7E7" />
            <stop offset={1} stopColor="#FDFDFD" />
          </>
        ) : (
          <>
            <stop stopColor="#1A1A1A" />
            <stop offset={1} stopColor="#242424" />
          </>
        )}
      </linearGradient>
      <filter
        id="h"
        width={77}
        height={77}
        x={58}
        y={53}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={3.5} />
        <feComposite in2="hardAlpha" operator="out" />

        <feColorMatrix
          values={`0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${
            focused ? "0.0" : "0.15"
          } 0`}
        />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_10_186" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_10_186"
          result="shape"
        />
      </filter>
      <filter
        id="j"
        width={62}
        height={62}
        x={64}
        y={59}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-1} dy={2} />
        <feGaussianBlur stdDeviation={4.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_10_186" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_10_186"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={2} dy={-3} />
        <feGaussianBlur stdDeviation={3.5} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
        <feBlend in2="shape" result="effect2_innerShadow_10_186" />
      </filter>
      <filter
        id="l"
        width={29}
        height={22}
        x={82}
        y={77}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={-1} />
        <feGaussianBlur stdDeviation={0.5} />
        <feComposite in2="hardAlpha" operator="out" />
        {theme === "light" ? (
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0" />
        ) : (
          <feColorMatrix values="0 0 0 0 0.208333 0 0 0 0 0.207465 0 0 0 0 0.207465 0 0 0 1 0" />
        )}

        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_10_186" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={0.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend
          in2="effect1_dropShadow_10_186"
          result="effect2_dropShadow_10_186"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_10_186"
          result="shape"
        />
      </filter>
    </>
  )
}

const MP3Player = ({
  song,
  error,
  ...props
}: {
  song?: Song
  error?: Error
} & React.SVGProps<SVGSVGElement>) => {
  const [theme] = useContext(userPreferencesContext).theme
  let backgroundColor = song?.backgroundColor || "#dbdfa2"
  let textColor = song?.foregroundColor || "#060604"
  if (theme === "dark") {
    ;[backgroundColor, textColor] = [textColor, backgroundColor]
  }
  let title = "Loading"
  if (error) title = "Low power, please replace the battery"
  else if (song) {
    title = `${song.artist} - ${song.name}`
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 581 175"
      {...props}
      className={clsx("rounded-full shadow-lg", props.className)}
    >
      <g clipPath="url(#a)">
        <rect width={581} height={175} fill="url(#c)" rx={87.5} />
        <rect width={521} height={138} x={30} y={19} fill="url(#e)" rx={69} />
        <rect
          width={297}
          height={129}
          x={143}
          y={23}
          fill={theme === "light" ? "#1D1E22" : "#050505"}
          rx={64.5}
        />
        <path
          fill="#fff"
          d="M211.688 44h-3.367V33.09h3.516c1.058 0 1.963.22 2.716.656a4.286 4.286 0 0 1 1.731 1.87c.402.81.602 1.779.602 2.908 0 1.136-.202 2.115-.607 2.935a4.327 4.327 0 0 1-1.768 1.886c-.774.437-1.716.655-2.823.655Zm-2.046-1.172h1.96c.902 0 1.65-.174 2.243-.522a3.216 3.216 0 0 0 1.326-1.486c.291-.643.437-1.408.437-2.296 0-.88-.144-1.639-.432-2.274a3.177 3.177 0 0 0-1.289-1.47c-.571-.345-1.283-.517-2.136-.517h-2.109v8.565Zm11.606-9.737V44h-1.321V33.09h1.321Zm10.931 3.409a3.833 3.833 0 0 0-.463-.964 2.968 2.968 0 0 0-.677-.735 2.838 2.838 0 0 0-.884-.464 3.517 3.517 0 0 0-1.086-.16 3.24 3.24 0 0 0-1.764.501c-.529.334-.949.826-1.262 1.476-.312.65-.469 1.447-.469 2.391 0 .945.158 1.742.474 2.392.316.65.744 1.142 1.284 1.476.54.333 1.147.5 1.822.5.625 0 1.175-.133 1.651-.4a2.84 2.84 0 0 0 1.119-1.14c.27-.493.405-1.073.405-1.74l.404.084h-3.281v-1.172h4.155v1.172c0 .899-.192 1.68-.575 2.344a3.976 3.976 0 0 1-1.577 1.545c-.668.362-1.435.543-2.301.543-.966 0-1.815-.227-2.546-.682-.728-.454-1.297-1.1-1.705-1.939-.405-.838-.607-1.832-.607-2.983 0-.863.115-1.638.346-2.327a5.153 5.153 0 0 1 .991-1.769c.426-.486.93-.86 1.513-1.118a4.674 4.674 0 0 1 1.923-.39c.575 0 1.111.088 1.608.262.501.17.947.413 1.337.73.394.312.723.687.986 1.123.262.434.444.915.543 1.444h-1.364Zm5.836-3.41V44h-1.321V33.09h1.321Zm2.878 1.173V33.09h8.181v1.172h-3.43V44h-1.321v-9.737h-3.43ZM251.111 44h-1.385l4.006-10.91h1.364L259.101 44h-1.385l-3.26-9.183h-.085L251.111 44Zm.512-4.261h5.582v1.172h-5.582v-1.172ZM261.626 44V33.09h1.321v9.738h5.071V44h-6.392Zm14.306-10.91h1.576l3.708 9.056h.128l3.707-9.055h1.577V44h-1.236v-8.288h-.107L281.876 44h-1.193l-3.409-8.288h-.106V44h-1.236V33.09ZM290.101 44V33.09h3.687c.855 0 1.555.155 2.098.464.547.306.952.72 1.215 1.241.263.522.394 1.105.394 1.748a3.86 3.86 0 0 1-.394 1.752 2.93 2.93 0 0 1-1.204 1.257c-.543.31-1.239.464-2.088.464h-2.642v-1.172h2.599c.586 0 1.057-.101 1.412-.304.355-.202.612-.476.772-.82.164-.348.245-.74.245-1.177 0-.437-.081-.828-.245-1.172a1.751 1.751 0 0 0-.777-.81c-.359-.199-.835-.298-1.428-.298h-2.322V44h-1.322Zm13.841.15c-.703 0-1.33-.122-1.88-.363-.547-.242-.982-.577-1.305-1.007a2.7 2.7 0 0 1-.522-1.507h1.342c.029.351.149.655.362.91.214.253.492.448.837.586.344.139.726.208 1.145.208.469 0 .884-.081 1.246-.245.363-.163.647-.39.853-.682.206-.29.309-.628.309-1.012 0-.4-.1-.754-.299-1.06-.199-.309-.49-.55-.873-.724-.384-.174-.852-.261-1.406-.261h-.874V37.82h.874c.433 0 .813-.078 1.139-.234a1.83 1.83 0 0 0 .773-.66c.188-.285.282-.619.282-1.002 0-.37-.082-.691-.245-.964a1.674 1.674 0 0 0-.692-.64c-.295-.152-.643-.229-1.044-.229-.377 0-.732.07-1.066.208-.33.135-.6.332-.809.591-.21.256-.324.565-.341.927h-1.279a2.604 2.604 0 0 1 .517-1.502c.323-.433.746-.77 1.268-1.012a4.092 4.092 0 0 1 1.731-.362c.675 0 1.253.137 1.736.41.483.27.854.627 1.114 1.07.259.445.389.924.389 1.439 0 .614-.162 1.138-.485 1.571a2.46 2.46 0 0 1-1.305.9v.086c.689.113 1.227.406 1.614.879.387.468.58 1.049.58 1.741 0 .593-.161 1.126-.484 1.598-.32.47-.757.838-1.311 1.108-.554.27-1.184.405-1.891.405Zm11.926-.15V33.09h3.686c.855 0 1.555.155 2.098.464.547.306.952.72 1.215 1.241.263.522.394 1.105.394 1.748a3.86 3.86 0 0 1-.394 1.752 2.93 2.93 0 0 1-1.204 1.257c-.543.31-1.239.464-2.088.464h-2.642v-1.172h2.599c.586 0 1.057-.101 1.412-.304.355-.202.612-.476.772-.82.164-.348.245-.74.245-1.177 0-.437-.081-.828-.245-1.172a1.751 1.751 0 0 0-.777-.81c-.359-.199-.835-.298-1.428-.298h-2.322V44h-1.321Zm10.346 0V33.09h1.321v9.738h5.071V44h-6.392Zm10.398 0h-1.385l4.006-10.91h1.364L344.602 44h-1.384l-3.26-9.183h-.086L336.612 44Zm.512-4.261h5.582v1.172h-5.582v-1.172Zm7.952-6.648h1.513l3.025 5.092h.128l3.026-5.092h1.512l-3.941 6.413V44h-1.321v-4.496l-3.942-6.413ZM356.814 44V33.09h6.584v1.173h-5.263v3.686h4.922v1.172h-4.922v3.707h5.348V44h-6.669Zm9.79 0V33.09h3.686c.852 0 1.552.146 2.099.438.547.287.951.683 1.214 1.188.263.504.394 1.077.394 1.72s-.131 1.213-.394 1.71c-.263.497-.666.888-1.209 1.172-.543.28-1.238.42-2.083.42h-2.983v-1.193h2.941c.582 0 1.051-.085 1.406-.255.359-.17.618-.412.778-.725.163-.316.245-.692.245-1.129 0-.437-.082-.819-.245-1.145a1.677 1.677 0 0 0-.783-.757c-.359-.18-.833-.271-1.423-.271h-2.322V44h-1.321Zm5.135-4.9 2.684 4.9h-1.534l-2.642-4.9h1.492ZM234.321 129.09h1.577l3.707 9.055h.128l3.707-9.055h1.577V140h-1.236v-8.288h-.106L240.266 140h-1.194l-3.409-8.288h-.106V140h-1.236v-10.909ZM248.491 140v-10.909h3.686c.856 0 1.555.154 2.099.463.546.306.951.719 1.214 1.241a3.83 3.83 0 0 1 .394 1.748 3.86 3.86 0 0 1-.394 1.752 2.92 2.92 0 0 1-1.204 1.257c-.543.309-1.239.464-2.088.464h-2.642v-1.172h2.6c.585 0 1.056-.101 1.411-.304.355-.202.613-.476.772-.82a2.73 2.73 0 0 0 .245-1.177c0-.437-.081-.828-.245-1.172a1.743 1.743 0 0 0-.777-.81c-.359-.199-.835-.298-1.428-.298h-2.322V140h-1.321Zm13.841.149c-.704 0-1.33-.121-1.881-.362-.547-.242-.982-.577-1.305-1.007a2.715 2.715 0 0 1-.522-1.507h1.342c.029.351.15.655.363.911a2.1 2.1 0 0 0 .836.586 3.05 3.05 0 0 0 1.145.207c.469 0 .884-.081 1.247-.245.362-.163.646-.39.852-.682.206-.291.309-.628.309-1.012 0-.401-.1-.754-.298-1.06-.199-.309-.49-.55-.874-.724-.383-.174-.852-.261-1.406-.261h-.874v-1.172h.874a2.62 2.62 0 0 0 1.14-.234 1.84 1.84 0 0 0 .772-.661c.188-.284.282-.618.282-1.001 0-.37-.081-.691-.245-.964a1.674 1.674 0 0 0-.692-.64 2.251 2.251 0 0 0-1.044-.229c-.377 0-.732.07-1.065.208a1.98 1.98 0 0 0-.81.591 1.54 1.54 0 0 0-.341.927h-1.278a2.596 2.596 0 0 1 .516-1.502 3.25 3.25 0 0 1 1.268-1.012 4.09 4.09 0 0 1 1.731-.362c.675 0 1.254.136 1.737.41.483.27.854.627 1.113 1.071.259.443.389.923.389 1.438 0 .614-.162 1.138-.485 1.571-.32.433-.755.733-1.305.9v.086c.689.113 1.227.406 1.614.879.387.468.581 1.049.581 1.741 0 .593-.162 1.126-.485 1.598-.32.469-.756.838-1.31 1.108-.554.27-1.185.405-1.891.405Zm10.567-11.569-3.516 13.061h-1.15l3.516-13.061h1.15Zm4.467 11.42-2.983-10.909h1.343l2.279 8.885h.107l2.322-8.885h1.492l2.322 8.885h.107l2.28-8.885h1.342L284.994 140h-1.364l-2.407-8.693h-.085L278.73 140h-1.364Zm13.082-10.909h1.577l3.707 9.055h.128l3.707-9.055h1.577V140h-1.236v-8.288h-.106L296.393 140h-1.194l-3.409-8.288h-.106V140h-1.236v-10.909ZM305.065 140h-1.385l4.006-10.909h1.364L313.055 140h-1.385l-3.26-9.183h-.085l-3.26 9.183Zm.512-4.261h5.582v1.172h-5.582v-1.172Zm13.689-7.159-3.516 13.061h-1.151l3.516-13.061h1.151Zm2.485 11.42v-10.909h3.686c.852 0 1.552.146 2.099.437.547.287.952.683 1.214 1.188.263.504.395 1.077.395 1.72s-.132 1.213-.395 1.71c-.262.497-.665.888-1.209 1.172-.543.28-1.237.421-2.083.421h-2.982v-1.194h2.94c.582 0 1.051-.085 1.406-.255.359-.171.618-.412.778-.725.163-.316.245-.692.245-1.129 0-.437-.082-.818-.245-1.145a1.678 1.678 0 0 0-.783-.757c-.359-.181-.833-.271-1.422-.271h-2.323V140h-1.321Zm5.135-4.901 2.685 4.901h-1.534l-2.642-4.901h1.491Zm5.285 4.901v-10.909h6.584v1.172h-5.263v3.686h4.922v1.172h-4.922v3.707h5.348V140h-6.669Zm18.568-7.5h-1.321a2.742 2.742 0 0 0-1.113-1.726 2.975 2.975 0 0 0-.911-.447 3.62 3.62 0 0 0-1.044-.149c-.661 0-1.259.166-1.795.5-.533.334-.957.826-1.273 1.476-.313.65-.469 1.447-.469 2.391 0 .945.156 1.742.469 2.392.316.65.74 1.142 1.273 1.476.536.333 1.134.5 1.795.5.362 0 .71-.049 1.044-.149.334-.099.637-.247.911-.442a2.801 2.801 0 0 0 1.113-1.731h1.321a4.397 4.397 0 0 1-.543 1.497 4.11 4.11 0 0 1-.98 1.124c-.391.305-.83.538-1.316.697a4.9 4.9 0 0 1-1.55.24c-.931 0-1.758-.227-2.482-.682-.725-.454-1.295-1.101-1.71-1.939-.416-.838-.623-1.832-.623-2.983 0-1.15.207-2.144.623-2.983.415-.838.985-1.484 1.71-1.938.724-.455 1.551-.682 2.482-.682.55 0 1.067.08 1.55.239.486.16.925.395 1.316.704.39.305.717.678.98 1.118.263.437.444.936.543 1.497ZM174.5 98.716h-3.273v-1.292c0-.248.048-.46.142-.634a.967.967 0 0 1 .392-.4c.166-.092.358-.139.575-.139.218 0 .409.047.576.141.166.094.295.23.388.407.093.177.139.391.139.643v.823h-.555v-.711a.696.696 0 0 0-.068-.33.458.458 0 0 0-.194-.194.604.604 0 0 0-.286-.066.59.59 0 0 0-.284.066.434.434 0 0 0-.19.195.71.71 0 0 0-.069.332v.467h2.707v.692Zm0-3.499h-3.273v-.692h2.703v-1.403h.57v2.095Zm0-3.786v.742l-3.273-1.13v-.892l3.273-1.128v.741l-2.525.82v.026l2.525.821Zm-1.286.047v-1.752h.54v1.752h-.54Zm-1.987-2.908v-.775l1.41-.747v-.032l-1.41-.746v-.775l2.116 1.194h1.157v.687h-1.157l-2.116 1.194Zm3.273-4.038h-3.273v-2.205h.571v1.513h.78v-1.4h.57v1.4h.782v-1.52h.57v2.212Zm0-3.34h-3.273V79.9c0-.247.044-.458.133-.633a.915.915 0 0 1 .372-.401c.16-.093.348-.14.564-.14.218 0 .405.048.561.141a.91.91 0 0 1 .358.408c.083.177.125.39.125.642v.865h-.556v-.753a.848.848 0 0 0-.055-.329.387.387 0 0 0-.163-.195.512.512 0 0 0-.27-.065c-.108 0-.2.021-.275.065a.402.402 0 0 0-.169.197.813.813 0 0 0-.059.33v.467h2.707v.692Zm-1.489-1.767 1.489-.814v.764l-1.489.796v-.746ZM180 96.753v1.804h-5.091v-1.82c0-.511.102-.952.306-1.321.202-.37.493-.654.872-.853.38-.2.834-.3 1.363-.3.53 0 .986.1 1.367.3.381.199.673.485.877.857.204.372.306.816.306 1.333Zm-.922.728v-.683c0-.319-.057-.586-.169-.803a1.09 1.09 0 0 0-.53-.493c-.24-.11-.55-.166-.929-.166-.377 0-.684.055-.923.166-.238.11-.414.273-.527.49-.112.217-.169.485-.169.803v.686h3.247Zm-4.169-7.799 3.868-1.23v-.048l-3.868-1.233v-1.193L180 87.733v1.387l-5.091 1.758v-1.196ZM180 82.216h-5.091v-2.009c0-.385.069-.713.206-.984.136-.274.329-.482.58-.624.248-.145.541-.217.877-.217.338 0 .629.073.873.22.242.145.427.356.556.633.13.275.194.608.194 1v1.344h-.865v-1.17c0-.206-.028-.377-.084-.513a.611.611 0 0 0-.254-.303.803.803 0 0 0-.42-.102.832.832 0 0 0-.427.102.627.627 0 0 0-.264.306 1.26 1.26 0 0 0-.092.514v.726H180v1.077Zm-2.317-2.75L180 78.201v1.188l-2.317 1.238v-1.16ZM158.5 83H156v-4.5h14.5V83h-3v-2.5h-3v3h-3v-3h-3V83Z"
        />
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M156.5 100c0 .333.3 1 1.5 1h22.5c.333 0 1-.2 1-1V78.115c0-1.034-.466-2.115-1.5-2.115v0h-23c-.333 0-1 .3-1 1.5"
        />
        <path
          fill="#fff"
          d="M170 99h-13c-1.6-2.8-.667-6.833 0-8.5h13V93h-10c-.8.8-.333 1 0 1h10v2h-10c-.8 0-.333.667 0 1h10v2Z"
        />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M156 89.5h14v-2h-7v-3c-1.167-.333-4.2-.8-7 0v5Zm5.5-2h-3V86c.5-.167 1.8-.4 3 0v1.5Z"
          clipRule="evenodd"
        />
        <path
          fill="#fff"
          d="M401.892 82c-2.144 0-3.744.82-4.199 2.993-.207.992-.082 1.731.214 2.333h4.162c-.874-.844-1.764-1.494-1.557-2.486.124-.584.329-.921.931-.921.549 0 .667.337.543.921l-.211 1.016h2.78l.255-1.217c.419-2.002-1.041-2.639-2.918-2.639Zm-11.939.235-1.069 5.091h2.782l1.067-5.09h-2.78Zm4.257 0-1.07 5.091h2.783l1.069-5.09h-2.782Zm12.39 0-1.07 5.091h6.311c.667-.502 1.006-1.311 1.189-2.185.602-2.876-1.252-2.906-3.614-2.906H406.6Zm2.665 1.705c1.148-.01 1.133.49.9 1.591-.378 1.801-.92 1.512-1.8 1.565l.655-3.148c.087-.006.169-.007.245-.008Zm-8.7 7.68c-.148.708-.479.907-.934.907-.514 0-.691-.199-.543-.907l.284-1.354h-2.782l-.318 1.506c-.431 2.067 1.169 2.676 2.947 2.676 2.326 0 3.755-1.046 4.227-3.301.098-.472.117-.894.076-1.275h-3.364c.359.474.561 1.013.407 1.748Zm-12.353-1.094c-.319 1.517-.757 3.922 2.68 3.922 2.598 0 3.702-1.112 4.298-3.65l.195-.926h-2.779l-.208.99c-.2.957-.35 1.665-1.106 1.665-.72 0-.572-.708-.371-1.664l.208-.99h-2.78l-.137.653Zm15.872 3.684h2.816c2.953 0 4.25-.118 4.941-3.413.067-.322.124-.633.156-.925h-2.817c-.005.24-.054.558-.143.979-.26 1.24-.347 1.777-1.812 1.642l.547-2.62h-2.778l-.91 4.337Z"
        />
        <path
          fill="#fff"
          d="M418.881 84.833c-2.693 0-5.316 1.45-6.092 3.301H388.26l-.26 1.052h24.563c-.005 1.658 1.708 2.91 4.191 2.917H422.767l2.314-7.264-6.195-.006h-.005Zm6.792 1.047-1.666 5.176h4.441L430 85.88h-4.327Zm1.227 1.054h1.05l-.276 1.001h-1.053l.279-1.001Zm-.56 2.07h1.05l-.276 1h-1.053l.279-1Z"
        />
        <path
          fill="url(#f)"
          d="M371.339 23H211.661C173.741 23 143 51.878 143 87.5s30.741 64.5 68.661 64.5h159.678C409.259 152 440 123.122 440 87.5S409.259 23 371.339 23Z"
        />
        <SpotifyButton songLink={song?.url} />
        <g filter="url(#m)">
          <circle
            cx={86}
            cy={27}
            r={4}
            fill={theme === "light" ? "#EBEBEB" : "#1A1A1A"}
          />
        </g>
        <g filter="url(#n)">
          <circle
            cx={65}
            cy={41}
            r={4}
            fill={theme === "light" ? "#EBEBEB" : "#1A1A1A"}
          />
        </g>
        <g filter="url(#o)">
          <circle
            cx={51}
            cy={63}
            r={4}
            fill={theme === "light" ? "#EBEBEB" : "#1A1A1A"}
          />
        </g>
        <g filter="url(#p)">
          <circle
            cx={45}
            cy={88}
            r={4}
            fill={theme === "light" ? "#EBEBEB" : "#1A1A1A"}
          />
        </g>
        <g filter="url(#q)">
          <circle
            cx={86}
            cy={148}
            r={4}
            fill={theme === "light" ? "#EBEBEB" : "#1A1A1A"}
          />
        </g>
        <g filter="url(#r)">
          <circle
            cx={64.5}
            cy={132.5}
            r={3.5}
            fill={theme === "light" ? "#242323" : "#000000"}
          />
        </g>
        <g filter="url(#s)">
          <circle
            cx={50.5}
            cy={112.5}
            r={3.5}
            fill={theme === "light" ? "#242323" : "#000000"}
          />
        </g>
        <g filter="url(#t)">
          <path
            fill={backgroundColor}
            d="M199 59h182v58H199z"
            style={{
              filter:
                theme === "dark"
                  ? `drop-shadow(0px 0px 2px ${textColor})`
                  : undefined,
            }}
          />
        </g>
        <g filter="url(#u)">
          <LCD text={title} color={textColor} />
        </g>
        <g filter="url(#v)">
          <path
            stroke={song ? "transparent" : "rgb(207,207,207,0.5)"}
            d="M380 157c38.108 0 69-30.892 69-69 0-38.108-30.892-69-69-69h1c-3.314 0-6-4.03-6-9s2.686-9.5 6-9.5m0 174.5c-3.314 0-6-4.029-6-9s2.686-9 6-9"
          />
        </g>
        <mask
          id="w"
          width={206}
          height={175}
          x={375}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "alpha",
          }}
        >
          <path
            d="M493.5 175C541.825 175 582 136.325 582 88C582 39.6751 541.825 0 493.5 0H381C377.686 0 375 5.02944 375 10C375 14.9706 377.686 19 381 19C419.108 19 449 49.8924 449 88C449 126.108 419.108 157 381 157C377.686 157 375 161.029 375 166C375 170.971 377.686 175 381 175H493.5Z"
            fill="#FF0000"
          />
        </mask>
        {song ? (
          <g mask="url(#w)">
            <image
              xlinkHref={song.image}
              width={206}
              height={206}
              x={375}
              y={-15}
            />
          </g>
        ) : null}
      </g>

      <defs>
        {theme === "light" && (
          <filter
            id="b"
            width={589}
            height={183}
            x={-4}
            y={-4}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dx={-5} dy={7} />
            <feGaussianBlur stdDeviation={2} />
            <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
            <feColorMatrix values="0 0 0 0 0.95 0 0 0 0 0.95 0 0 0 0 0.95 0 0 0 1 0" />
            <feBlend in2="shape" result="effect1_innerShadow_10_186" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dx={5} dy={-7} />
            <feGaussianBlur stdDeviation={2} />
            <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
            <feColorMatrix values="0 0 0 0 0.916667 0 0 0 0 0.916667 0 0 0 0 0.916667 0 0 0 1 0" />
            <feBlend
              in2="effect1_innerShadow_10_186"
              result="effect2_innerShadow_10_186"
            />
          </filter>
        )}
        <filter
          id="d"
          width={529}
          height={146}
          x={23}
          y={18}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-3} dy={3} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_10_186"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_10_186"
            result="shape"
          />
        </filter>
        <filter
          id="m"
          width={10}
          height={10}
          x={81}
          y={22}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={1} dy={-1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_10_186" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-1} dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          {theme === "light" ? (
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          ) : (
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
          )}{" "}
          <feBlend
            in2="effect1_innerShadow_10_186"
            result="effect2_innerShadow_10_186"
          />
        </filter>
        <filter
          id="n"
          width={10}
          height={10}
          x={60}
          y={36}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={1} dy={-1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_10_186" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-1} dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          {theme === "light" ? (
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          ) : (
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
          )}{" "}
          <feBlend
            in2="effect1_innerShadow_10_186"
            result="effect2_innerShadow_10_186"
          />
        </filter>
        <filter
          id="o"
          width={10}
          height={10}
          x={46}
          y={58}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={1} dy={-1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_10_186" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-1} dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          {theme === "light" ? (
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          ) : (
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
          )}{" "}
          <feBlend
            in2="effect1_innerShadow_10_186"
            result="effect2_innerShadow_10_186"
          />
        </filter>
        <filter
          id="p"
          width={10}
          height={10}
          x={40}
          y={83}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={1} dy={-1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_10_186" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-1} dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          {theme === "light" ? (
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          ) : (
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
          )}

          <feBlend
            in2="effect1_innerShadow_10_186"
            result="effect2_innerShadow_10_186"
          />
        </filter>
        <filter
          id="q"
          width={10}
          height={10}
          x={81}
          y={143}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={1} dy={-1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_10_186" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-1} dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          {theme === "light" ? (
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          ) : (
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
          )}

          <feBlend
            in2="effect1_innerShadow_10_186"
            result="effect2_innerShadow_10_186"
          />
        </filter>
        <filter
          id="r"
          width={9}
          height={9}
          x={60}
          y={128}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={1} dy={-1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_10_186" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-1} dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="effect1_innerShadow_10_186"
            result="effect2_innerShadow_10_186"
          />
        </filter>
        <filter
          id="s"
          width={9}
          height={9}
          x={46}
          y={108}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={1} dy={-1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />

          <feBlend in2="shape" result="effect1_innerShadow_10_186" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-1} dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="effect1_innerShadow_10_186"
            result="effect2_innerShadow_10_186"
          />
        </filter>
        <filter
          id="t"
          width={194}
          height={70}
          x={193}
          y={57}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={3} />
          <feComposite in2="hardAlpha" operator="out" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_10_186"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_10_186"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-1} dy={1} />
          <feGaussianBlur stdDeviation={3.5} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
          <feBlend in2="shape" result="effect2_innerShadow_10_186" />
        </filter>

        <filter
          id="v"
          width={81}
          height={181.5}
          x={371.5}
          y={-2}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={1.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            values={`0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${song ? 0.7 : 0.3} 0`}
          />

          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_10_186"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_10_186"
            result="shape"
          />
        </filter>

        <linearGradient
          id="c"
          x1={323}
          x2={290.5}
          y1={0}
          y2={175}
          gradientUnits="userSpaceOnUse"
        >
          {theme === "light" ? (
            <>
              <stop stopColor="#fff" />
              <stop offset={1} stopColor="#DADADA" />
            </>
          ) : (
            <>
              <stop stopColor="#363535" />
              <stop offset={1} stopColor="#161616" />
            </>
          )}
        </linearGradient>
        <linearGradient
          id="e"
          x1={471}
          x2={175.5}
          y1={19}
          y2={157}
          gradientUnits="userSpaceOnUse"
        >
          {theme === "light" ? (
            <>
              <stop stopColor="#F2F2F2" />
              <stop offset={0.906} stopColor="#EAEAEA" />
            </>
          ) : (
            <>
              <stop stopColor="#2E2E2E" />
              <stop offset={0.906} stopColor="#1A1A1A" />
            </>
          )}
        </linearGradient>
        <linearGradient
          id="f"
          x1={291.5}
          x2={291.5}
          y1={23}
          y2={152}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.703} stopColor="#fff" stopOpacity={0} />
          <stop offset={0.865} stopColor="#fff" stopOpacity={0.06} />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="i"
          x1={96.5}
          x2={96.5}
          y1={56}
          y2={119}
          gradientUnits="userSpaceOnUse"
        >
          {theme === "light" ? (
            <>
              <stop stopColor="#fff" />
              <stop offset={1} stopColor="#EDECEC" />
            </>
          ) : (
            <>
              <stop stopColor="#2E2E2E" />
              <stop offset={1} stopColor="#1E1E1E" />{" "}
            </>
          )}
        </linearGradient>
        <linearGradient
          id="k"
          x1={96}
          x2={96}
          y1={66}
          y2={110}
          gradientUnits="userSpaceOnUse"
        >
          {theme === "light" ? (
            <>
              <stop stopColor="#EDECEC" />
              <stop offset={1} stopColor="#fff" />
            </>
          ) : (
            <>
              <stop stopColor="#171717" />
              <stop offset={1} stopColor="#373636" />
            </>
          )}
        </linearGradient>
        <clipPath id="a">
          <rect width={581} height={175} fill="#fff" rx={87.5} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default MP3Player
