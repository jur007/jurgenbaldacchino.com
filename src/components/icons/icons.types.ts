import type { SVGProps } from "react"

export interface IIconProps extends SVGProps<SVGSVGElement> {
  className?: string
  size?: number | string
}
