"use client";

import type { ReactNode } from "react";
import { useToast } from "../toastContainer";

interface ButtonProps {
  children: ReactNode;
}

export function Button({ children }: ButtonProps) {
  const showToast = useToast();

  return (
    <button onClick={() => showToast("Test Toast", "success")}>
      {children}
    </button>
  );
}
