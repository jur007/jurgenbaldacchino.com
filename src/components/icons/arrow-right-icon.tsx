import type { FC } from "react"
import type { IIconProps } from "./icons.types"

export const ArrowRightIcon: FC<IIconProps> = ({
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
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default ArrowRightIcon
