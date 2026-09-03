import DashboardSection from "~/components/dashboard/DashboardSection";

export default function ForumSettings() {
  return <DashboardSection title="Forum settings" description="Forum reads and mutations use the existing forum APIs."><div className="alert alert-info mb-0">Forum configuration is currently governed by the active forum server helpers.</div></DashboardSection>;
}
