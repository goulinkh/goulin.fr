import useMedia from "../../../hooks/use-media"
import Head from "next/head"

const Favicon = () => {
  const isDark = useMedia("(prefers-color-scheme: dark)")
  const svgIcon = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M256 293C276.435 293 293 276.435 293 256C293 235.565 276.435 219 256 219C235.565 219 219 235.565 219 256C219 276.435 235.565 293 256 293Z" fill="#FF0014"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M256 0C114.833 0 0 114.844 0 256C0 397.156 114.833 512 256 512C397.167 512 512 397.156 512 256C512 51.2 341.333 0 256 0ZM256 149.333C197.187 149.333 149.333 197.187 149.333 256C149.333 314.813 197.187 362.667 256 362.667C314.813 362.667 362.667 314.812 362.667 256C362.667 197.188 314.813 149.333 256 149.333ZM254.899 30C219.766 30 186.594 38.4016 157.29 53.2988C148.176 57.9345 145.391 69.5191 150.591 78.3186L177.388 123.63C182.588 132.43 193.738 134.937 203.055 130.727C218.868 123.584 236.421 119.605 254.899 119.605C256.213 119.605 257.518 119.624 258.822 119.661C260.988 119.725 263.153 111.555 263.662 101.349L266.271 48.8204C266.78 38.6144 264.448 30.1758 261.052 30.0833C259.008 30.0278 256.963 30 254.899 30ZM107.232 115.034L146.816 149.659C154.514 156.385 163.795 158.356 167.931 154.405C172.058 150.473 170.596 141.053 164.313 132.994L131.984 91.504C125.71 83.4448 114.079 82.0106 106.658 89.0428C106.473 89.2093 106.307 89.3666 106.131 89.5332C98.738 96.5839 99.5338 108.307 107.232 115.034ZM363.577 363.921L401.63 400.221C409.031 407.274 409.32 419.02 401.629 425.746C401.447 425.904 401.273 426.054 401.081 426.213C393.364 432.918 381.806 430.983 375.886 422.661L345.377 379.815C339.448 371.492 338.393 362.018 342.686 358.267C346.989 354.498 356.176 356.868 363.577 363.921ZM348.954 459.739C319.035 473.357 285.531 480.32 250.431 478.804C248.369 478.715 246.328 478.599 244.287 478.455C240.898 478.216 238.933 469.685 239.882 459.51L244.755 407.143C245.704 396.969 248.22 388.899 250.38 389.057C251.682 389.151 252.985 389.225 254.297 389.282C272.758 390.079 290.466 386.862 306.573 380.408C316.064 376.604 327.095 379.59 331.91 388.606L356.727 435.031C361.542 444.047 358.26 455.501 348.954 459.739Z" fill="${
    isDark ? "#ccc" : "#333"
  }"/>
<path d="M466.208 306.209C468.187 304.219 469.333 301.469 469.333 298.667C470.222 236.278 471.467 110.2 469.333 105C467.199 99.8 452.139 83.5 444.875 76L448 289.833C448 292.667 446.875 295.375 444.875 297.375L412.875 329.375C408.709 333.542 401.959 333.542 397.792 329.375L391.542 323.125C387.501 319.104 380.501 319.104 376.459 323.125L312.459 387.125C310.438 389.146 309.334 391.823 309.334 394.667C309.334 397.511 310.438 400.188 312.459 402.209L318.709 408.459C322.876 412.625 322.876 419.375 318.709 423.542L312.459 429.792C310.438 431.813 309.334 434.49 309.334 437.334C309.334 440.178 310.438 442.855 312.459 444.876C316.5 448.897 323.5 448.897 327.542 444.876L333.792 438.626C337.958 434.459 344.708 434.459 348.875 438.626L355.125 444.876C359.166 448.897 366.166 448.897 370.208 444.876L434.208 380.876C436.229 378.855 437.333 376.178 437.333 373.334C437.333 370.49 436.229 367.813 434.208 365.792L427.958 359.542C423.791 355.376 423.791 348.626 427.958 344.459L466.208 306.209Z" fill="${
    isDark ? "#333" : "#ccc"
  }"/>
</svg>

`

  return (
    <Head>
      <link
        rel="icon"
        type="image/svg+xml"
        href={`data:image/svg+xml;base64,${Buffer.from(svgIcon).toString(
          "base64",
        )}`}
      />
    </Head>
  )
}
export default Favicon
