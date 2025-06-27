"use client";

import Link from "next/link";
import { type NavItem } from "~/server/types/navigation";

type MainNavigationProps = {
  navigation: NavItem[];
  isActive: (path: string) => string;
};

export const MainNavigation = ({ navigation, isActive }: MainNavigationProps) => {
  return (
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
  );
};