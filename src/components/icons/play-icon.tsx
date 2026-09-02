import type { FC } from "react"
import type { IIconProps } from "./icons.types"

export const PlayIcon: FC<IIconProps> = ({
  className,
  size = 24,
  "aria-hidden": ariaHidden = true,
  ...props
}) => (
  <svg
    aria-hidden={ariaHidden}
    className={className}
    fill="none"
    height={size}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

export default PlayIcon
