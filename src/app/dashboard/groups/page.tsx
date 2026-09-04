import DashboardSection from "~/components/dashboard/DashboardSection";
import AdminRolesPage from "~/app/admin/roles/page";

export default function DashboardGroupsPage() {
  return (
    <DashboardSection
      title="Groups"
      description="Manage community roles and the permissions associated with each group."
    >
      <AdminRolesPage />
    </DashboardSection>
  );
}
