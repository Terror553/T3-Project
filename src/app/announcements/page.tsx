import Link from "next/link";
import { AnnouncementCard } from "~/components/announcement/AnnouncementCard";
import { listPublishedAnnouncements } from "~/server/announcements/announcements";

export const dynamic = "force-dynamic";

export default async function AnnouncementsPage() {
  const announcements = await listPublishedAnnouncements();

  return (
    <div className="content">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h2 mb-0">Announcements</h1>
        <Link className="btn btn-outline-secondary" href="/">
          Back to home
        </Link>
      </div>
      {announcements.length === 0 ? (
        <div className="alert alert-secondary">No announcements have been published yet.</div>
      ) : (
        <div className="row g-4">
          {announcements.map((announcement) => (
            <div className="col-12" key={announcement.id}>
              <AnnouncementCard announcement={announcement} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
