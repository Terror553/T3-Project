import { ProfileSettingsPage } from "~/components/templates/profileSettings";

export default function ProfileSettings({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2>Overview</h2>

      <div className="row">
        <div className="col">
          <div className="content">
            <div className="row">
              <div className="col-xl-3 col-lg-4">
                <ProfileSettingsPage />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
