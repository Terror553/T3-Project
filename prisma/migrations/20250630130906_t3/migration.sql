-- CreateTable
CREATE TABLE `clans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` TEXT NOT NULL,
    `name` TEXT NOT NULL,
    `tag` TEXT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `clans_uuid_name_tag_key`(`uuid`(255), `name`(255), `tag`(255)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `console_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cooldowns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` TEXT NOT NULL,
    `cooldown_name` TEXT NOT NULL,
    `expiry_time` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enderchests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` TEXT NOT NULL,
    `level` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `enderchests_uuid_key`(`uuid`(255)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_message_replies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `message` LONGTEXT NOT NULL,
    `seen` TINYINT NOT NULL DEFAULT 0,
    `recieverId` INTEGER NULL,
    `senderId` INTEGER NULL,
    `messageIdId` INTEGER NULL,

    INDEX `FK_556685f3d09d857a83fd5ec78a6`(`senderId`),
    INDEX `FK_adfe13459283a2557815dd324ed`(`messageIdId`),
    INDEX `FK_d666a9fde168dc3dbed5e31bf8f`(`recieverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `message` LONGTEXT NOT NULL,
    `title` LONGTEXT NOT NULL,
    `seen` TINYINT NOT NULL DEFAULT 0,
    `recieverId` INTEGER NULL,
    `senderId` INTEGER NULL,

    INDEX `FK_3bcdc4c5bac35457101c5c8c210`(`recieverId`),
    INDEX `FK_e916d67a4faa28da95a756fef06`(`senderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_navigation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `icon` TEXT NOT NULL DEFAULT 'fa fa-home',
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `full_link` LONGTEXT NOT NULL,
    `authorId` INTEGER NULL,
    `team_link` TINYINT NOT NULL DEFAULT 0,

    INDEX `FK_40619500e2c99b828307e482ef1`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_reaction_emojis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `emoji` LONGTEXT NOT NULL,
    `negative` TINYINT NOT NULL DEFAULT 0,
    `authorId` INTEGER NULL,
    `name` LONGTEXT NOT NULL,

    INDEX `FK_fba5fa9ac48b9af3581b51cfd2c`(`authorId`),
    UNIQUE INDEX `forum_reaction_emojis_emoji_name_key`(`emoji`(255), `name`(255)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_reactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `authorId` INTEGER NULL,
    `reactionId` INTEGER NULL,
    `topicId` INTEGER NULL,

    INDEX `FK_12687a89e830cc09169f5a8b269`(`authorId`),
    INDEX `FK_19c88f09f86beb68f1667f5dd47`(`topicId`),
    INDEX `FK_877f91924b98cb6704281237d37`(`reactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_subcategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `categoryId` INTEGER NULL,
    `slug` TEXT NOT NULL,

    INDEX `FK_30b2b73b600b347e6fbfba27231`(`categoryId`),
    UNIQUE INDEX `forum_subcategory_slug_name_key`(`slug`(255), `name`(255)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_topic_follow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `topicId` INTEGER NULL,

    INDEX `FK_35b47425b0c71009e3346d1b997`(`topicId`),
    INDEX `FK_c1b00610ad7ce8678c2b55799b9`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_topic_reactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `authorId` INTEGER NULL,
    `reactionId` INTEGER NULL,
    `topicId` INTEGER NULL,

    INDEX `FK_2ad71e531f2f0fc3f10b2f739cb`(`authorId`),
    INDEX `FK_2d49ae3a7c256ffbd388f418347`(`topicId`),
    INDEX `FK_efd1dc571c08fb277e60c9a31c4`(`reactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_topic_replies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `content` LONGTEXT NOT NULL,
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `authorId` INTEGER NULL,
    `topicIdId` INTEGER NULL,

    INDEX `FK_3487d2b211836d6fff2cb39eeb0`(`authorId`),
    INDEX `FK_9a56eaee984340cdc2ff1b383df`(`topicIdId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_topic_reply_reactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `authorId` INTEGER NULL,
    `reactionId` INTEGER NULL,
    `replyId` INTEGER NULL,

    INDEX `FK_218ed32b068b337d176790a5dbe`(`reactionId`),
    INDEX `FK_4541e008cc2caa5987e41b65f8d`(`authorId`),
    INDEX `FK_b9b57ef3a1ab2f303b5b5883cb0`(`replyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_topics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `locked` TINYINT NOT NULL DEFAULT 0,
    `pinned` TINYINT NOT NULL DEFAULT 0,
    `authorId` INTEGER NULL,
    `subcategoryId` INTEGER NULL,
    `slug` TEXT NULL,

    INDEX `FK_01d2ff4b1bbf5c9eee83310498a`(`subcategoryId`),
    INDEX `FK_c228733246cf2aee0240663b354`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile_banners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    UNIQUE INDEX `url`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `password` LONGTEXT NOT NULL,
    `salt` LONGTEXT NOT NULL,
    `userAuthToken` LONGTEXT NULL,
    `avatar_url` LONGTEXT NOT NULL DEFAULT 'default.png',
    `banner_url` LONGTEXT NOT NULL DEFAULT 'default.png',
    `signature` LONGTEXT NOT NULL DEFAULT '',
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `roleId` INTEGER NULL,
    `user_id` INTEGER NULL,

    UNIQUE INDEX `REL_e01d18e1c4884655561785cca8`(`user_id`),
    INDEX `FK_0fd7d07d475155bfb73b59a0b64`(`roleId`),
    UNIQUE INDEX `forum_user_username_password_salt_email_userAuthToken_key`(`username`(255), `password`(255), `salt`(255), `email`(255), `userAuthToken`(255)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum_verify` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `forum_id` INTEGER NOT NULL,
    `verify_code` TEXT NOT NULL,

    UNIQUE INDEX `IDX_8fc517f51e047d7a32214e04be`(`forum_id`),
    UNIQUE INDEX `forum_verify_verify_code_key`(`verify_code`(255)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `color` TEXT NOT NULL,
    `default` TINYINT NOT NULL DEFAULT 0,
    `team` TINYINT NOT NULL DEFAULT 0,
    `high_team` TINYINT NOT NULL DEFAULT 0,
    `priority` INTEGER NOT NULL,
    `gradient` TINYINT NOT NULL DEFAULT 0,
    `start` LONGTEXT NULL,
    `end` LONGTEXT NULL,

    UNIQUE INDEX `groups_name_key`(`name`(255)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` LONGTEXT NULL,
    `description` LONGTEXT NULL,

    UNIQUE INDEX `jobs_name_key`(`name`(255)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(36) NULL,
    `permission` VARCHAR(255) NULL,
    `cooldown` BIGINT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lucky_block_location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lucky_block_rewards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NULL,
    `reward` LONGTEXT NULL,
    `effect` BOOLEAN NULL,

    UNIQUE INDEX `uuid`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mc_server_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `motdLine1` TEXT NOT NULL,
    `motdLine2` TEXT NOT NULL,
    `maxPlayers` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `name_colors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `colour` LONGTEXT NULL,

    UNIQUE INDEX `name_colors_colour_key`(`colour`(255)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `permission` TEXT NOT NULL,
    `permission_activated` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile_wall` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` LONGTEXT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `userId` INTEGER NULL,
    `profileIdId` INTEGER NULL,

    INDEX `FK_2dafd95532ee5d6dac6a7c590f6`(`profileIdId`),
    INDEX `FK_92452c9a6824ad27b970ef184bc`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile_wall_replies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` LONGTEXT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `userId` INTEGER NULL,
    `postIdId` INTEGER NULL,

    INDEX `FK_1ae72664e954a265529cba6443a`(`userId`),
    INDEX `FK_5303ba06dd6bb7b476d29d08e08`(`postIdId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag` LONGTEXT NOT NULL,

    UNIQUE INDEX `tags_tag_key`(`tag`(255)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` TEXT NOT NULL,
    `clan` TEXT NULL,
    `money` DOUBLE NOT NULL DEFAULT 0,
    `first_joined` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `last_joined` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `playtime` BIGINT NOT NULL DEFAULT 0,
    `forum_id` INTEGER NULL,

    UNIQUE INDEX `IDX_7528958a5a4f9879864f44a108`(`forum_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_bans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bannerUUID` LONGTEXT NOT NULL,
    `bannedUUID` LONGTEXT NOT NULL,
    `reason` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` TEXT NOT NULL,
    `group_id` INTEGER NOT NULL DEFAULT 0,

    INDEX `group_id`(`group_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NULL,
    `job_id` INTEGER NULL,

    UNIQUE INDEX `uuid`(`uuid`),
    INDEX `job_id`(`job_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_name_color` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NULL,
    `colour` LONGTEXT NULL,

    UNIQUE INDEX `uuid`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` LONGTEXT NOT NULL,
    `user_id` INTEGER NOT NULL,
    `permission` LONGTEXT NOT NULL,
    `permission_activated` BOOLEAN NOT NULL DEFAULT true,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NULL,
    `tag_id` INTEGER NULL,

    UNIQUE INDEX `uuid`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_table` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `email` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `users_table_email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vanish` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` TEXT NOT NULL,

    UNIQUE INDEX `vanish_uuid_key`(`uuid`(255)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NULL,
    `location` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wiki_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `icon` TEXT NOT NULL DEFAULT 'fa fa-home',
    `dropdown` TINYINT NOT NULL DEFAULT 0,
    `content` LONGTEXT NULL DEFAULT '',
    `authorId` INTEGER NULL,

    INDEX `FK_06c5494731becb0094773249b09`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wiki_sub_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `categoryId` INTEGER NULL,
    `content` LONGTEXT NOT NULL,
    `authorId` INTEGER NULL,
    `icon` TEXT NULL DEFAULT 'fa fa-home',

    INDEX `FK_729a85de35fdf19104b5a0b5757`(`authorId`),
    INDEX `FK_c1f0c927778f69cfdaf253e78c2`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `forum_message_replies` ADD CONSTRAINT `FK_556685f3d09d857a83fd5ec78a6` FOREIGN KEY (`senderId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_message_replies` ADD CONSTRAINT `FK_adfe13459283a2557815dd324ed` FOREIGN KEY (`messageIdId`) REFERENCES `forum_messages`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_message_replies` ADD CONSTRAINT `FK_d666a9fde168dc3dbed5e31bf8f` FOREIGN KEY (`recieverId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_messages` ADD CONSTRAINT `FK_3bcdc4c5bac35457101c5c8c210` FOREIGN KEY (`recieverId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_messages` ADD CONSTRAINT `FK_e916d67a4faa28da95a756fef06` FOREIGN KEY (`senderId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_navigation` ADD CONSTRAINT `FK_40619500e2c99b828307e482ef1` FOREIGN KEY (`authorId`) REFERENCES `forum_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_reaction_emojis` ADD CONSTRAINT `FK_fba5fa9ac48b9af3581b51cfd2c` FOREIGN KEY (`authorId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_reactions` ADD CONSTRAINT `FK_12687a89e830cc09169f5a8b269` FOREIGN KEY (`authorId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_reactions` ADD CONSTRAINT `FK_19c88f09f86beb68f1667f5dd47` FOREIGN KEY (`topicId`) REFERENCES `forum_topics`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_reactions` ADD CONSTRAINT `FK_877f91924b98cb6704281237d37` FOREIGN KEY (`reactionId`) REFERENCES `forum_reaction_emojis`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_subcategory` ADD CONSTRAINT `FK_30b2b73b600b347e6fbfba27231` FOREIGN KEY (`categoryId`) REFERENCES `forum_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_topic_follow` ADD CONSTRAINT `FK_35b47425b0c71009e3346d1b997` FOREIGN KEY (`topicId`) REFERENCES `forum_topics`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_topic_follow` ADD CONSTRAINT `FK_c1b00610ad7ce8678c2b55799b9` FOREIGN KEY (`userId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_topic_reactions` ADD CONSTRAINT `FK_2ad71e531f2f0fc3f10b2f739cb` FOREIGN KEY (`authorId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_topic_reactions` ADD CONSTRAINT `FK_2d49ae3a7c256ffbd388f418347` FOREIGN KEY (`topicId`) REFERENCES `forum_topics`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_topic_reactions` ADD CONSTRAINT `FK_efd1dc571c08fb277e60c9a31c4` FOREIGN KEY (`reactionId`) REFERENCES `forum_reaction_emojis`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_topic_replies` ADD CONSTRAINT `FK_3487d2b211836d6fff2cb39eeb0` FOREIGN KEY (`authorId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_topic_replies` ADD CONSTRAINT `FK_9a56eaee984340cdc2ff1b383df` FOREIGN KEY (`topicIdId`) REFERENCES `forum_topics`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_topic_reply_reactions` ADD CONSTRAINT `FK_218ed32b068b337d176790a5dbe` FOREIGN KEY (`reactionId`) REFERENCES `forum_reaction_emojis`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_topic_reply_reactions` ADD CONSTRAINT `FK_4541e008cc2caa5987e41b65f8d` FOREIGN KEY (`authorId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_topic_reply_reactions` ADD CONSTRAINT `FK_b9b57ef3a1ab2f303b5b5883cb0` FOREIGN KEY (`replyId`) REFERENCES `forum_topic_replies`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_topics` ADD CONSTRAINT `FK_01d2ff4b1bbf5c9eee83310498a` FOREIGN KEY (`subcategoryId`) REFERENCES `forum_subcategory`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_topics` ADD CONSTRAINT `FK_c228733246cf2aee0240663b354` FOREIGN KEY (`authorId`) REFERENCES `forum_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_user` ADD CONSTRAINT `FK_0fd7d07d475155bfb73b59a0b64` FOREIGN KEY (`roleId`) REFERENCES `groups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_user` ADD CONSTRAINT `FK_e01d18e1c4884655561785cca80` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profile_wall` ADD CONSTRAINT `FK_2dafd95532ee5d6dac6a7c590f6` FOREIGN KEY (`profileIdId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profile_wall` ADD CONSTRAINT `FK_92452c9a6824ad27b970ef184bc` FOREIGN KEY (`userId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profile_wall_replies` ADD CONSTRAINT `FK_1ae72664e954a265529cba6443a` FOREIGN KEY (`userId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profile_wall_replies` ADD CONSTRAINT `FK_5303ba06dd6bb7b476d29d08e08` FOREIGN KEY (`postIdId`) REFERENCES `profile_wall`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_groups` ADD CONSTRAINT `user_groups_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_jobs` ADD CONSTRAINT `user_jobs_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_permissions` ADD CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `wiki_categories` ADD CONSTRAINT `FK_06c5494731becb0094773249b09` FOREIGN KEY (`authorId`) REFERENCES `forum_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wiki_sub_categories` ADD CONSTRAINT `FK_729a85de35fdf19104b5a0b5757` FOREIGN KEY (`authorId`) REFERENCES `forum_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wiki_sub_categories` ADD CONSTRAINT `FK_c1f0c927778f69cfdaf253e78c2` FOREIGN KEY (`categoryId`) REFERENCES `wiki_categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
