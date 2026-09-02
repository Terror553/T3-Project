CREATE TABLE `upload_metadata` (
    `id` VARCHAR(191) NOT NULL,
    `fileName` TEXT NOT NULL,
    `contentType` TEXT NOT NULL,
    `size` INTEGER NOT NULL,
    `publicUrl` TEXT NOT NULL,
    `storagePath` TEXT NOT NULL,
    `ownerUserId` INTEGER NULL,
    `attachToType` VARCHAR(100) NULL,
    `attachToId` INTEGER NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `upload_metadata_ownerUserId_idx`(`ownerUserId`),
    INDEX `upload_metadata_attachToType_attachToId_idx`(`attachToType`, `attachToId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `upload_metadata`
    ADD CONSTRAINT `upload_metadata_ownerUserId_fkey`
    FOREIGN KEY (`ownerUserId`) REFERENCES `forum_user`(`id`)
    ON DELETE SET NULL ON UPDATE NO ACTION;
