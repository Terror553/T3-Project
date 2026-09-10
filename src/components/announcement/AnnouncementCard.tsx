import Image from "next/image";
import Link from "next/link";
import type { Announcement } from "~/server/announcements/announcements";

type AnnouncementCardProps = {
  announcement: Announcement;
};

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  return (
    <article className="card card-news">
      {announcement.imageUrl && (
        <div className="card-image">
          <Link href={`/announcements/${announcement.id}`} className="card-image-inner">
            <Image
              src={announcement.imageUrl}
              alt=""
              fill
              sizes="(max-width: 992px) 100vw, 75vw"
              className="object-fit-cover"
              unoptimized
            />
          </Link>
        </div>
      )}
      <div className="card-content">
        <div className="card-header">
          <div className="card-header-content">
            <Link href={`/announcements/${announcement.id}`}>{announcement.title}</Link>
          </div>
        </div>
        <div className="card-body">
          <div className="post">{announcement.content}</div>
        </div>
        <div className="card-footer">
          <div className="card-footer-icon">
            <Link href={`/profile/${announcement.authorName}/`}>
              <Image
                src={announcement.authorAvatarUrl}
                alt={announcement.authorName}
                width={40}
                height={40}
                unoptimized
              />
            </Link>
          </div>
          <div className="card-footer-content">
            <Link href={`/profile/${announcement.authorName}/`}>{announcement.authorName}</Link>
            <div className="card-footer-meta">
              {new Date(announcement.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
