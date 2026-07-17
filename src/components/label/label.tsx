import type { LabelHTMLAttributes, ReactNode } from "react"

import styles from "./label.module.css"

import { getClassNames } from "@utils/class-names"

export interface ILabel extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
  required?: boolean
  disabled?: boolean
}

export const Label = ({
  children,
  required = false,
  disabled = false,
  className,
  ...labelProps
}: ILabel) => {
  return (
    <label
      {...labelProps}
      className={getClassNames(
        styles.containerWrapper,
        disabled && styles.disabledState,
        className,
      )}
    >
      {children}
      {required && (
        <>
          <span className={styles.requiredIndicator} aria-hidden="true">
            *
          </span>
          <span className={styles.visuallyHidden}>required</span>
        </>
      )}
    </label>
  )
}

export default Label
