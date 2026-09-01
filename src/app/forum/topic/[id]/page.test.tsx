/* @vitest-environment jsdom */
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ForumTopic, ForumUser } from "~/server/types/forum";
import Topic from "./page";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", props),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    React.createElement("a", props, children),
}));

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "42" }),
}));

vi.mock("~/client/theme", () => ({
  useTheme: () => ({
    showLoadingBar: vi.fn(),
    hideLoadingBar: vi.fn(),
  }),
}));

vi.mock("~/components/topicReplyForm", () => ({
  TopicReplyForm: () => React.createElement("div", { "data-testid": "reply-form" }),
}));

function createUser(id: number): ForumUser {
  return {
    id,
    username: "TestUser",
    avatarUrl: "/avatar.png",
    bannerUrl: "",
    signature: "",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    group: {
      id: 1,
      name: "Member",
      default: 1,
      color: "#fff",
      team: 0,
      highTeam: 0,
      priority: 0,
      gradient: 0,
      start: null,
      end: null,
    },
  };
}

function createTopic(user: ForumUser): ForumTopic {
  return {
    id: 42,
    title: "A test topic",
    content: "<p>Topic content</p>",
    status: 1,
    createdAt: new Date("2026-01-02"),
    updatedAt: new Date("2026-01-02"),
    locked: 0,
    pinned: 0,
    authorId: user.id,
    subcategoryId: 1,
    slug: "a-test-topic",
    hidden: 0,
    forum_topic_replies: [],
    forum_user: user,
    forum_topic_follow: [],
    forum_reactions: [],
  };
}

describe("forum topic page interactions", () => {
  const user = createUser(7);
  const topic = createTopic(user);
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      const body = url.includes("/api/auth/user") ? user : topic;
      return Promise.resolve(new Response(JSON.stringify(body), { status: 200 }));
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loads the topic and toggles a follow optimistically", async () => {
    render(<Topic />);

    await waitFor(() => expect(screen.getByText("A test topic")).toBeInTheDocument());

    const followButton = screen.getByRole("button", { name: "Folgen" });
    fireEvent.click(followButton);

    await waitFor(() => expect(screen.getByRole("button", { name: "Entfolgen" })).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/forum/topic/42/follow",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("updates the selected reaction count and active state", async () => {
    render(<Topic />);

    await waitFor(() => expect(screen.getByText("A test topic")).toBeInTheDocument());

    const likeButton = screen.getByRole("button", { name: "👍 0" });
    fireEvent.click(likeButton);

    await waitFor(() => expect(screen.getByRole("button", { name: "👍 1" })).toHaveClass("btn-outline-primary"));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/forum/topic/42/react",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
