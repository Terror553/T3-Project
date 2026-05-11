import SubNavBar from "~/client/navUtils";

export default function ProfileSettings({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SubNavBar
      props={{
        title: "Profile Settings",
        navItems: [
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
        ],
      }}
    >
      {children}
    </SubNavBar>
  );
}
