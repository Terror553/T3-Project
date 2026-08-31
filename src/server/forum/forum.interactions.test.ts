import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('~/server/auth/utils/currentUser', () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock('~/server/db', () => ({
  db: {
    forumTopic: {
      findUnique: vi.fn(),
    },
    forumReaction: {
      findFirst: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
    forumTopicFollow: {
      findFirst: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('forum interactions: reactions & follows', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('rejects reaction when not signed in', async () => {
    const { getCurrentUser } = await import('~/server/auth/utils/currentUser');
    (getCurrentUser as any).mockResolvedValue(null);

    const forum = await import('~/server/forum/forum');
    const res = await forum.toggleTopicReaction({ topicId: 1, reactionId: 2 });
    expect(res.success).toBe(false);
    expect(res.error?.code).toBe('auth/invalid-credentials');
  });

  it('returns not found when reacting to missing topic', async () => {
    const { getCurrentUser } = await import('~/server/auth/utils/currentUser');
    (getCurrentUser as any).mockResolvedValue({ id: 9 });

    const { db } = await import('~/server/db');
    (db.forumTopic.findUnique as any).mockResolvedValue(null);

    const forum = await import('~/server/forum/forum');
    const res = await forum.toggleTopicReaction({ topicId: 999, reactionId: 2 });
    expect(res.success).toBe(false);
    expect(res.error?.code).toBe('app/not-found');
  });

  it('adds a reaction when none exists and then removes it', async () => {
    const { getCurrentUser } = await import('~/server/auth/utils/currentUser');
    (getCurrentUser as any).mockResolvedValue({ id: 9 });

    const { db } = await import('~/server/db');
    (db.forumTopic.findUnique as any).mockResolvedValue({ id: 50 });

    // Add case: no existing reaction
    (db.forumReaction.findFirst as any).mockResolvedValue(null);
    (db.forumReaction.create as any).mockResolvedValue({ id: 500 });

    const forum = await import('~/server/forum/forum');
    const resAdd = await forum.toggleTopicReaction({ topicId: 50, reactionId: 2 });
    expect(resAdd.success).toBe(true);
    expect(resAdd.data?.added).toBe(true);

    // Remove case: existing reaction present
    (db.forumReaction.findFirst as any).mockResolvedValue({ id: 500 });
    (db.forumReaction.delete as any).mockResolvedValue({});
    const resRemove = await forum.toggleTopicReaction({ topicId: 50, reactionId: 2 });
    expect(resRemove.success).toBe(true);
    expect(resRemove.data?.added).toBe(false);
  });

  it('rejects follow when not signed in', async () => {
    const { getCurrentUser } = await import('~/server/auth/utils/currentUser');
    (getCurrentUser as any).mockResolvedValue(null);

    const forum = await import('~/server/forum/forum');
    const res = await forum.toggleTopicFollow({ topicId: 1 });
    expect(res.success).toBe(false);
    expect(res.error?.code).toBe('auth/invalid-credentials');
  });

  it('adds and removes follow correctly', async () => {
    const { getCurrentUser } = await import('~/server/auth/utils/currentUser');
    (getCurrentUser as any).mockResolvedValue({ id: 12 });

    const { db } = await import('~/server/db');
    (db.forumTopic.findUnique as any).mockResolvedValue({ id: 60 });

    (db.forumTopicFollow.findFirst as any).mockResolvedValue(null);
    (db.forumTopicFollow.create as any).mockResolvedValue({ id: 600 });

    const forum = await import('~/server/forum/forum');
    const resFollow = await forum.toggleTopicFollow({ topicId: 60 });
    expect(resFollow.success).toBe(true);
    expect(resFollow.data?.followed).toBe(true);

    (db.forumTopicFollow.findFirst as any).mockResolvedValue({ id: 600 });
    (db.forumTopicFollow.delete as any).mockResolvedValue({});
    const resUnfollow = await forum.toggleTopicFollow({ topicId: 60 });
    expect(resUnfollow.success).toBe(true);
    expect(resUnfollow.data?.followed).toBe(false);
  });
});
