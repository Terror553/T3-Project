"use client";

import { useState } from "react";

// Define Toast Types
type ToastType = "success" | "error" | "warning" | "info";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

// Toast Component
export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div id="toast-container" className="toast-top-right">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${
            toast.type === "success"
              ? "toast-success"
              : toast.type === "error"
                ? "toast toast-danger"
                : toast.type === "warning"
                  ? "toast toast-warning"
                  : "toast toast-info"
          }`}
        >
          <div className="toast-message">{toast.message}</div>
          <button onClick={() => removeToast(toast.id)}>×</button>
        </div>
      ))}
    </div>
  );
}

// Hook to trigger toasts
export const useToast = () => {
  const [, setToasts] = useState<Toast[]>([]);

  return (message: string, type: ToastType) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3000,
    );
  };
};
