"use client";

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

            {/* Progress bar duration is dynamic */}
            <div
              className="toast-progress"
              style={
                {
                  "--toast-duration": `${notification.duration}ms`,
                } as React.CSSProperties
              }
            />

            <div className="toast-message" dangerouslySetInnerHTML={{ __html: notification.message }} />
          </div>
        ))}
      </div>
    </>
  );
}