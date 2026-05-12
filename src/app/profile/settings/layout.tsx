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
          {
            id: 1,
            name: "Overview",
            fullLink: "/profile/settings/overview",
            icon: "",
          },
          {
            id: 2,
            name: "Messaging",
            fullLink: "/profile/settings/messaging",
            icon: "",
          },
          {
            id: 3,
            name: "Alerts",
            fullLink: "/profile/settings/alerts",
            icon: "",
          },
          {
            id: 4,
            name: "Connections",
            fullLink: "/profile/settings/connections",
            icon: "",
          },
          {
            id: 5,
            name: "Profile Settings",
            fullLink: "/profile/settings/profile-settings",
            icon: "",
          },
          {
            id: 6,
            name: "Followed Topics",
            fullLink: "/profile/settings/followed-topics",
            icon: "",
          },
        ],
      }}
    >
      {children}
    </SubNavBar>
  );
}
