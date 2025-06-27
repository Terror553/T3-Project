"use client";

import { type ReactNode } from "react";

type AlertVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info";

interface AlertProps {
  children: ReactNode;
  variant: AlertVariant;
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Alert({
  children,
  variant,
  className = "",
  dismissible = false,
  onDismiss,
}: AlertProps) {
  return (
    <div className={`alert alert-${variant} ${className}`} role="alert">
      {children}
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          onClick={onDismiss}
          aria-label="Close"
        ></button>
      )}
    </div>
  );
}