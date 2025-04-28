"use client";

import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export function Button({ children }: ButtonProps) {
  return <button className="btn btn-primary">{children}</button>;
}
