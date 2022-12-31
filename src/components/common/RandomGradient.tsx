import clsx from "clsx"
import React from "react"

const coolGradients = [
  ["#12c2e9", "#c471ed", "#f64f59"],
  ["#b92b27", "#1565c0"],
  ["#8e2de2", "#4a00e0"],
  ["#c94b4b", "#4b134f"],
  ["#fc466b", "#3f5efb"],
  ["#1a2a6c", "#b21f1f", "#fdbb2d"],
  ["#22c1c3", "#fdbb2d"],
  ["#03001e", "#7303c0", "#ec38bc", "#fdeff9"],
  ["#3a1c71", "#d76d77", "#ffaf7b"],
  ["#5614b0", "#dbd65c"],
  ["#833ab4", "#fd1d1d", "#fcb045"],
  ["#562e95", "#319bbe"],
]

type Props = {
  unique: string
  className?: string
}
const RandomGradient: React.FC<Props> = ({ unique, className }) => {
  const gradientColors = coolGradients[hash(unique, coolGradients.length)]
  return (
    <div
      className={clsx(className, "h-full w-full")}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientColors.join(
          ", "
        )})`,
      }}
    ></div>
  )
}

export default RandomGradient

function hash(msg: string, range: number) {
  let sum = 0
  for (let i = 0; i < msg.length; ++i) {
    sum += msg.charCodeAt(i)
  }
  return sum % range
}
