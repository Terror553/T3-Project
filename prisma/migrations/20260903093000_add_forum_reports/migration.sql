CREATE TABLE `forum_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` TEXT NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'open',
    `reporterId` INTEGER NOT NULL,
    `topicId` INTEGER NULL,
    `replyId` INTEGER NULL,
    `reviewedBy` INTEGER NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    INDEX `forum_reports_reporterId_idx`(`reporterId`),
    INDEX `forum_reports_topicId_idx`(`topicId`),
    INDEX `forum_reports_replyId_idx`(`replyId`),
    INDEX `forum_reports_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `forum_reports`
    ADD CONSTRAINT `forum_reports_reporterId_fkey`
    FOREIGN KEY (`reporterId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
    ADD CONSTRAINT `forum_reports_topicId_fkey`
    FOREIGN KEY (`topicId`) REFERENCES `forum_topics`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
    ADD CONSTRAINT `forum_reports_replyId_fkey`
    FOREIGN KEY (`replyId`) REFERENCES `forum_topic_replies`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
    ADD CONSTRAINT `forum_reports_reviewedBy_fkey`
    FOREIGN KEY (`reviewedBy`) REFERENCES `forum_user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;
