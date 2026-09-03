import DashboardSection from "~/components/dashboard/DashboardSection";
import Link from "next/link";

export default function Settings() {
  return <DashboardSection title="Dashboard settings" description="Manage account-level preferences from the existing settings surface."><Link className="btn btn-primary" href="/profile/settings/profile-settings">Open profile settings</Link></DashboardSection>;
}
