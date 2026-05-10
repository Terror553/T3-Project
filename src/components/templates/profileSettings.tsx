"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ProfileSettingsNav } from "~/server/types/profile";

export const ProfileSettingsPage = () => {
  const [navigation, setNav] = useState<ProfileSettingsNav[]>([]);
  const pathname = usePathname();
  // Innerhalb der Navbar Komponente, vor den useEffects

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" ? "active" : "";
    }
    return pathname?.startsWith(path) ? "active" : "";
  };

  // 3. Modify useEffect: Remove user fetching, keep navigation fetching
  useEffect(() => {
    async function fetchNavData() {
      // Renamed function for clarity
      try {
        setNav([
          { name: "Overview", href: "/profile/settings/overview" },
          { name: "Messaging", href: "/profile/settings/messaging" },
          { name: "Alerts", href: "/profile/settings/alerts" },
          { name: "Connections", href: "/profile/settings/connections" },
          {
            name: "Profile Settings",
            href: "/profile/settings/profile-settings",
          },
          {
            name: "Followed Topics",
            href: "/profile/settings/followed-topics",
          },
        ]);
      } catch (err) {
        console.error("Error fetching navigation:", err); // Updated error message
        setNav([]); // Set empty array on error
      }
    }

    void fetchNavData();
  }, []);

  return (
    <>
      <div className="card card-secondary">
        <div className="card-header">Your Account</div>
        <div className="card-body">
          <ul className="nav nav-vertical">
            {navigation.map((nav) => (
              <li key={nav.name} className="nav-item">
                <Link
                  className={`nav-link ${isActive(nav.href)}`}
                  href={nav.href}
                >
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
