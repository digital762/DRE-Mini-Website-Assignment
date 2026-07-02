import styles from "./Badge.module.css";

type Variant = "solid" | "bone" | "sand" | "salmon" | "outline";

export function Badge({
  children,
  variant = "solid",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return <span className={[styles.badge, styles[variant], className].filter(Boolean).join(" ")}>{children}</span>;
}
