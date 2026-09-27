import * as React from "react";
import { AppLink } from "./AppLink";

/**
 * Outlined surface with a hard shadow and an optional tilt. Every block on the site is one of these.
 *
 * Bez "use client": przechył spoczynkowy idzie przez zmienną --bc-tilt, a prostowanie
 * na najechanie robi .bc-straighten w styles/layout.css.
 */
export interface CardProps {
  children?: React.ReactNode;
  /** paper (default) · sunken · accent (turquoise) · gold · dark (brown, cream type) */
  tone?: "paper" | "sunken" | "accent" | "gold" | "dark";
  /** Degrees of rotation at rest. Interactive cards straighten on hover. */
  tilt?: number;
  radius?: "block" | "card" | "input" | "tile" | "photo";
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "photo" | "none";
  padding?: number | string;
  straightenOnHover?: boolean;
  /** Renders an <a>; also switches on the hover interaction. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

const TONES: Record<NonNullable<CardProps["tone"]>, React.CSSProperties> = {
  paper: { background: "var(--surface-card)" },
  sunken: { background: "var(--surface-sunken)" },
  accent: { background: "var(--surface-accent)" },
  gold: { background: "var(--surface-highlight)" },
  dark: { background: "var(--surface-dark)", color: "var(--text-on-dark)" },
};

export function Card({
  children,
  tone = "paper",
  tilt = 0,
  radius = "card",
  shadow = "lg",
  padding = 28,
  straightenOnHover = true,
  href,
  onClick,
  className,
  style,
  ...rest
}: CardProps) {
  const interactive = Boolean(href) || Boolean(onClick);
  // Karta z przechyłem i wyłączonym prostowaniem zostaje przechylona także na hover —
  // tak było w kicie. Pozostałe interaktywne unoszą się i prostują.
  const moves = interactive && (straightenOnHover || !tilt);
  const classes = ["bc-tilt", moves && "bc-straighten", className].filter(Boolean).join(" ");

  const s = {
    border: "var(--border)",
    borderRadius: `var(--radius-${radius})`,
    boxShadow: shadow === "none" ? "none" : `var(--shadow-${shadow})`,
    padding,
    display: "block",
    transition: "transform var(--dur-slow) var(--ease)",
    ...(tilt ? { "--bc-tilt": `rotate(${tilt}deg)` } : null),
    ...(TONES[tone] || TONES.paper),
    ...style,
  } as React.CSSProperties;

  if (href) {
    return (
      <AppLink href={href} className={classes} style={s} onClick={onClick} {...rest}>
        {children}
      </AppLink>
    );
  }

  return (
    <div className={classes} style={s} onClick={onClick} {...rest}>
      {children}
    </div>
  );
}
