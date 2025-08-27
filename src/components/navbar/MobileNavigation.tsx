"use client";

import Link from "next/link";
import { type NavItem } from "~/server/types/navigation";

type MobileNavigationProps = {
  navigation: NavItem[];
  isActive: (path: string) => string;
};

export const MobileNavigation = ({
  navigation,
  isActive,
}: MobileNavigationProps) => {
  return (
    <div className="oc-nav-body">
      <ul className="oc-nav-items">
        {navigation.map((nav) => (
          <li className="oc-nav-item" key={nav.id}>
            <Link
              href={nav.fullLink}
              className={`oc-nav-link ${isActive(nav.fullLink)}`}
            >
              {nav.name}
            </Link>
          </li>
        ))}
        <hr className="oc-nav-divider" />
        <li className="oc-nav-item">
          <Link href="#" className="oc-nav-link oc-nav-link-highlighted">
            <i className="fas fa-shopping-basket fa-fw"></i>
            Store
          </Link>
        </li>
      </ul>
    </div>
  );
};
