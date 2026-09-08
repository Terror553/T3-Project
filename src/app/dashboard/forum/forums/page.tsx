import DashboardSection from "~/components/dashboard/DashboardSection";
import { AdminCategoriesPage } from "~/app/admin/categories/page";

export default function DashboardForumsPage() {
  return (
    <DashboardSection
      title="Forum management"
      description="Manage forum categories and subcategories from the dashboard."
    >
      <AdminCategoriesPage />
    </DashboardSection>
  );
}
