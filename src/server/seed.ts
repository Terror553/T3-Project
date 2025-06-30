"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create test groups
  const defaultGroup = await prisma.groups.create({
    data: {
      name: "Default",
      color: "#808080",
      default: 1,
      team: 0,
      high_team: 0,
      priority: 1,
    },
  });

  const adminGroup = await prisma.groups.create({
    data: {
      name: "Admin",
      color: "#FF0000",
      default: 0,
      team: 1,
      high_team: 1,
      priority: 10,
    },
  });

  // Create test users
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        uuid: `test-uuid-${i}`,
        money: Math.random() * 1000,
        first_joined: new Date(),
        last_joined: new Date(),
        playtime: BigInt(Math.floor(Math.random() * 1000000)),
      },
    });
    users.push(user);
  }

  // Create forum users
  const forumUsers = [];
  for (let i = 1; i <= 10; i++) {
    const forumUser = await prisma.forum_user.create({
      data: {
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: "hashedpassword123",
        salt: "salt123",
        signature: `This is user ${i}'s signature`,
        roleId: i === 1 ? adminGroup.id : defaultGroup.id,
        user_id:
          users[i - 1]?.id ??
          (() => {
            throw new Error(`User at index ${i - 1} is undefined`);
          })(),
      },
    });
    forumUsers.push(forumUser);
  }

  // Create forum categories
  const categories = [];
  const categoryNames = [
    "Announcements",
    "General Discussion",
    "Support",
    "Off-Topic",
  ];
  for (const name of categoryNames) {
    const category = await prisma.forum_category.create({
      data: {
        name,
      },
    });
    categories.push(category);
  }

  // Create forum subcategories
  const subcategories = [];
  const subcategoryData = [
    {
      name: "News",
      description: "Latest server news",
      categoryId:
        categories[0]?.id ??
        (() => {
          throw new Error("Category at index 0 is undefined");
        })(),
    },
    {
      name: "Updates",
      description: "Server updates",
      categoryId:
        categories[0]?.id ??
        (() => {
          throw new Error("Category at index 0 is undefined");
        })(),
    },
    {
      name: "Chat",
      description: "General chat",
      categoryId:
        categories[1]?.id ??
        (() => {
          throw new Error("Category at index 1 is undefined");
        })(),
    },
    {
      name: "Help",
      description: "Get help here",
      categoryId:
        categories[2]?.id ??
        (() => {
          throw new Error("Category at index 2 is undefined");
        })(),
    },
    {
      name: "Bugs",
      description: "Report bugs here",
      categoryId: categories[2].id,
    },
  ];

  for (const data of subcategoryData) {
    const subcategory = await prisma.forum_subcategory.create({
      data: {
        ...data,
        slug: data.name.toLowerCase().replace(/ /g, "-"),
        status: 1,
      },
    });
    subcategories.push(subcategory);
  }

  // Create forum topics
  const topics = [];
  for (let i = 1; i <= 10; i++) {
    const topic = await prisma.forum_topics.create({
      data: {
        title: `Test Topic ${i}`,
        content: `This is test topic ${i} content`,
        authorId:
          forumUsers[Math.floor(Math.random() * forumUsers.length)]?.id ??
          (() => {
            throw new Error("Forum user is undefined");
          })(),
        subcategoryId:
          subcategories[Math.floor(Math.random() * subcategories.length)]?.id ??
          (() => {
            throw new Error("Subcategory is undefined");
          })(),
        slug: `test-topic-${i}`,
      },
    });
    topics.push(topic);
  }

  // Create forum topic replies
  for (let i = 1; i <= 20; i++) {
    await prisma.forum_topic_replies.create({
      data: {
        content: `This is reply ${i} to a topic`,
        authorId:
          forumUsers[Math.floor(Math.random() * forumUsers.length)]?.id ??
          (() => {
            throw new Error("Forum user is undefined");
          })(),
        topicIdId:
          topics[Math.floor(Math.random() * topics.length)]?.id ??
          (() => {
            throw new Error("Topic is undefined");
          })(),
      },
    });
  }

  // Create forum reaction emojis
  const emojis = [
    { emoji: "👍", name: "thumbs_up", negative: 0 },
    { emoji: "👎", name: "thumbs_down", negative: 1 },
    { emoji: "❤️", name: "heart", negative: 0 },
    { emoji: "😄", name: "smile", negative: 0 },
  ];

  const reactionEmojis = [];
  for (const emoji of emojis) {
    const reactionEmoji = await prisma.forum_reaction_emojis.create({
      data: {
        ...emoji,
        authorId:
          forumUsers[0]?.id ??
          (() => {
            throw new Error("Forum user at index 0 is undefined");
          })(),
      },
    });
    reactionEmojis.push(reactionEmoji);
  }

  // Create wiki categories
  const wikiCategories = [];
  const wikiCategoryNames = [
    "Getting Started",
    "Game Mechanics",
    "Rules",
    "FAQ",
  ];
  for (const name of wikiCategoryNames) {
    const wikiCategory = await prisma.wiki_categories.create({
      data: {
        name,
        content: `Main content for ${name}`,
        authorId:
          forumUsers[0]?.id ??
          (() => {
            throw new Error("Forum user at index 0 is undefined");
          })(),
      },
    });
    wikiCategories.push(wikiCategory);
  }

  // Create wiki subcategories
  for (const wikiCategory of wikiCategories) {
    for (let i = 1; i <= 2; i++) {
      await prisma.wiki_sub_categories.create({
        data: {
          name: `${wikiCategory.name} Subcategory ${i}`,
          content: `Content for ${wikiCategory.name} subcategory ${i}`,
          categoryId: wikiCategory.id,
          authorId:
            forumUsers[0]?.id ??
            (() => {
              throw new Error("Forum user at index 0 is undefined");
            })(),
        },
      });
    }
  }

  // Create forum messages between users
  for (let i = 1; i <= 10; i++) {
    const sender = forumUsers[Math.floor(Math.random() * forumUsers.length)];
    const receiver = forumUsers[Math.floor(Math.random() * forumUsers.length)];
    if (!sender || !receiver || sender.id === receiver.id) continue;

    await prisma.forum_messages.create({
      data: {
        title: `Test Message ${i}`,
        message: `This is test message ${i} content`,
        senderId: sender.id,
        recieverId: receiver.id,
      },
    });
  }

  // Create profile wall posts
  for (let i = 1; i <= 10; i++) {
    const user = forumUsers[Math.floor(Math.random() * forumUsers.length)];
    const profileUser =
      forumUsers[Math.floor(Math.random() * forumUsers.length)];
    if (!user || !profileUser || user.id === profileUser.id) continue;

    await prisma.profile_wall.create({
      data: {
        content: `Wall post ${i} content`,
        userId: user.id,
        profileIdId: profileUser.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
