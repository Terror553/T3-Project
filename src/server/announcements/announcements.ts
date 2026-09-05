import { db } from "~/server/db";

export type Announcement = {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  published: boolean;
  authorId: number;
  authorName: string;
  authorAvatarUrl: string;
  createdAt: string;
};

type AnnouncementRow = {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  published: number;
  authorId: number;
  authorName: string;
  authorAvatarUrl: string;
  createdAt: Date;
};

function mapAnnouncement(row: AnnouncementRow): Announcement {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    imageUrl: row.imageUrl,
    published: row.published === 1,
    authorId: row.authorId,
    authorName: row.authorName,
    authorAvatarUrl: row.authorAvatarUrl,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function listPublishedAnnouncements(limit?: number): Promise<Announcement[]> {
  const rows = limit
    ? await db.$queryRaw<AnnouncementRow[]>`
    SELECT announcements.id, announcements.title, announcements.content,
      announcements.imageUrl, announcements.published, announcements.authorId,
      forum_user.username AS authorName, forum_user.avatarUrl AS authorAvatarUrl,
      announcements.createdAt
    FROM announcements
    INNER JOIN forum_user ON forum_user.id = announcements.authorId
    WHERE announcements.published = 1
    ORDER BY announcements.createdAt DESC
    LIMIT ${limit}
  `
    : await db.$queryRaw<AnnouncementRow[]>`
      SELECT announcements.id, announcements.title, announcements.content,
        announcements.imageUrl, announcements.published, announcements.authorId,
        forum_user.username AS authorName, forum_user.avatarUrl AS authorAvatarUrl,
        announcements.createdAt
      FROM announcements
      INNER JOIN forum_user ON forum_user.id = announcements.authorId
      WHERE announcements.published = 1
      ORDER BY announcements.createdAt DESC
    `;

  return rows.map(mapAnnouncement);
}

export async function getPublishedAnnouncement(id: number): Promise<Announcement | null> {
  const rows = await db.$queryRaw<AnnouncementRow[]>`
    SELECT announcements.id, announcements.title, announcements.content,
      announcements.imageUrl, announcements.published, announcements.authorId,
      forum_user.username AS authorName, forum_user.avatarUrl AS authorAvatarUrl,
      announcements.createdAt
    FROM announcements
    INNER JOIN forum_user ON forum_user.id = announcements.authorId
    WHERE announcements.id = ${id} AND announcements.published = 1
    LIMIT 1
  `;

  return rows[0] ? mapAnnouncement(rows[0]) : null;
}
