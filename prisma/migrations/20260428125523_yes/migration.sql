/*
  Warnings:

  - You are about to drop the column `messageIdId` on the `forum_message_replies` table. All the data in the column will be lost.
  - You are about to drop the column `recieverId` on the `forum_message_replies` table. All the data in the column will be lost.
  - You are about to drop the column `recieverId` on the `forum_messages` table. All the data in the column will be lost.
  - You are about to drop the column `full_link` on the `forum_navigation` table. All the data in the column will be lost.
  - You are about to drop the column `team_link` on the `forum_navigation` table. All the data in the column will be lost.
  - You are about to drop the column `topicIdId` on the `forum_topic_replies` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `forum_user` table. All the data in the column will be lost.
  - You are about to drop the column `banner_url` on the `forum_user` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `forum_user` table. All the data in the column will be lost.
  - You are about to drop the column `forum_id` on the `forum_verify` table. All the data in the column will be lost.
  - You are about to drop the column `verify_code` on the `forum_verify` table. All the data in the column will be lost.
  - You are about to drop the column `high_team` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `permission_activated` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `profileIdId` on the `profile_wall` table. All the data in the column will be lost.
  - You are about to drop the column `postIdId` on the `profile_wall_replies` table. All the data in the column will be lost.
  - You are about to drop the column `first_joined` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `forum_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_joined` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `user_groups` table. All the data in the column will be lost.
  - You are about to drop the column `job_id` on the `user_jobs` table. All the data in the column will be lost.
  - You are about to drop the column `permission_activated` on the `user_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `tag_id` on the `user_tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `forum_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[forumId]` on the table `forum_verify` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[verifyCode]` on the table `forum_verify` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[forumId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullLink` to the `forum_navigation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forumId` to the `forum_verify` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifyCode` to the `forum_verify` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user_permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `forum_message_replies` DROP FOREIGN KEY `FK_adfe13459283a2557815dd324ed`;

-- DropForeignKey
ALTER TABLE `forum_message_replies` DROP FOREIGN KEY `FK_d666a9fde168dc3dbed5e31bf8f`;

-- DropForeignKey
ALTER TABLE `forum_messages` DROP FOREIGN KEY `FK_3bcdc4c5bac35457101c5c8c210`;

-- DropForeignKey
ALTER TABLE `forum_topic_replies` DROP FOREIGN KEY `FK_9a56eaee984340cdc2ff1b383df`;

-- DropForeignKey
ALTER TABLE `forum_user` DROP FOREIGN KEY `FK_e01d18e1c4884655561785cca80`;

-- DropForeignKey
ALTER TABLE `profile_wall` DROP FOREIGN KEY `FK_2dafd95532ee5d6dac6a7c590f6`;

-- DropForeignKey
ALTER TABLE `profile_wall_replies` DROP FOREIGN KEY `FK_5303ba06dd6bb7b476d29d08e08`;

-- DropForeignKey
ALTER TABLE `user_groups` DROP FOREIGN KEY `user_groups_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user_jobs` DROP FOREIGN KEY `user_jobs_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user_permissions` DROP FOREIGN KEY `user_permissions_ibfk_1`;

-- DropIndex
DROP INDEX `FK_adfe13459283a2557815dd324ed` ON `forum_message_replies`;

-- DropIndex
DROP INDEX `FK_d666a9fde168dc3dbed5e31bf8f` ON `forum_message_replies`;

-- DropIndex
DROP INDEX `FK_3bcdc4c5bac35457101c5c8c210` ON `forum_messages`;

-- DropIndex
DROP INDEX `FK_9a56eaee984340cdc2ff1b383df` ON `forum_topic_replies`;

-- DropIndex
DROP INDEX `REL_e01d18e1c4884655561785cca8` ON `forum_user`;

-- DropIndex
DROP INDEX `IDX_8fc517f51e047d7a32214e04be` ON `forum_verify`;

-- DropIndex
DROP INDEX `forum_verify_verify_code_key` ON `forum_verify`;

-- DropIndex
DROP INDEX `FK_2dafd95532ee5d6dac6a7c590f6` ON `profile_wall`;

-- DropIndex
DROP INDEX `FK_5303ba06dd6bb7b476d29d08e08` ON `profile_wall_replies`;

-- DropIndex
DROP INDEX `IDX_7528958a5a4f9879864f44a108` ON `user`;

-- DropIndex
DROP INDEX `group_id` ON `user_groups`;

-- DropIndex
DROP INDEX `job_id` ON `user_jobs`;

-- DropIndex
DROP INDEX `user_id` ON `user_permissions`;

-- AlterTable
ALTER TABLE `forum_message_replies` DROP COLUMN `messageIdId`,
    DROP COLUMN `recieverId`,
    ADD COLUMN `messageId` INTEGER NULL,
    ADD COLUMN `receiverId` INTEGER NULL;

-- AlterTable
ALTER TABLE `forum_messages` DROP COLUMN `recieverId`,
    ADD COLUMN `receiverId` INTEGER NULL;

-- AlterTable
ALTER TABLE `forum_navigation` DROP COLUMN `full_link`,
    DROP COLUMN `team_link`,
    ADD COLUMN `fullLink` LONGTEXT NOT NULL,
    ADD COLUMN `teamLink` TINYINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `forum_topic_replies` DROP COLUMN `topicIdId`,
    ADD COLUMN `topicId` INTEGER NULL;

-- AlterTable
ALTER TABLE `forum_user` DROP COLUMN `avatar_url`,
    DROP COLUMN `banner_url`,
    DROP COLUMN `user_id`,
    ADD COLUMN `avatarUrl` LONGTEXT NOT NULL DEFAULT 'default.png',
    ADD COLUMN `bannerUrl` LONGTEXT NOT NULL DEFAULT 'default.png',
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `forum_verify` DROP COLUMN `forum_id`,
    DROP COLUMN `verify_code`,
    ADD COLUMN `forumId` INTEGER NOT NULL,
    ADD COLUMN `verifyCode` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `groups` DROP COLUMN `high_team`,
    ADD COLUMN `highTeam` TINYINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `permission_activated`,
    ADD COLUMN `permissionActivated` TINYINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `profile_wall` DROP COLUMN `profileIdId`,
    ADD COLUMN `profileId` INTEGER NULL;

-- AlterTable
ALTER TABLE `profile_wall_replies` DROP COLUMN `postIdId`,
    ADD COLUMN `postId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `first_joined`,
    DROP COLUMN `forum_id`,
    DROP COLUMN `last_joined`,
    ADD COLUMN `firstJoined` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `forumId` INTEGER NULL,
    ADD COLUMN `lastJoined` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

-- AlterTable
ALTER TABLE `user_groups` DROP COLUMN `group_id`,
    ADD COLUMN `groupId` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user_jobs` DROP COLUMN `job_id`,
    ADD COLUMN `jobId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user_permissions` DROP COLUMN `permission_activated`,
    DROP COLUMN `user_id`,
    ADD COLUMN `permissionActivated` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user_tags` DROP COLUMN `tag_id`,
    ADD COLUMN `tagId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `FK_adfe13459283a2557815dd324ed` ON `forum_message_replies`(`messageId`);

-- CreateIndex
CREATE INDEX `FK_d666a9fde168dc3dbed5e31bf8f` ON `forum_message_replies`(`receiverId`);

-- CreateIndex
CREATE INDEX `FK_3bcdc4c5bac35457101c5c8c210` ON `forum_messages`(`receiverId`);

-- CreateIndex
CREATE INDEX `FK_9a56eaee984340cdc2ff1b383df` ON `forum_topic_replies`(`topicId`);

-- CreateIndex
CREATE UNIQUE INDEX `REL_e01d18e1c4884655561785cca8` ON `forum_user`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `IDX_8fc517f51e047d7a32214e04be` ON `forum_verify`(`forumId`);

-- CreateIndex
CREATE UNIQUE INDEX `forum_verify_verifyCode_key` ON `forum_verify`(`verifyCode`(255));

-- CreateIndex
CREATE INDEX `FK_2dafd95532ee5d6dac6a7c590f6` ON `profile_wall`(`profileId`);

-- CreateIndex
CREATE INDEX `FK_5303ba06dd6bb7b476d29d08e08` ON `profile_wall_replies`(`postId`);

-- CreateIndex
CREATE UNIQUE INDEX `IDX_7528958a5a4f9879864f44a108` ON `user`(`forumId`);

-- CreateIndex
CREATE INDEX `group_id` ON `user_groups`(`groupId`);

-- CreateIndex
CREATE INDEX `job_id` ON `user_jobs`(`jobId`);

-- CreateIndex
CREATE INDEX `user_id` ON `user_permissions`(`userId`);

-- AddForeignKey
ALTER TABLE `forum_message_replies` ADD CONSTRAINT `FK_adfe13459283a2557815dd324ed` FOREIGN KEY (`messageId`) REFERENCES `forum_messages`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_message_replies` ADD CONSTRAINT `FK_d666a9fde168dc3dbed5e31bf8f` FOREIGN KEY (`receiverId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_messages` ADD CONSTRAINT `FK_3bcdc4c5bac35457101c5c8c210` FOREIGN KEY (`receiverId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_topic_replies` ADD CONSTRAINT `FK_9a56eaee984340cdc2ff1b383df` FOREIGN KEY (`topicId`) REFERENCES `forum_topics`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forum_user` ADD CONSTRAINT `FK_e01d18e1c4884655561785cca80` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profile_wall` ADD CONSTRAINT `FK_2dafd95532ee5d6dac6a7c590f6` FOREIGN KEY (`profileId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profile_wall_replies` ADD CONSTRAINT `FK_5303ba06dd6bb7b476d29d08e08` FOREIGN KEY (`postId`) REFERENCES `profile_wall`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_groups` ADD CONSTRAINT `user_groups_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `groups`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_jobs` ADD CONSTRAINT `user_jobs_ibfk_1` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_permissions` ADD CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
