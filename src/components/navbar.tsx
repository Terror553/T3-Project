"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavItem } from "~/server/types/navigation";
// Ensure this ForumUser type matches what getUserFromSession returns, including the 'groups' structure
import type { ForumUser } from "~/server/types/forum";
import { LogOutButton } from "./logOut";
import { LoginModal } from "./loginModal";
import { replaceColor } from "~/utils/styleUtils";

// 1. Accept initialUser prop
export const Navbar = ({ initialUser }: { initialUser: ForumUser | null }) => {
  // 2. Initialize user state with the prop
  const [user, setUser] = useState<ForumUser | null>(initialUser);
  const [navigation, setNav] = useState<NavItem[]>([]);
  const userNavRef = useRef<HTMLUListElement>(null); // Ref für den User-Navigationsbereich
  const pathname = usePathname();
  // Innerhalb der Navbar Komponente, vor den useEffects

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" ? "active" : "";
    }
    return pathname?.startsWith(path) ? "active" : "";
  };

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  // 3. Modify useEffect: Remove user fetching, keep navigation fetching
  useEffect(() => {
    async function fetchNavData() {
      // Renamed function for clarity
      try {
        // Only fetch navigation data now
        const navRes = await fetch("/api/auth/navigation");

        if (!navRes.ok) throw new Error(`Nav API Error ${navRes.status}`);

        const navData = (await navRes.json()) as NavItem[];

        // Only set navigation state
        setNav(navData ?? []);
      } catch (err) {
        console.error("Error fetching navigation:", err); // Updated error message
        setNav([]); // Set empty array on error
      }
    }

    void fetchNavData();
  }, []);

  return (
    <header className="header faded" id="header">
      <nav className="navbar navbar-user navbar-expand">
        <div className="container">
          <div className="collapse navbar-collapse" id="nav-user">
            {/* This conditional rendering now uses the server-provided initial state */}
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
            <ul className="navbar-nav ms-auto" ref={userNavRef}>
              {/* This conditional rendering also uses the server-provided initial state */}
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href="#modal-login"
                      data-bs-toggle="modal"
                    >
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
                // Logged-in user section
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
                      href="/" // Should this link somewhere specific?
                      className="nav-link dropdown-toggle no-caret"
                      id="button-account"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="nav-link-icon">
                        {/* Ensure user.avatarUrl is available */}
                        <img src={user.avatarUrl} alt={user.username} />
                      </div>
                      <div
                        className="nav-link-text"
                        // Ensure user.group is available and has the expected structure
                        style={replaceColor({
                          color: user.group?.color ?? "#ffffff", // Add nullish coalescing for safety
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
                          {/* Correctly format profile link */}
                          <Link
                            href={`/profile/${user.id}`}
                            className="dropdown-item"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/profile/settings/overview" // Assuming this path exists
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

      {/* Rest of the Navbar component (second nav, oc-nav, header-logo etc.) */}
      {/* ... */}
      <nav className="navbar navbar-default navbar-expand-lg" id="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link href="/">MelonenMC</Link>
          </div>
          <a href="#" className="navbar-toggler" id="button-ocNavToggler">
            <i className="fas fa-bars"></i>
          </a>
          <div className="collapse navbar-collapse">
            <div className="navbar-nav-container">
              <ul className="navbar-nav">
                {navigation.map((nav) => (
                  <li key={nav.id} className="nav-item">
                    <Link
                      className={`nav-link ${isActive(nav.fullLink)}`}
                      href={nav.fullLink}
                    >
                      {nav.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="navbar-nav ms-4">
              <li className="nav-item">
                <Link href={"#"} className="nav-link highlighted">
                  <div className="nav-link-text">Store</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <nav className="oc-nav inverted" id="nav-oc">
        {/* ... oc-nav content ... */}
        <div className="oc-nav-container">
          <div className="oc-nav-header">
            <span>Menu</span>
            <a href="#" className="close" id="button-ocNavToggler">
              <i className="fas fa-times"></i>
            </a>
          </div>
          <div className="oc-nav-body">
            <ul className="oc-nav-items">
              {navigation.map((nav) => (
                <li className="oc-nav-item" key={nav.id}>
                  <Link
                    href={nav.fullLink}
                    target="" // Consider if target should always be empty
                    className={`oc-nav-link ${isActive(nav.fullLink)}`}
                    // Removed duplicate key={nav.id}
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
              <hr className="oc-nav-divider" />
              <li className="oc-nav-item">
                <Link
                  href={"#"} // Link to actual store page?
                  className="oc-nav-link oc-nav-link-highlighted"
                >
                  <i className="fas fa-shopping-basket fa-fw"></i>
                  Store
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        {/* ... header-logo and header-status links ... */}
        <div className="header-logo animated">
          <Link href="/">
            <img src="/default.png" alt="MelonenMC" />
          </Link>
        </div>
        <Link
          href={"#"} // Link somewhere useful?
          className="header-status header-status-left"
          id="status-minecraft"
          data-ip="MelonenMC.de"
          data-cf-modified-="" // Remove if not needed
        >
          {/* ... status content ... */}
          <div className="header-status-icon">
            <i className="fas fa-cube"></i>
          </div>
          <div className="header-status-content">
            <div className="header-status-title">
              <span id="ip-minecraftServer">MelonenMC.de</span>
            </div>
            <div className="header-status-description">
              <span id="count-minecraftServerPlayers">??</span> players online
            </div>
          </div>
        </Link>
        <Link
          href="https://coldfiredzn.com/discord" // Verify link
          className="header-status header-status-right"
        >
          {/* ... status content ... */}
          <div className="header-status-icon">
            <i className="fab fa-discord"></i>
          </div>
          <div className="header-status-content">
            <div className="header-status-title">Join Our Discord Server</div>
            <div className="header-status-description">
              <span id="count-discordServerUsers">??</span> users online
            </div>
          </div>
        </Link>
      </div>

      <LoginModal />
    </header>
  );
};
