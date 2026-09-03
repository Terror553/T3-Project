import DashboardSection from "~/components/dashboard/DashboardSection";

export default function Privacy() {
  return <DashboardSection title="Privacy & terms" description="Keep community policies discoverable and consistent."><div className="d-flex gap-2"><a className="btn btn-outline-primary" href="/rules">View community rules</a><span className="align-self-center text-muted">Policy editing is not configured.</span></div></DashboardSection>;
}
