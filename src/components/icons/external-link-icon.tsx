import type { FC } from "react"
import type { IIconProps } from "./icons.types"

export const ExternalLinkIcon: FC<IIconProps> = ({
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
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </svg>
)

export default ExternalLinkIcon
