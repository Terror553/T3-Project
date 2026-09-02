"use client";
import SubNavBar from "~/client/navUtils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SubNavBar
      props={{
        title: "Dashboard",
        navItems: [
          {
            id: 0,
            name: "Dashboard",
            fullLink: "/dashboard/overview",
            icon: "fas fa-home fa-fw",
          },
          {
            id: 8,
            name: "Community clans",
            fullLink: "/clans",
            icon: "fas fa-shield-alt fa-fw",
          },
          {
            id: 1,
            name: "Configuration",
            fullLink: "/dashboard/configuration",
            icon: "fas fa-wrench fa-fw",
            dropdown: [
              {
                id: 1,
                name: "General Settings",
                fullLink: "/dashboard/configuration/general",
                icon: "fas fa-cogs fa-fw",
              },
              {
                id: 2,
                name: "Navigation",
                fullLink: "/dashboard/configuration/navigation",
                icon: "fas fa-bars fa-fw",
              },
              {
                id: 3,
                name: "Privacy & Terms",
                fullLink: "/dashboard/configuration/privacy",
                icon: "fas fa-file-alt fa-fw",
              },
              {
                id: 4,
                name: "Reactions",
                fullLink: "/dashboard/configuration/reactions",
                icon: "fas fa-smile fa-fw",
              },
              {
                id: 5,
                name: "Registration",
                fullLink: "/dashboard/configuration/registration",
                icon: "fas fa-user-plus fa-fw",
              },
            ],
          },
          {
            id: 2,
            name: "Settings",
            fullLink: "/dashboard/settings",
            icon: "fa fa-gear",
          },
          {
            id: 3,
            name: "Announcements",
            fullLink: "/dashboard/announcements",
            icon: "fas fa-bullhorn fa-fw",
          },
          {
            id: 4,
            name: "Groups",
            fullLink: "/dashboard/groups",
            icon: "fas fa-address-book fa-fw",
          },
          {
            id: 5,
            name: "User Management",
            fullLink: "/dashboard/user-management",
            icon: "fas fa-user-circle fa-fw",
            dropdown: [
              {
                id: 1,
                name: "Users",
                fullLink: "/dashboard/user-management/users",
                icon: "fas fa-users fa-fw",
              },
              {
                id: 2,
                name: "Punishments",
                fullLink: "/dashboard/user-management/punishments",
                icon: "fas fa-gavel fa-fw",
              },
              {
                id: 3,
                name: "Reports",
                fullLink: "/dashboard/user-management/reports",
                icon: "fas fa-chart-bar fa-fw",
              },
            ],
          },
          {
            id: 6,
            name: "Store",
            fullLink: "/dashboard/store",
            icon: "fas fa-shopping-cart fa-fw",
            dropdown: [
              {
                id: 1,
                name: "Store Configuration",
                fullLink: "/dashboard/store/configuration",
                icon: "fas fa-wrench fa-fw",
              },
              {
                id: 2,
                name: "Products",
                fullLink: "/dashboard/store/products",
                icon: "fas fa-box-open fa-fw",
              },
              {
                id: 3,
                name: "Payments",
                fullLink: "/dashboard/store/payments",
                icon: "fas fa-donate fa-fw",
              },
              {
                id: 4,
                name: "Subscriptions",
                fullLink: "/dashboard/store/subscriptions",
                icon: "fa-solid fa-handshake fa-fw",
              },
              {
                id: 5,
                name: "Sales",
                fullLink: "/dashboard/store/sales",
                icon: "fa-solid fa-tag fa-fw",
              },
              {
                id: 6,
                name: "Coupons",
                fullLink: "/dashboard/store/coupons",
                icon: "fas fa-ticket-alt fa-fw",
              },
            ],
          },
          {
            id: 7,
            name: "Forum",
            fullLink: "/dashboard/forum",
            icon: "fas fa-comment fa-fw",
            dropdown: [
              {
                id: 1,
                name: "Forum Settings",
                fullLink: "/dashboard/forum/settings",
                icon: "fas fa-cogs fa-fw",
              },
              {
                id: 2,
                name: "Forums",
                fullLink: "/dashboard/forum/forums",
                icon: "fas fa-comments fa-fw",
              },
              {
                id: 3,
                name: "Labels",
                fullLink: "/dashboard/forum/labels",
                icon: "fas fa-tags fa-fw",
              },
            ],
          },
        ],
      }}
    >
      {children}
    </SubNavBar>
  );
}
