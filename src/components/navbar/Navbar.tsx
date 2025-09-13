"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavItem } from "~/server/types/navigation";
import type { ForumUser } from "~/server/types/forum";
import { LoginModal } from "../loginModal";
import { AuthMenu } from "./AuthMenu";
import { UserMenu } from "./UserMenu";
import { MainNavigation } from "./MainNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { HeaderStatus } from "./HeaderStatus";
import Image from "next/image";

type NavbarProps = {
  initialUser: ForumUser | null;
};

export const Navbar = ({ initialUser }: NavbarProps) => {
  const [user, setUser] = useState<ForumUser | null>(initialUser);
  const [navigation, setNav] = useState<NavItem[]>([]);
  const userNavRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" ? "active" : "";
    }
    return pathname?.startsWith(path) ? "active" : "";
  };

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    async function fetchNavData() {
      try {
        const navRes = await fetch("/api/auth/navigation");
        if (!navRes.ok) throw new Error(`Nav API Error ${navRes.status}`);
        const navData = (await navRes.json()) as NavItem[];
        setNav(navData ?? []);
      } catch (err) {
        console.error("Error fetching navigation:", err);
        setNav([]);
      }
    }

    void fetchNavData();
  }, []);

  return (
    <header className="header faded" id="header">
      {/* User Navigation */}
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
            <ul className="navbar-nav ms-auto" ref={userNavRef}>
              {!user ? <AuthMenu /> : <UserMenu user={user} />}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Navigation */}
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
              <MainNavigation navigation={navigation} isActive={isActive} />
            </div>
            <ul className="navbar-nav ms-4">
              <li className="nav-item">
                <Link href="#" className="nav-link highlighted">
                  <div className="nav-link-text">Store</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="oc-nav inverted" id="nav-oc">
        <div className="oc-nav-container">
          <div className="oc-nav-header">
            <span>Menu</span>
            <a href="#" className="close" id="button-ocNavToggler">
              <i className="fas fa-times"></i>
            </a>
          </div>
          <MobileNavigation navigation={navigation} isActive={isActive} />
        </div>
      </nav>

      {/* Header Content */}
      <div className="container">
        <div className="header-logo animated">
          <Link href="/">
            <img
              src="https://mc-heads.net/avatar/ccbe40c30430423cbcc13a4167b06a79/128"
              alt="MelonenMC"
            />
          </Link>
        </div>

        <HeaderStatus type="minecraft" />
        <HeaderStatus type="discord" />
      </div>

      <LoginModal />
    </header>
  );
};
