"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationProps } from "~/server/types/navigation";

const Navigation: React.FC<NavigationProps> = ({ navigation, user }) => {
  const pathname = usePathname();
  const isActive = (path: string) => (pathname === path ? "active" : "");

  return (
    <ul className="navbar-nav">
      {navigation.map((nav) => (
        <li key={nav.id} className="nav-item">
          {nav.team_link &&
          user &&
          (user.groups?.high_team || user.groups?.team) ? (
            <Link
              className={`nav-link ${isActive(nav.full_link)}`}
              href={nav.full_link}
            >
              {nav.name}
            </Link>
          ) : (
            <Link
              className={`nav-link ${isActive(nav.full_link)}`}
              href={nav.full_link}
            >
              {nav.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
