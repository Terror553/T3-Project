"use client";

import { type ReactNode } from "react";
import { useNotification } from "~/client/notification";

export function ToastContainer() {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`toast show bg-${notification.type === "error" ? "danger" : notification.type}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">
              {notification.type === "success" && "Success"}
              {notification.type === "error" && "Error"}
              {notification.type === "info" && "Information"}
              {notification.type === "warning" && "Warning"}
            </strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => removeNotification(notification.id)}
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body text-white">
            {notification.message}
          </div>
        </div>
      ))}
    </div>
  );
}

type ToastProps = {
  children: ReactNode;
  type: "success" | "error" | "info" | "warning";
  onClose?: () => void;
};

export function Toast({ children, type, onClose }: ToastProps) {
  return (
    <div 
      className={`toast show bg-${type === "error" ? "danger" : type}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">
          {type === "success" && "Success"}
          {type === "error" && "Error"}
          {type === "info" && "Information"}
          {type === "warning" && "Warning"}
        </strong>
        {onClose && (
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          ></button>
        )}
      </div>
      <div className="toast-body text-white">
        {children}
      </div>
    </div>
  );
}