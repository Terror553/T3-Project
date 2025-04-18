"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { fullUser } from "~/server/auth/utils/currentUser";
import type { NavItem } from "~/server/types/navigation";

export const Navbar = () => {
  const [user, setUser] = useState<fullUser | null>(null);
  const [navigation, setNav] = useState<NavItem[]>([]);
  const pathname = usePathname();

  const isActive = (path: string) => {
    // Home route matches only if the pathname is exactly "/"
    if (path === "/") {
      return pathname === "/" ? "active" : "";
    }
    // Other routes match if the pathname includes the path
    return pathname?.startsWith(path) ? "active" : "";
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, navRes] = await Promise.all([
          fetch("/api/auth/user"),
          fetch("/api/auth/navigation"),
        ]);

        if (!userRes.ok) throw new Error(`User API Error ${userRes.status}`);
        if (!navRes.ok) throw new Error(`Nav API Error ${navRes.status}`);

        const userData = (await userRes.json()) as fullUser;
        const navData = (await navRes.json()) as NavItem[];

        setUser(userData);
        setNav(navData ?? []);
      } catch (err) {
        console.error("Error fetching user or nav:", err);
        setNav([]);
      }
    }

    // explicitly ignore the returned Promise
    void fetchData();
  }, []);

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
                      <div className="nav-link-text">Sign in</div>
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
                      <div className="nav-link-text">{user.username}</div>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <span className="dropdown-header">{user.username}</span>
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
                          <form action="/logout" method="post">
                            <button type="submit" className="dropdown-item">
                              Ausloggen
                            </button>
                          </form>
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
                      className={`nav-link ${isActive(nav.full_link)}`}
                      href={nav.full_link}
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
                    href={nav.full_link}
                    target=""
                    className={`oc-nav-link ${isActive(nav.full_link)}`}
                    key={nav.id}
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
              <hr className="oc-nav-divider" />
              <li className="oc-nav-item">
                <Link
                  href={"#"}
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
        <div className="header-logo animated">
          <Link href="/">
            <img
              src="https://mc-heads.net/avatar/ccbe40c30430423cbcc13a4167b06a79/128"
              alt="MelonenMC"
            />
          </Link>
        </div>
        <Link
          href={"#"}
          className="header-status header-status-left"
          id="status-minecraft"
          data-ip="MelonenMC.de"
          data-bs-toggle="tooltip"
          title="Click to copy!"
          data-cf-modified-=""
        >
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
          href="https://coldfiredzn.com/discord"
          className="header-status header-status-right"
          id="status-discord"
          data-id="682657813406941204"
          data-bs-toggle="tooltip"
          title="Click to join!"
        >
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
    </header>
  );
};
