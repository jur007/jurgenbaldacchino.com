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
      className={getClassNames(styles.label, disabled && styles.disabled, className)}
    >
      {children}
      {required && (
        <>
          <span className={styles.required} aria-hidden="true">
            *
          </span>
          <span className={styles.visuallyHidden}>required</span>
        </>
      )}
    </label>
  )
}

export default Label
