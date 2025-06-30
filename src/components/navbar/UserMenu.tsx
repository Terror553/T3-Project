"use client";

import Link from "next/link";
import { type ForumUser } from "~/server/types/forum";
import { LogOutButton } from "../logOut";
import { replaceColor } from "~/utils/styleUtils";

type UserMenuProps = {
  user: ForumUser;
};

export const UserMenu = ({ user }: UserMenuProps) => {
  return (
    <>
      {/* Messages Dropdown */}
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

      {/* Alerts Dropdown */}
      <li className="nav-item dropdown dropdown-hover">
        <Link
          href="/"
          className="nav-link dropdown-toggle no-caret"
          id="button-alerts"
          data-bs-toggle="dropdown"
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

      {/* Account Dropdown */}
      <li className="nav-item dropdown dropdown-hover">
        <Link
          href="/"
          className="nav-link dropdown-toggle no-caret"
          id="button-account"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div className="nav-link-icon">
            <img src={user.avatarUrl} alt={user.username} />
          </div>
          <div
            className="nav-link-text"
            style={replaceColor({
              color: user.group?.color ?? "#ffffff",
              gradient: user.group?.gradient ?? 0,
              start: user.group?.start,
              end: user.group?.end,
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
                color: user.group?.color ?? "#ffffff",
                gradient: user.group?.gradient ?? 0,
                start: user.group?.start,
                end: user.group?.end,
                isBadge: false,
              })}
            >
              {user.username}
            </span>
          </li>
          <div id="list-account">
            <li>
              <Link href={`/profile/${user.id}`} className="dropdown-item">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/profile/settings/overview" className="dropdown-item">
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
  );
};
