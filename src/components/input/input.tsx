import { forwardRef } from "react"
import type { ForwardedRef, InputHTMLAttributes } from "react"

import styles from "./input.module.css"

import { Label } from "@components/label"
import { getClassNames } from "@utils/class-names"

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  errorMessage?: string
  containerWrapperClassName?: string
}

const InputComponent = (
  {
    id,
    label,
    helperText,
    errorMessage,
    required,
    disabled,
    className,
    containerWrapperClassName,
    ...inputProps
  }: IInput,
  ref: ForwardedRef<HTMLInputElement>,
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
      <input
        {...inputProps}
        ref={ref}
        id={id}
        className={getClassNames(
          styles.inputElement,
          errorMessage && styles.inputErrorState,
          className,
        )}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={messageId}
      />
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

export const Input = forwardRef(InputComponent)

export default Input
