import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedAnnouncement } from "~/server/announcements/announcements";

export const dynamic = "force-dynamic";

export default async function AnnouncementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const announcementId = Number(id);
  if (!Number.isInteger(announcementId) || announcementId <= 0) notFound();

  const announcement = await getPublishedAnnouncement(announcementId);
  if (!announcement) notFound();

  return (
    <article className="content">
      <Link className="btn btn-link px-0 mb-3" href="/announcements">
        &larr; All announcements
      </Link>
      <div className="card card-gpost">
        {announcement.imageUrl && (
          <div className="card-image">
            <Image
              src={announcement.imageUrl}
              alt=""
              width={1200}
              height={675}
              className="img-fluid w-100"
              unoptimized
            />
          </div>
        )}
        <div className="card-content">
          <div className="card-header">
            <h1 className="h2 mb-0">{announcement.title}</h1>
          </div>
          <div className="card-body">
            <p className="mb-0">{announcement.content}</p>
          </div>
          <div className="card-footer text-muted">
            Published by {announcement.authorName} on{" "}
            {new Date(announcement.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </article>
  );
}
