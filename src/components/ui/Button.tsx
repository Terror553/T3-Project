"use client";

import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  onClick,
}: ButtonProps) {
  // Map sizes to appropriate classes
  const sizeClasses = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  };
  
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}