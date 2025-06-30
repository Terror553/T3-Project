import Link from "next/link";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { LogOutButton } from "./logOut";
import { replaceColor } from "~/utils/styleUtils";

export const ProfileBar = async () => {
  const user = await getCurrentUser();

  return (
    <header className="header faded" id="header">
      <nav className="navbar navbar-user navbar-expand">
        <div className="container">
          <div className="collapse navbar-collapse" id="nav-user">
            {user && (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="/dashboard" target="_blank" className="nav-link">
                    <div className="nav-link-icon">
                      <i className="fas fa-cog"></i>
                    </div>
                    <div className="nav-link-text">Dashboard</div>
                  </Link>
                  <a
                    href="https://mc.waleed-bakri.com"
                    target="_blank"
                    className="nav-link"
                  >
                    <div className="nav-link-icon">
                      <i className="fas fa-cog"></i>
                    </div>
                    <div className="nav-link-text">MC Dashboard</div>
                  </a>
                </li>
              </ul>
            )}
            <ul className="navbar-nav ms-auto">
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link href="/login" className="nav-link" target="_blank">
                      <div className="nav-link-icon">
                        <i className="fas fa-key icon"></i>
                      </div>
                      <div className="nav-link-text">Einloggen</div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/register"
                      target=""
                      className="nav-link"
                      data-request-modal="register"
                    >
                      <div className="nav-link-icon">
                        <i className="fas fa-clipboard icon"></i>
                      </div>
                      <div className="nav-link-text">Sign up</div>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown dropdown-hover">
                    <Link
                      href="/"
                      className="nav-link dropdown-toggle no-caret"
                      id="button-pms"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="nav-link-icon">
                        <i className="fas fa-envelope icon"></i>
                      </div>
                      <div className="nav-link-text">Messages</div>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <span className="dropdown-header">Messages</span>
                      </li>
                      <div id="list-pms">
                        <li>
                          <span className="dropdown-item">No new messages</span>
                        </li>
                      </div>
                    </ul>
                  </li>
                  <li className="nav-item dropdown dropdown-hover">
                    <Link
                      href="/"
                      className="nav-link dropdown-toggle no-caret"
                      id="button-alerts"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="nav-link-icon">
                        <i className="fas fa-flag icon"></i>
                      </div>
                      <div className="nav-link-text">Alerts</div>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <span className="dropdown-header">Alerts</span>
                      </li>
                      <div id="list-alerts">
                        <li>
                          <span className="dropdown-item">No new alerts</span>
                        </li>
                      </div>
                    </ul>
                  </li>
                  <li className="nav-item dropdown dropdown-hover">
                    <Link
                      href="/"
                      className="nav-link dropdown-toggle no-caret"
                      id="button-account"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="nav-link-icon">
                        <img src={user.avatar_url} alt={user.username} />
                      </div>
                      <div
                        className="nav-link-text"
                        style={replaceColor({
                          color: user.groups?.color,
                          gradient: user.groups?.gradient,
                          start: user.groups?.start || undefined,
                          end: user.groups?.end || undefined,
                          isBadge: false,
                        })}
                      >
                        {user.username}
                      </div>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <span
                          className="dropdown-header"
                          style={replaceColor({
                            color: user.groups?.color,
                            gradient: user.groups?.gradient,
                            start: user.groups?.start || undefined,
                            end: user.groups?.end || undefined,
                            isBadge: false,
                          })}
                        >
                          {user.username}
                        </span>
                      </li>
                      <div id="list-account">
                        <li>
                          <Link
                            href="/profile/{user.id}"
                            className="dropdown-item"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/profile/settings/overview"
                            className="dropdown-item"
                          >
                            Einstellungen
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <LogOutButton />
                        </li>
                      </div>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
