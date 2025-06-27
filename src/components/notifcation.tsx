enum NotificationType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

type NotificationProps = {
  message?: string;
  title?: string;
  button?: string;
  link?: string;
  linkActive?: boolean;
  type?: NotificationType;
};

export default function Notification({
  message,
  title,
  button,
  link,
  linkActive,
  type,
}: NotificationProps) {
  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      id={`alert-${title}`}
    >
      <a href="#" className="close" data-bs-dismiss="alert">
        <i className="fas fa-times"></i>
      </a>
      <div className="alert-heading">{title}</div>
      <ul>
        <li>{message}</li>
      </ul>
      {linkActive && (
        <div>
          <a href={link} className="btn btn-info btn-sm">
            {button}
          </a>
        </div>
      )}
    </div>
  );
}
