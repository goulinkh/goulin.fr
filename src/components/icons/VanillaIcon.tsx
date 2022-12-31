import { SVGProps } from "react"

const VanillaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M0 0h3.083L12.5 17.083l-1.583 2.834L0 0Zm6.667 0H9.75l6.249 11.25-1.583 2.833L6.666 0ZM20 2.75a2.75 2.75 0 1 1-5.5 0 2.75 2.75 0 0 1 5.5 0Z"
    />
  </svg>
)

export default VanillaIcon
