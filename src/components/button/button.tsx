import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, ReactNode } from 'react';
import styles from './button.module.css';

type SharedProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
};

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement>;

type Props = (ButtonProps | AnchorProps) & {
  as?: ElementType;
};

function Button({
  children,
  variant = 'primary',
  className,
  as: Component = 'button',
  ...props
}: Props) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export default Button;
