import type { HTMLAttributes, ReactNode } from "react"

import styles from "./card.module.css"

import { ICardType } from "./card.types"

import { getClassNames } from "@utils/class-names"

export interface ICard extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  type?: ICardType
  as?: "article" | "div" | "aside"
  interactive?: boolean
}

export const Card = ({
  children,
  type = ICardType.RAISED,
  as: Component = "div",
  interactive = false,
  className,
  ...cardProps
}: ICard) => {
  return (
    <Component
      {...cardProps}
      className={getClassNames(
        styles.containerWrapper,
        styles[type],
        interactive && styles.interactiveCard,
        className,
      )}
    >
      {children}
    </Component>
  )
}

export default Card
