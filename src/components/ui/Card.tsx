"use client";

import { type ReactNode } from "react";

type CardVariant = "default" | "primary" | "secondary" | "forum";

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  title?: string;
}

export function Card({
  children,
  variant = "default",
  className = "",
  title,
}: CardProps) {
  const variantClass = variant === "default" ? "" : `card-${variant}`;
  
  return (
    <div className={`card ${variantClass} ${className}`}>
      {title && (
        <div className="card-header">{title}</div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}