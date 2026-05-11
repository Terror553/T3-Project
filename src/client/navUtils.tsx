"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { SubNavItem } from "~/server/types/navigation";

interface NavbarProps {
  title: string;
  navItems: SubNavItem[];
}

export default function SubNavBar({
  children,
  props: { title, navItems },
}: {
  children: React.ReactNode;
  props: NavbarProps;
}) {
  const [navigation, setNav] = useState<SubNavItem[]>([]);
  const pathname = usePathname();
  // Innerhalb der Navbar Komponente, vor den useEffects

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" ? "active" : "";
    }
    return pathname?.startsWith(path) ? "active" : "";
  };

  const isExpanded = (path: string) => {
    if (path === "/") {
      return pathname === "/" ? true : false;
    }
    return pathname?.startsWith(path) ? true : false;
  };

  // 3. Modify useEffect: Remove user fetching, keep navigation fetching
  useEffect(() => {
    async function fetchNavData() {
      // Renamed function for clarity
      try {
        setNav(navItems);
      } catch (err) {
        console.error("Error fetching navigation:", err); // Updated error message
        setNav([]); // Set empty array on error
      }
    }

    void fetchNavData();
  }, [navItems]);

  return (
    <>
      <h2>
        {pathname
          .split("/")
          .pop()
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())}
      </h2>
      <div className="row">
        <div className="col">
          <div className="content">
            <div className="row">
              <div className="col-xl-3 col-lg-4">
                <div className="card card-secondary">
                  <div className="card-header">{title}</div>
                  <div className="card-body">
                    <ul className="nav nav-vertical">
                      {navigation.map((nav) => (
                        <li className="nav-item" key={nav.id}>
                          {nav.dropdown ? (
                            <>
                              <a
                                href="#"
                                className={`nav-link ${isExpanded(nav.fullLink) ? "" : "collapsed"} ${isActive(nav.fullLink)}`}
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse-nav-${nav.id}`}
                                aria-expanded={isExpanded(nav.fullLink)}
                                aria-controls={`collapse-nav-${nav.id}`}
                              >
                                <span className="collapse-icon float-end">
                                  <i className="fas fa-angle-up fa-fw m-0"></i>
                                </span>
                                <span className="badge bg-secondary bg-sq float-end">
                                  {nav.dropdown.length}
                                </span>
                                <i className={nav.icon}></i>
                                {nav.name}
                              </a>
                              <ul
                                className="list-unstyled collapse"
                                id={`collapse-nav-${nav.id}`}
                              >
                                {nav.dropdown.map((dropdownItem) => (
                                  <li
                                    key={dropdownItem.id}
                                    className="nav-item nested"
                                  >
                                    <Link
                                      href={dropdownItem.fullLink}
                                      className={`nav-link ${isActive(dropdownItem.fullLink)}`}
                                    >
                                      <i className={dropdownItem.icon}></i>
                                      {dropdownItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <Link
                              href={nav.fullLink}
                              className={`nav-link ${isActive(nav.fullLink)}`}
                            >
                              <i className={nav.icon}></i>
                              {nav.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
