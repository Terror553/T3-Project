CREATE TABLE `forum_reply_labels` (
    `replyId` INTEGER NOT NULL,
    `labelId` INTEGER NOT NULL,
    PRIMARY KEY (`replyId`, `labelId`),
    INDEX `forum_reply_labels_labelId_idx`(`labelId`),
    CONSTRAINT `forum_reply_labels_replyId_fkey`
      FOREIGN KEY (`replyId`) REFERENCES `forum_topic_replies`(`id`)
      ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT `forum_reply_labels_labelId_fkey`
      FOREIGN KEY (`labelId`) REFERENCES `forum_labels`(`id`)
      ON DELETE CASCADE ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
