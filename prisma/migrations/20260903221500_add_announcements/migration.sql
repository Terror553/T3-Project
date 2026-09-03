CREATE TABLE `announcements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `published` TINYINT NOT NULL DEFAULT 1,
    `authorId` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    INDEX `announcements_authorId_idx`(`authorId`),
    INDEX `announcements_published_idx`(`published`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `announcements`
    ADD CONSTRAINT `announcements_authorId_fkey`
    FOREIGN KEY (`authorId`) REFERENCES `forum_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
