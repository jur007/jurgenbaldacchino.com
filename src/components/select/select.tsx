import { forwardRef } from "react"
import type { ForwardedRef, ReactNode, SelectHTMLAttributes } from "react"

import styles from "./select.module.css"

import { Label } from "@components/label"
import { getClassNames } from "@utils/class-names"

export interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode
  label?: string
  helperText?: string
  errorMessage?: string
  containerWrapperClassName?: string
}

const SelectComponent = (
  {
    id,
    children,
    label,
    helperText,
    errorMessage,
    required,
    disabled,
    className,
    containerWrapperClassName,
    ...selectProps
  }: ISelect,
  ref: ForwardedRef<HTMLSelectElement>,
) => {
  const message = errorMessage || helperText
  const messageId = message && id ? `${id}-message` : undefined

  return (
    <div className={getClassNames(styles.containerWrapper, containerWrapperClassName)}>
      {label && (
        <Label htmlFor={id} required={required} disabled={disabled}>
          {label}
        </Label>
      )}
      <div className={styles.selectElementContainer}>
        <select
          {...selectProps}
          ref={ref}
          id={id}
          className={getClassNames(
            styles.selectElement,
            errorMessage && styles.selectErrorState,
            className,
          )}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={messageId}
        >
          {children}
        </select>
        <span className={styles.dropdownIndicator} aria-hidden="true">
          ▼
        </span>
      </div>
      {message && (
        <span
          id={messageId}
          className={getClassNames(styles.supportingMessage, errorMessage && styles.errorMessage)}
        >
          {message}
        </span>
      )}
    </div>
  )
}

export const Select = forwardRef(SelectComponent)

export default Select
