import type { FC } from "react"
import type { IIconProps } from "./icons.types"

export const CloseIcon: FC<IIconProps> = ({
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
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
)

export default CloseIcon
