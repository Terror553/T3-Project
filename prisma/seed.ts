import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const forumNames = [
  "BlockBard",
  "CreeperCrafter",
  "NetherNomad",
  "RedstoneRanger",
  "DiamondDrift",
  "SkyBuilder",
  "EnderEcho",
  "PiglinTrader",
  "BeaconBloom",
  "WitherWarden",
  "BiomeWalker",
  "MinecartMaven",
  "TorchTactician",
  "SlimeSprint",
  "ObsidianOath",
  "MapMarker",
  "PotionPilot",
  "ChunkLoader",
  "StrongholdScout",
  "RaidRunner",
  "VillageVanguard",
  "AxolotlAce",
  "TrialChamber",
  "CopperClock",
  "SnowGolem",
  "FurnaceFox",
];

const topicPrefixes = [
  "Guide",
  "Showcase",
  "Patch Notes",
  "Question",
  "Event",
  "Discussion",
  "Suggestion",
  "Update",
  "Challenge",
  "Meta",
];

const topicSubjects = [
  "best starter farms",
  "new survival district",
  "weekly build battle",
  "economy balancing ideas",
  "redstone performance tips",
  "1.21 exploration routes",
  "raid strategy thread",
  "PVP arena feedback",
  "town hall recap",
  "server optimization",
  "shop pricing review",
  "community mega project",
];

const subcategoryTemplates = [
  {
    category: "Server News",
    icon: "fa fa-bullhorn",
    items: [
      {
        name: "Announcements",
        slug: "announcements",
        description:
          "Official announcements, maintenance schedules, feature launches, and policy updates from staff.",
      },
      {
        name: "Patch Notes",
        slug: "patch-notes",
        description:
          "Version-by-version breakdowns of gameplay tweaks, balancing, bug fixes, and plugin updates.",
      },
      {
        name: "Events",
        slug: "events",
        description:
          "Seasonal events, tournaments, scavenger hunts, and special weekend activities.",
      },
    ],
  },
  {
    category: "Survival",
    icon: "fa fa-tree",
    items: [
      {
        name: "Base Building",
        slug: "base-building",
        description:
          "Build diaries, architecture tips, terrain planning, and inspirational base showcases.",
      },
      {
        name: "Farms and Redstone",
        slug: "farms-redstone",
        description:
          "Automation concepts, farm rates, lag-friendly wiring, and practical redstone tutorials.",
      },
      {
        name: "Economy and Shops",
        slug: "economy-shops",
        description:
          "Market trends, item valuation, storefront promotions, and trade partnerships.",
      },
    ],
  },
  {
    category: "Community",
    icon: "fa fa-users",
    items: [
      {
        name: "Introductions",
        slug: "introductions",
        description:
          "New member greetings, timezone check-ins, and finding teammates for projects.",
      },
      {
        name: "Media and Clips",
        slug: "media-clips",
        description:
          "Screenshots, timelapses, highlights, and short clips from around the server.",
      },
      {
        name: "Suggestions",
        slug: "suggestions",
        description:
          "Feedback on gameplay direction, quality-of-life ideas, and feature voting threads.",
      },
    ],
  },
  {
    category: "Support",
    icon: "fa fa-life-ring",
    items: [
      {
        name: "Help Desk",
        slug: "help-desk",
        description:
          "Troubleshooting, account issues, login assistance, and technical support requests.",
      },
      {
        name: "Bug Reports",
        slug: "bug-reports",
        description:
          "Reproducible issues, logs, expected behavior notes, and fix confirmations.",
      },
      {
        name: "Appeals",
        slug: "appeals",
        description:
          "Moderation review requests, context submissions, and appeal outcomes.",
      },
    ],
  },
  {
    category: "Competitive",
    icon: "fa fa-trophy",
    items: [
      {
        name: "PVP Strategies",
        slug: "pvp-strategies",
        description:
          "Loadouts, movement drills, matchup analysis, and scrim recaps.",
      },
      {
        name: "Ranked Ladder",
        slug: "ranked-ladder",
        description:
          "Season standings, ladder snapshots, match reports, and rivalry threads.",
      },
      {
        name: "Tournament Hub",
        slug: "tournament-hub",
        description:
          "Brackets, registration posts, prize details, and tournament coverage.",
      },
    ],
  },
];

const wikiTemplates = [
  {
    name: "Getting Started",
    content:
      "A practical onboarding path: commands, starter kits, safe zones, and first-day goals.",
    subs: [
      "First 30 Minutes",
      "Starter Claims",
      "Money Making Basics",
      "Essential Commands",
    ],
  },
  {
    name: "Server Systems",
    content:
      "Explains progression systems, ranks, economy loops, and daily activity rewards.",
    subs: [
      "Rank Progression",
      "Daily Missions",
      "Server Economy",
      "Auction House",
    ],
  },
  {
    name: "Technical Guides",
    content:
      "Optimization, mod compatibility guidance, connection quality, and troubleshooting tips.",
    subs: [
      "Client Performance",
      "Shader Recommendations",
      "Common Errors",
      "Latency Reduction",
    ],
  },
  {
    name: "Community Rules",
    content:
      "Behavior standards, moderation process, report templates, and common violation examples.",
    subs: ["Chat Conduct", "Build Rules", "Trade Safety", "Appeal Process"],
  },
];

const groupTemplates = [
  {
    name: "Owner",
    color: "#ff3b30",
    priority: 100,
    default: 0,
    team: 1,
    highTeam: 1,
    gradient: 1,
    start: "#ff3b30",
    end: "#ff9500",
  },
  {
    name: "Administrator",
    color: "#ff2d55",
    priority: 90,
    default: 0,
    team: 1,
    highTeam: 1,
    gradient: 1,
    start: "#ff2d55",
    end: "#af52de",
  },
  {
    name: "Moderator",
    color: "#0a84ff",
    priority: 70,
    default: 0,
    team: 1,
    highTeam: 0,
    gradient: 1,
    start: "#0a84ff",
    end: "#64d2ff",
  },
  {
    name: "Builder",
    color: "#30d158",
    priority: 50,
    default: 0,
    team: 0,
    highTeam: 0,
    gradient: 1,
    start: "#30d158",
    end: "#66cc66",
  },
  {
    name: "VIP",
    color: "#ffd60a",
    priority: 30,
    default: 0,
    team: 0,
    highTeam: 0,
    gradient: 0,
    start: null,
    end: null,
  },
  {
    name: "Member",
    color: "#e5e5ea",
    priority: 10,
    default: 1,
    team: 0,
    highTeam: 0,
    gradient: 0,
    start: null,
    end: null,
  },
];

const clanTemplates = [
  { name: "Aurora Sentinels", tag: "AUR" },
  { name: "Nether Vanguard", tag: "NVR" },
  { name: "Skyline Guild", tag: "SKY" },
  { name: "Obsidian Forge", tag: "OBF" },
  { name: "Riverstone Union", tag: "RSU" },
  { name: "Emerald Circuit", tag: "EMC" },
];

function playerUuid(index: number): string {
  const suffix = (index + 1).toString(16).padStart(12, "0");
  return `00000000-0000-0000-0000-${suffix}`;
}

function asDate(daysAgo: number, hourOffset = 0): Date {
  const now = new Date();
  return new Date(
    now.getTime() - daysAgo * 86_400_000 + hourOffset * 3_600_000,
  );
}

function pick<T>(arr: T[], index: number): T {
  return arr[index % arr.length] as T;
}

function boolInt(flag: boolean): number {
  return flag ? 1 : 0;
}

async function clearDatabase(): Promise<void> {
  await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 0");

  await prisma.$executeRawUnsafe("DELETE FROM forum_reports");
  await prisma.$executeRawUnsafe("DELETE FROM upload_metadata");
  await prisma.forumTopicReplyReaction.deleteMany();
  await prisma.forumTopicReaction.deleteMany();
  await prisma.forumReaction.deleteMany();
  await prisma.forumTopicFollow.deleteMany();
  await prisma.forumTopicReply.deleteMany();
  await prisma.forumMessageReply.deleteMany();
  await prisma.forumMessage.deleteMany();
  await prisma.forumTopic.deleteMany();
  await prisma.forumSubcategory.deleteMany();
  await prisma.forumCategory.deleteMany();
  await prisma.profileWallReply.deleteMany();
  await prisma.profileWall.deleteMany();
  await prisma.wikiSubCategory.deleteMany();
  await prisma.wikiCategory.deleteMany();
  await prisma.forumNavigation.deleteMany();
  await prisma.forumReactionEmoji.deleteMany();
  await prisma.forumVerification.deleteMany();
  await prisma.userPermission.deleteMany();
  await prisma.userGroup.deleteMany();
  await prisma.userJob.deleteMany();
  await prisma.userNameColor.deleteMany();
  await prisma.userTag.deleteMany();
  await prisma.userBan.deleteMany();
  await prisma.cooldown.deleteMany();
  await prisma.enderChest.deleteMany();
  await prisma.vanish.deleteMany();
  await prisma.user.deleteMany();
  await prisma.forumUser.deleteMany();
  await prisma.group.deleteMany();
  await prisma.job.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.nameColor.deleteMany();
  await prisma.profileBanner.deleteMany();
  await prisma.warp.deleteMany();
  await prisma.kit.deleteMany();
  await prisma.luckyBlockLocation.deleteMany();
  await prisma.luckyBlockReward.deleteMany();
  await prisma.mcServerSetting.deleteMany();
  await prisma.clan.deleteMany();
  await prisma.consoleLog.deleteMany();
  await prisma.userTable.deleteMany();

  await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 1");
}

async function seedCoreTables(): Promise<void> {
  await prisma.group.createMany({
    data: groupTemplates.map((group) => ({
      name: group.name,
      color: group.color,
      priority: group.priority,
      default: group.default,
      team: group.team,
      highTeam: group.highTeam,
      gradient: group.gradient,
      start: group.start,
      end: group.end,
    })),
  });

  await prisma.profileBanner.createMany({
    data: [
      { name: "sunrise", url: "/new/theme/banners/sunrise.jpg" },
      { name: "cavern", url: "/new/theme/banners/cavern.jpg" },
      { name: "fortress", url: "/new/theme/banners/fortress.jpg" },
      { name: "meadow", url: "/new/theme/banners/meadow.jpg" },
      { name: "citadel", url: "/new/theme/banners/citadel.jpg" },
      { name: "void", url: "/new/theme/banners/void.jpg" },
    ],
  });

  await prisma.nameColor.createMany({
    data: [
      { colour: "#f94144" },
      { colour: "#f3722c" },
      { colour: "#f9c74f" },
      { colour: "#90be6d" },
      { colour: "#43aa8b" },
      { colour: "#577590" },
      { colour: "#9d4edd" },
    ],
  });

  await prisma.tag.createMany({
    data: [
      { tag: "Builder" },
      { tag: "Merchant" },
      { tag: "Explorer" },
      { tag: "PVP" },
      { tag: "Farmer" },
      { tag: "Engineer" },
      { tag: "Lore Keeper" },
    ],
  });

  await prisma.permission.createMany({
    data: [
      { permission: "forum.post.create", permissionActivated: 1 },
      { permission: "forum.topic.pin", permissionActivated: 1 },
      { permission: "forum.topic.lock", permissionActivated: 1 },
      { permission: "server.teleport.warp", permissionActivated: 1 },
      { permission: "server.kit.claim.daily", permissionActivated: 1 },
      { permission: "server.shop.admin", permissionActivated: 1 },
      { permission: "server.report.moderate", permissionActivated: 1 },
    ],
  });

  await prisma.job.createMany({
    data: [
      {
        name: "Miner",
        description:
          "Excavates ore routes and supplies crafting materials to town markets.",
      },
      {
        name: "Builder",
        description:
          "Constructs public infrastructure, event arenas, and decorative landmarks.",
      },
      {
        name: "Farmer",
        description:
          "Runs high-yield crop loops and keeps food supplies stable for players.",
      },
      {
        name: "Hunter",
        description:
          "Farms hostile drops and rare loot for trading and event rewards.",
      },
      {
        name: "Engineer",
        description:
          "Designs automation systems and lag-aware redstone infrastructure.",
      },
    ],
  });

  await prisma.kit.createMany({
    data: [
      { name: "starter", permission: "kit.starter", cooldown: BigInt(86_400) },
      { name: "builder", permission: "kit.builder", cooldown: BigInt(172_800) },
      { name: "raider", permission: "kit.raider", cooldown: BigInt(259_200) },
      { name: "miner", permission: "kit.miner", cooldown: BigInt(86_400) },
      { name: "event", permission: "kit.event", cooldown: BigInt(43_200) },
    ],
  });

  await prisma.luckyBlockLocation.createMany({
    data: [
      { location: "world,120,64,-242" },
      { location: "world_nether,-87,61,113" },
      { location: "world_the_end,19,71,-31" },
      { location: "world,402,70,287" },
      { location: "world,16,65,16" },
    ],
  });

  await prisma.mcServerSetting.create({
    data: {
      motdLine1: "AetherCraft Network",
      motdLine2: "Survival, events, economy, and a very active community.",
      maxPlayers: 250,
    },
  });

  await prisma.warp.createMany({
    data: [
      { name: "spawn", uuid: null, location: "world,0,72,0,0,0" },
      { name: "market", uuid: null, location: "world,88,70,-44,180,0" },
      { name: "pvp_arena", uuid: null, location: "world,-210,76,92,90,0" },
      { name: "events", uuid: null, location: "world,317,74,-166,45,0" },
      { name: "resource_world", uuid: null, location: "world,801,64,801,0,0" },
    ],
  });

  await prisma.clan.createMany({
    data: clanTemplates.map((clan, index) => ({
      uuid: `clan-${index + 1}`,
      name: clan.name,
      tag: clan.tag,
      createdAt: asDate(120 - index * 5),
      updatedAt: asDate(3 + index),
    })),
  });
}

async function seedUsers(): Promise<{
  userRows: Array<{ id: number; uuid: string; name: string }>;
  forumUsers: Array<{ id: number; username: string; roleId: number | null }>;
}> {
  const groups = await prisma.group.findMany({ orderBy: { priority: "desc" } });
  const jobs = await prisma.job.findMany({ orderBy: { id: "asc" } });
  const clans = await prisma.clan.findMany({ orderBy: { id: "asc" } });

  const groupByName = new Map(groups.map((g) => [g.name, g.id]));

  const users: Array<{ id: number; uuid: string; name: string }> = [];
  const forumUsers: Array<{
    id: number;
    username: string;
    roleId: number | null;
  }> = [];

  for (let i = 0; i < forumNames.length; i += 1) {
    const username = forumNames[i] as string;
    const uuid = playerUuid(i);
    const clan = i % 3 === 0 ? pick(clans, i).name : null;

    const user = await prisma.user.create({
      data: {
        uuid,
        clan,
        money: 1500 + i * 420,
        firstJoined: asDate(220 - i * 4),
        lastJoined: asDate(i % 6, i % 11),
        playtime: BigInt(65_000 + i * 8_000),
      },
    });

    let roleId = groupByName.get("Member") ?? null;
    if (i === 0) roleId = groupByName.get("Owner") ?? null;
    else if (i <= 2) roleId = groupByName.get("Administrator") ?? null;
    else if (i <= 6) roleId = groupByName.get("Moderator") ?? null;
    else if (i <= 11) roleId = groupByName.get("Builder") ?? null;
    else if (i <= 17) roleId = groupByName.get("VIP") ?? null;

    const forumUser = await prisma.forumUser.create({
      data: {
        username,
        email: `${username.toLowerCase()}@aethercraft.gg`,
        password: `hash_${username.toLowerCase()}`,
        salt: `salt_${username.toLowerCase()}`,
        userAuthToken: i % 4 === 0 ? `token_${username.toLowerCase()}` : null,
        avatarUrl: `/new/theme/avatar/${(i % 8) + 1}.png`,
        bannerUrl: `/new/theme/banner/${(i % 6) + 1}.jpg`,
        signature: `Building dreams block by block. - ${username}`,
        createdAt: asDate(200 - i * 3),
        updatedAt: asDate(i % 8),
        roleId,
        userId: user.id,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { forumId: forumUser.id },
    });

    users.push({ id: user.id, uuid, name: username });
    forumUsers.push({ id: forumUser.id, username, roleId });

    await prisma.userGroup.create({
      data: {
        uuid,
        groupId: roleId ?? (groupByName.get("Member") as number),
      },
    });

    await prisma.userJob.create({
      data: {
        uuid,
        jobId: pick(jobs, i).id,
      },
    });

    await prisma.userNameColor.create({
      data: {
        uuid,
        colour: pick(
          ["#f94144", "#f3722c", "#90be6d", "#577590", "#9d4edd"],
          i,
        ),
      },
    });

    await prisma.userTag.create({
      data: {
        uuid,
        tagId: (i % 7) + 1,
      },
    });

    await prisma.enderChest.create({
      data: {
        uuid,
        level: (i % 5) + 1,
      },
    });

    if (i % 6 === 0) {
      await prisma.vanish.create({
        data: { uuid },
      });
    }

    await prisma.cooldown.createMany({
      data: [
        {
          uuid,
          cooldown_name: "daily_kit",
          expiry_time: BigInt(Math.floor(Date.now() / 1000) + (i + 1) * 3600),
        },
        {
          uuid,
          cooldown_name: "crate_key",
          expiry_time: BigInt(Math.floor(Date.now() / 1000) + (i + 2) * 4200),
        },
      ],
    });

    await prisma.luckyBlockReward.create({
      data: {
        uuid,
        reward: `Reward tier ${(i % 4) + 1}: ${pick(["Diamonds", "Netherite scrap", "XP bottle bundle", "Rare crate key"], i)}`,
        effect: i % 2 === 0,
      },
    });

    await prisma.userPermission.createMany({
      data: [
        {
          uuid,
          userId: user.id,
          permission: "server.teleport.warp",
          permissionActivated: true,
        },
        {
          uuid,
          userId: user.id,
          permission: i < 7 ? "forum.topic.lock" : "forum.post.create",
          permissionActivated: true,
        },
      ],
    });

    await prisma.forumVerification.create({
      data: {
        forumId: forumUser.id,
        verifyCode: `verify_${username.toLowerCase()}`,
      },
    });
  }

  await prisma.userBan.createMany({
    data: [
      {
        bannerUUID: users[2]?.uuid ?? "",
        bannedUUID: users[21]?.uuid ?? "",
        reason: "Repeated marketplace scam attempts.",
      },
      {
        bannerUUID: users[4]?.uuid ?? "",
        bannedUUID: users[19]?.uuid ?? "",
        reason: "Bypassing temporary mute with alternate account.",
      },
    ],
  });

  return { userRows: users, forumUsers };
}

async function seedForumContent(
  forumUsers: Array<{ id: number; username: string }>,
): Promise<void> {
  await prisma.forumCategory.createMany({
    data: subcategoryTemplates.map((item, index) => ({
      name: item.category,
      createdAt: asDate(100 - index * 2),
      updatedAt: asDate(index),
    })),
  });

  const categories = await prisma.forumCategory.findMany({
    orderBy: { id: "asc" },
  });

  for (let i = 0; i < categories.length; i += 1) {
    const category = categories[i] as { id: number; name: string };
    const template = subcategoryTemplates.find(
      (t) => t.category === category.name,
    );
    if (!template) continue;

    await prisma.forumSubcategory.createMany({
      data: template.items.map((sub, subIndex) => ({
        name: sub.name,
        description: sub.description,
        status: subIndex % 3 === 0 ? 1 : 0,
        slug: `${sub.slug}-${category.id}`,
        categoryId: category.id,
        createdAt: asDate(90 - i * 2 - subIndex),
        updatedAt: asDate(subIndex),
      })),
    });
  }

  const subcategories = await prisma.forumSubcategory.findMany({
    orderBy: { id: "asc" },
  });

  const topicRows: Array<{
    title: string;
    content: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    locked: number;
    pinned: number;
    authorId: number;
    subcategoryId: number;
    slug: string;
  }> = [];

  let topicCounter = 0;

  for (const sub of subcategories) {
    for (let i = 0; i < 8; i += 1) {
      const author = pick(forumUsers, topicCounter + i);
      const subject = pick(topicSubjects, topicCounter + i);
      const prefix = pick(topicPrefixes, topicCounter + i);
      const title = `${prefix}: ${subject}`;

      topicRows.push({
        title,
        content:
          `This thread covers ${subject}. ` +
          `We tested multiple approaches on live server nights and summarized what worked best. ` +
          `Share your own numbers, screenshots, and improvements so we can keep this guide current.`,
        status: i % 6 === 0 ? 1 : 0,
        createdAt: asDate(75 - i - (sub.id % 6), i),
        updatedAt: asDate(i % 7),
        locked: boolInt(i % 7 === 0),
        pinned: boolInt(i % 8 === 0),
        authorId: author.id,
        subcategoryId: sub.id,
        slug: `${sub.slug}-topic-${i + 1}`,
      });

      topicCounter += 1;
    }
  }

  await prisma.forumTopic.createMany({ data: topicRows });

  const topics = await prisma.forumTopic.findMany({ orderBy: { id: "asc" } });

  const repliesData: Array<{
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    topicId: number;
  }> = [];

  for (let i = 0; i < topics.length; i += 1) {
    const topic = topics[i] as { id: number; title: string };
    const replyCount = 3 + (i % 4);

    for (let r = 0; r < replyCount; r += 1) {
      const author = pick(forumUsers, i + r + 2);
      repliesData.push({
        content:
          `Reply ${r + 1} on ${topic.title}. ` +
          `I tried this in our district and the results were solid after small tweaks to chunk loading and item flow.`,
        createdAt: asDate(50 - (i % 20), r),
        updatedAt: asDate((i + r) % 6),
        authorId: author.id,
        topicId: topic.id,
      });
    }
  }

  await prisma.forumTopicReply.createMany({ data: repliesData });

  const emojis = [
    { emoji: ":fire:", name: "Fire", negative: 0 },
    { emoji: ":pick:", name: "Useful", negative: 0 },
    { emoji: ":sparkles:", name: "Creative", negative: 0 },
    { emoji: ":thumbsup:", name: "Agree", negative: 0 },
    { emoji: ":hourglass:", name: "Needs work", negative: 1 },
  ];

  await prisma.forumReactionEmoji.createMany({
    data: emojis.map((emoji, i) => ({
      ...emoji,
      authorId: pick(forumUsers, i).id,
      createdAt: asDate(30 - i),
    })),
  });

  const emojiRows = await prisma.forumReactionEmoji.findMany({
    orderBy: { id: "asc" },
  });

  await prisma.forumTopicFollow.createMany({
    data: topics.flatMap((topic, i) => {
      const followers = [
        pick(forumUsers, i + 1),
        pick(forumUsers, i + 6),
        pick(forumUsers, i + 11),
      ];
      return followers.map((user) => ({
        topicId: topic.id,
        userId: user.id,
      }));
    }),
  });

  await prisma.forumTopicReaction.createMany({
    data: topics.flatMap((topic, i) => {
      return [0, 1, 2].map((offset) => ({
        createdAt: asDate(18 - (i % 10), offset),
        authorId: pick(forumUsers, i + offset + 3).id,
        reactionId: pick(emojiRows, i + offset).id,
        topicId: topic.id,
      }));
    }),
  });

  await prisma.forumReaction.createMany({
    data: topics.flatMap((topic, i) => {
      return [0, 1].map((offset) => ({
        createdAt: asDate(15 - (i % 8), offset),
        authorId: pick(forumUsers, i + offset + 1).id,
        reactionId: pick(emojiRows, i + offset + 2).id,
        topicId: topic.id,
      }));
    }),
  });

  const replies = await prisma.forumTopicReply.findMany({
    orderBy: { id: "asc" },
  });

  await prisma.forumTopicReplyReaction.createMany({
    data: replies.flatMap((reply, i) => {
      return [0, 1].map((offset) => ({
        createdAt: asDate(10 - (i % 5), offset),
        authorId: pick(forumUsers, i + offset + 4).id,
        reactionId: pick(emojiRows, i + offset).id,
        replyId: reply.id,
      }));
    }),
  });

  const pmPairs = [
    [1, 8],
    [3, 10],
    [5, 14],
    [7, 15],
    [9, 18],
    [2, 20],
    [4, 16],
    [6, 22],
  ];

  for (let i = 0; i < pmPairs.length; i += 1) {
    const sender = forumUsers[(pmPairs[i]?.[0] ?? 1) % forumUsers.length] as {
      id: number;
      username: string;
    };
    const receiver = forumUsers[(pmPairs[i]?.[1] ?? 2) % forumUsers.length] as {
      id: number;
      username: string;
    };

    const message = await prisma.forumMessage.create({
      data: {
        title: `Quick coordination: project slot ${i + 1}`,
        message:
          `Hey ${receiver.username}, want to sync on tonight's build phase? ` +
          `I can gather materials and reserve an area near the district rail if that works for you.`,
        seen: i % 3 === 0 ? 1 : 0,
        senderId: sender.id,
        receiverId: receiver.id,
        createdAt: asDate(14 - i),
      },
    });

    await prisma.forumMessageReply.createMany({
      data: [
        {
          message: `Sounds good. I will bring quartz and lanterns so we can finish the facade tonight.`,
          seen: 1,
          senderId: receiver.id,
          receiverId: sender.id,
          messageId: message.id,
          createdAt: asDate(13 - i, 2),
        },
        {
          message: `Perfect, I will post progress screenshots in the media channel after the session.`,
          seen: 0,
          senderId: sender.id,
          receiverId: receiver.id,
          messageId: message.id,
          createdAt: asDate(12 - i, 3),
        },
      ],
    });
  }

  await prisma.forumNavigation.createMany({
    data: [
      {
        name: "Home",
        icon: "fa fa-home",
        fullLink: "/",
        authorId: forumUsers[0]?.id,
        teamLink: 0,
      },
      {
        name: "Forum",
        icon: "fa fa-comments",
        fullLink: "/forum",
        authorId: forumUsers[1]?.id,
        teamLink: 0,
      },
      {
        name: "Wiki",
        icon: "fa fa-book",
        fullLink: "/wiki",
        authorId: forumUsers[2]?.id,
        teamLink: 0,
      },
      {
        name: "Staff Hub",
        icon: "fa fa-shield",
        fullLink: "/forum/staff",
        authorId: forumUsers[3]?.id,
        teamLink: 1,
      },
      {
        name: "Player Profiles",
        icon: "fa fa-user",
        fullLink: "/profile",
        authorId: forumUsers[4]?.id,
        teamLink: 0,
      },
    ],
  });

  const profileWallPosts = forumUsers.slice(0, 20).flatMap((profile, i) => {
    const authorA = pick(forumUsers, i + 3);
    const authorB = pick(forumUsers, i + 9);

    return [
      {
        content: `Great work on your district updates this week. The new pathways look much cleaner and easier to navigate.`,
        userId: authorA.id,
        profileId: profile.id,
        createdAt: asDate(8 - (i % 5), 1),
        updatedAt: asDate(7 - (i % 5), 2),
      },
      {
        content: `Your shop pricing sheet helped a lot. We copied your format and sales are noticeably better now.`,
        userId: authorB.id,
        profileId: profile.id,
        createdAt: asDate(7 - (i % 5), 3),
        updatedAt: asDate(6 - (i % 5), 4),
      },
    ];
  });

  await prisma.profileWall.createMany({ data: profileWallPosts });

  const wallPosts = await prisma.profileWall.findMany({
    orderBy: { id: "asc" },
  });

  await prisma.profileWallReply.createMany({
    data: wallPosts.flatMap((post, i) => {
      return [0, 1].map((offset) => ({
        content:
          offset === 0
            ? "Appreciate it. We are planning another pass this weekend and will share before/after images."
            : "Thanks for the feedback. Feel free to drop your own numbers and we can compare results.",
        userId: pick(forumUsers, i + offset + 5).id,
        postId: post.id,
        createdAt: asDate(5 - (i % 4), offset + 1),
        updatedAt: asDate(4 - (i % 4), offset + 2),
      }));
    }),
  });
}

async function seedReports(
  forumUsers: Array<{ id: number }>,
): Promise<void> {
  const reporter = forumUsers[1];
  if (!reporter) return;

  const topic = await prisma.forumTopic.findFirst({
    orderBy: { id: "asc" },
    select: { id: true },
  });
  if (!topic) return;

  await prisma.$executeRaw`
    INSERT INTO forum_reports (reason, status, reporterId, topicId)
    VALUES (
      ${"Example report for seeded moderation data."},
      ${"open"},
      ${reporter.id},
      ${topic.id}
    )
  `;
}

async function seedWiki(forumUsers: Array<{ id: number }>): Promise<void> {
  for (let i = 0; i < wikiTemplates.length; i += 1) {
    const template = wikiTemplates[i] as {
      name: string;
      content: string;
      subs: string[];
    };

    const category = await prisma.wikiCategory.create({
      data: {
        name: template.name,
        icon: i % 2 === 0 ? "fa fa-book" : "fa fa-compass",
        dropdown: i % 2,
        content: template.content,
        authorId: pick(forumUsers, i).id,
        createdAt: asDate(40 - i * 2),
        updatedAt: asDate(i),
      },
    });

    await prisma.wikiSubCategory.createMany({
      data: template.subs.map((name, subIndex) => ({
        name,
        categoryId: category.id,
        content:
          `${name} details for players and staff. ` +
          `Includes practical examples, expected outcomes, and known caveats from live server usage.`,
        authorId: pick(forumUsers, i + subIndex + 2).id,
        icon: subIndex % 2 === 0 ? "fa fa-file-text" : "fa fa-lightbulb-o",
        createdAt: asDate(35 - i - subIndex),
        updatedAt: asDate(subIndex),
      })),
    });
  }
}

async function seedConsoleAndMisc(
  users: Array<{ uuid: string; name: string }>,
): Promise<void> {
  await prisma.consoleLog.createMany({
    data: [
      {
        message:
          "[INFO] Daily restart completed in 18s. 214 players reconnected.",
      },
      {
        message:
          "[WARN] Economy monitor flagged unusual diamond block transfer volume.",
      },
      { message: "[INFO] Event plugin rotated weekly challenge objectives." },
      { message: "[INFO] Backup snapshot archived to remote storage." },
      { message: "[INFO] Region cleanup task removed 143 orphan chunks." },
      {
        message:
          "[WARN] Anti-cheat detected suspicious movement spikes in arena instance 2.",
      },
      { message: "[INFO] Staff ticket queue reached zero open items." },
      {
        message:
          "[INFO] Marketplace tax sink removed 127,400 coins from circulation.",
      },
    ],
  });

  await prisma.userTable.createMany({
    data: users.slice(0, 10).map((user, i) => ({
      name: user.name,
      age: 16 + (i % 12),
      email: `${user.name.toLowerCase()}+table@aethercraft.gg`,
    })),
  });
}

async function main(): Promise<void> {
  await clearDatabase();
  await seedCoreTables();

  const { userRows, forumUsers } = await seedUsers();

  await seedForumContent(
    forumUsers.map((u) => ({
      id: u.id,
      username: u.username,
    })),
  );
  await seedReports(forumUsers);

  await seedWiki(
    forumUsers.map((u) => ({
      id: u.id,
    })),
  );

  await seedConsoleAndMisc(userRows);

  const counts = await prisma.$transaction([
    prisma.forumUser.count(),
    prisma.forumCategory.count(),
    prisma.forumSubcategory.count(),
    prisma.forumTopic.count(),
    prisma.forumTopicReply.count(),
    prisma.forumTopicReaction.count(),
    prisma.forumTopicReplyReaction.count(),
    prisma.profileWall.count(),
    prisma.wikiCategory.count(),
    prisma.wikiSubCategory.count(),
  ]);

  console.log("Seed complete.");
  console.log(`Forum users: ${counts[0]}`);
  console.log(`Forum categories: ${counts[1]}`);
  console.log(`Forum subcategories: ${counts[2]}`);
  console.log(`Forum topics: ${counts[3]}`);
  console.log(`Forum replies: ${counts[4]}`);
  console.log(`Topic reactions: ${counts[5]}`);
  console.log(`Reply reactions: ${counts[6]}`);
  console.log(`Profile wall posts: ${counts[7]}`);
  console.log(`Wiki categories: ${counts[8]}`);
  console.log(`Wiki subcategories: ${counts[9]}`);
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
