import type { HTMLAttributes, ReactNode } from "react"

import styles from "./badge.module.css"

import { IBadgeSize, IBadgeType } from "./badge.types"

import { getClassNames } from "@utils/class-names"

export interface IBadge extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  type?: IBadgeType
  size?: IBadgeSize
  dot?: boolean
}

export const Badge = ({
  children,
  type = IBadgeType.NEUTRAL,
  size = IBadgeSize.SMALL,
  dot = false,
  className,
  ...badgeProps
}: IBadge) => {
  return (
    <span
      {...badgeProps}
      className={getClassNames(styles.badge, styles[type], styles[size], className)}
    >
      {dot && <span className={styles.dot} aria-hidden="true"></span>}
      {children}
    </span>
  )
}

export default Badge
