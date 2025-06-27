"use client";

import { type ReactNode } from "react";
import { useNotification } from "~/client/notification";

export function ToastContainer() {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <>
      <div id="toast-container" className="toast-top-right">
        {notifications.map((notification) => (
          <>
            <div
              key={notification.id}
              className={`toast toast-${notification.type === "error" ? "danger" : notification.type}`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <button
                type="button"
                className="toast-close-button"
                onClick={() => removeNotification(notification.id)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="toast-progress" style={{ width: "50%" }}></div>
              <div className="toast-message">{notification.message}</div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

type ToastProps = {
  children: ReactNode;
  type: "success" | "error" | "info" | "warning";
  onClose?: () => void;
};

export function Toast({ children, type, onClose }: ToastProps) {
  return (
    <div id="toast-container" className="toast-top-right">
      <div
        className={`toast toast-${type === "error" ? "danger" : type}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ display: "block" }}
      >
        {onClose && (
          <button
            type="button"
            className="toast-close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}
        <div className="toast-message">{children}</div>
      </div>
    </div>
  );
}
