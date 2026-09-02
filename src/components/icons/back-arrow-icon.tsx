import type { FC } from "react"
import type { IIconProps } from "./icons.types"

export const BackArrowIcon: FC<IIconProps> = ({
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
    <line x1="19" x2="5" y1="12" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

export default BackArrowIcon
