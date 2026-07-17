import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"

import styles from "./button.module.css"

import { IButtonSize, IButtonType } from "./button.types"

import { getClassNames } from "@utils/class-names"

interface IButtonBase {
  children: ReactNode
  type?: IButtonType
  size?: IButtonSize
  fullWidth?: boolean
  className?: string
}

export interface IButton
  extends
    IButtonBase,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "type"> {
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  loading?: boolean
}

export interface IButtonLink
  extends
    IButtonBase,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "type"> {
  disabled?: boolean
}

const getButtonClassName = (
  type: IButtonType,
  size: IButtonSize,
  fullWidth: boolean,
  disabled: boolean,
  className?: string,
) => {
  return getClassNames(
    styles.button,
    styles[type],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    className,
  )
}

export const Button = ({
  children,
  type = IButtonType.PRIMARY,
  size = IButtonSize.MEDIUM,
  htmlType = "button",
  fullWidth = false,
  loading = false,
  disabled = false,
  className,
  ...buttonProps
}: IButton) => {
  const isDisabled = disabled || loading

  return (
    <button
      {...buttonProps}
      type={htmlType}
      className={getButtonClassName(type, size, fullWidth, isDisabled, className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
    >
      {loading && <span className={styles.loadingIndicator} aria-hidden="true"></span>}
      {children}
    </button>
  )
}

export const ButtonLink = ({
  children,
  type = IButtonType.PRIMARY,
  size = IButtonSize.MEDIUM,
  fullWidth = false,
  disabled = false,
  className,
  href,
  ...anchorProps
}: IButtonLink) => {
  return (
    <a
      {...anchorProps}
      className={getButtonClassName(type, size, fullWidth, disabled, className)}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : anchorProps.tabIndex}
    >
      {children}
    </a>
  )
}

export default Button
