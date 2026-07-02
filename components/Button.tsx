"use client";

import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "onDark" | "onDarkSecondary";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconRight?: string;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = "primary", size = "md", icon, iconRight, className, ...rest } = props;
  const classes = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(" ");

  const content = (
    <>
      {icon && <i className={`ph ph-${icon}`} aria-hidden />}
      <span>{children}</span>
      {iconRight && <i className={`ph ph-${iconRight}`} aria-hidden />}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
