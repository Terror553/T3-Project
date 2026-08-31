import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('~/server/auth/utils/currentUser', () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock('~/server/db', () => ({
  db: {
    forumTopicReply: {
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('forum replies — edgecases & admin permissions', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('editReply returns validation error when sanitized content is empty', async () => {
    const { getCurrentUser } = await import('~/server/auth/utils/currentUser');
    (getCurrentUser as any).mockResolvedValue({ id: 7 });

    const { db } = await import('~/server/db');
    (db.forumTopicReply.findUnique as any).mockResolvedValue({ id: 30, authorId: 7, topicId: 3 });

    const forum = await import('~/server/forum/forum');

    // Scripts are removed by DOMPurify -> sanitized content becomes empty
    const res = await forum.editReply({ id: 30, content: '<script>alert(1)</script>' });
    expect(res.success).toBe(false);
    expect(res.error?.code).toBe('app/validation-error');
  });

  it('deleteReply returns validation error when id is missing', async () => {
    const { getCurrentUser } = await import('~/server/auth/utils/currentUser');
    (getCurrentUser as any).mockResolvedValue({ id: 8 });

    const forum = await import('~/server/forum/forum');
    // missing id should trigger validation error from schema
    const res = await forum.deleteReply({} as any);
    expect(res.success).toBe(false);
    expect(res.error?.code).toBe('app/validation-error');
  });

  it('admin (highTeam=1) can edit replies authored by others', async () => {
    const { getCurrentUser } = await import('~/server/auth/utils/currentUser');
    (getCurrentUser as any).mockResolvedValue({ id: 100, group: { highTeam: 1 } });

    const { db } = await import('~/server/db');
    (db.forumTopicReply.findUnique as any).mockResolvedValue({ id: 30, authorId: 99, topicId: 3 });
    (db.forumTopicReply.update as any).mockResolvedValue({ id: 30 });

    const forum = await import('~/server/forum/forum');
    const res = await forum.editReply({ id: 30, content: 'Approved edit by admin' });
    expect(res.success).toBe(true);
    expect(res.data?.id).toBe(30);
  });

  it('admin (highTeam=1) can delete replies authored by others', async () => {
    const { getCurrentUser } = await import('~/server/auth/utils/currentUser');
    (getCurrentUser as any).mockResolvedValue({ id: 200, group: { highTeam: 1 } });

    const { db } = await import('~/server/db');
    (db.forumTopicReply.findUnique as any).mockResolvedValue({ id: 40, authorId: 300 });
    (db.forumTopicReply.delete as any).mockResolvedValue({});

    const forum = await import('~/server/forum/forum');
    const res = await forum.deleteReply({ id: 40 });
    expect(res.success).toBe(true);
    expect(res.data?.success).toBe(true);
  });
});
