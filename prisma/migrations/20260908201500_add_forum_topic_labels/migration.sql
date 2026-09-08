CREATE TABLE `forum_topic_labels` (
    `topicId` INTEGER NOT NULL,
    `labelId` INTEGER NOT NULL,
    PRIMARY KEY (`topicId`, `labelId`),
    INDEX `forum_topic_labels_labelId_idx`(`labelId`),
    CONSTRAINT `forum_topic_labels_topicId_fkey`
      FOREIGN KEY (`topicId`) REFERENCES `forum_topics`(`id`)
      ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT `forum_topic_labels_labelId_fkey`
      FOREIGN KEY (`labelId`) REFERENCES `forum_labels`(`id`)
      ON DELETE CASCADE ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
