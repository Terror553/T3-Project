-- Create test users with forum accounts
INSERT INTO
    `forum_user` (
        `username`,
        `email`,
        `password`,
        `salt`,
        `signature`,
        `roleId`
    )
VALUES
    (
        'user1',
        'user1@example.com',
        'hashedpassword123',
        'salt123',
        'Signature for user 1',
        12
    ),
    (
        'user2',
        'user2@example.com',
        'hashedpassword123',
        'salt123',
        'Signature for user 2',
        12
    ),
    (
        'user3',
        'user3@example.com',
        'hashedpassword123',
        'salt123',
        'Signature for user 3',
        12
    ),
    (
        'user4',
        'user4@example.com',
        'hashedpassword123',
        'salt123',
        'Signature for user 4',
        12
    ),
    (
        'user5',
        'user5@example.com',
        'hashedpassword123',
        'salt123',
        'Signature for user 5',
        12
    ),
    (
        'user6',
        'user6@example.com',
        'hashedpassword123',
        'salt123',
        'Signature for user 6',
        12
    ),
    (
        'user7',
        'user7@example.com',
        'hashedpassword123',
        'salt123',
        'Signature for user 7',
        12
    ),
    (
        'user8',
        'user8@example.com',
        'hashedpassword123',
        'salt123',
        'Signature for user 8',
        12
    ),
    (
        'user9',
        'user9@example.com',
        'hashedpassword123',
        'salt123',
        'Signature for user 9',
        12
    ),
    (
        'user10',
        'user10@example.com',
        'hashedpassword123',
        'salt123',
        'Signature for user 10',
        12
    );

-- Create forum categories
INSERT INTO
    `forum_category` (`name`)
VALUES
    ('Announcements'),
    ('General Discussion'),
    ('Support'),
    ('Off-Topic');

-- Create forum subcategories
INSERT INTO
    `forum_subcategory` (
        `name`,
        `description`,
        `status`,
        `categoryId`,
        `slug`
    )
VALUES
    ('News', 'Latest server news', 1, 1, 'news'),
    ('Updates', 'Server updates', 1, 1, 'updates'),
    ('Chat', 'General chat', 1, 2, 'chat'),
    ('Help', 'Get help here', 1, 3, 'help'),
    ('Bugs', 'Report bugs here', 1, 3, 'bugs');

-- Create forum topics
INSERT INTO
    `forum_topics` (
        `title`,
        `content`,
        `authorId`,
        `subcategoryId`,
        `slug`
    )
VALUES
    (
        'Welcome to the Server!',
        'Welcome to our Minecraft server!',
        32,
        16,
        'welcome-to-server'
    ),
    (
        'Server Rules',
        'Please read our server rules',
        33,
        17,
        'server-rules'
    ),
    (
        'How to Get Started',
        'Guide for new players',
        34,
        18,
        'how-to-get-started'
    ),
    (
        'Known Issues',
        'List of known issues',
        35,
        18,
        'known-issues'
    ),
    (
        'Introduce Yourself',
        'New player introductions',
        36,
        19,
        'introduce-yourself'
    ),
    (
        'Suggestions',
        'Share your suggestions',
        37,
        20,
        'suggestions'
    ),
    (
        'Bug Report Template',
        'How to report bugs',
        34,
        17,
        'bug-report-template'
    ),
    (
        'Event Calendar',
        'Upcoming server events',
        35,
        20,
        'event-calendar'
    ),
    (
        'Staff Applications',
        'Apply for staff position',
        42,
        16,
        'staff-applications'
    ),
    (
        'Server Updates Log',
        'History of updates',
        42,
        17,
        'server-updates-log'
    );

-- Create topic replies
INSERT INTO
    `forum_topic_replies` (`content`, `authorId`, `topicId`)
VALUES
    ('Great post!', 32, 11),
    ('Thanks for sharing', 33, 12),
    ('I agree with this', 34, 13),
    ('Very helpful information', 35, 14),
    ('Looking forward to more updates', 36, 15),
    ('This helped me a lot', 37, 16),
    ('Good to know', 38, 17),
    ('Thanks for explaining', 39, 18),
    ('I will try this out', 42, 19),
    ('Keep up the good work', 32, 20),
    ('Excellent guide', 33, 11),
    ('This is useful', 34, 12),
    ('I have a question about this', 35, 13),
    ('Could you clarify something?', 36, 14),
    ('Great initiative', 37, 15),
    ('I like this idea', 38, 16),
    ('This is a good start', 39, 17),
    ('I have some suggestions', 42, 18),
    ('Thanks for the update', 42, 19)
    -- Create reaction emojis
INSERT INTO
    `forum_reaction_emojis` (`emoji`, `name`, `negative`, `authorId`)
VALUES
    ('👍', 'thumbs_up', 0, 1),
    ('👎', 'thumbs_down', 1, 1),
    ('❤️', 'heart', 0, 1),
    ('😄', 'smile', 0, 1);

-- Create wiki categories
INSERT INTO
    `wiki_categories` (`name`, `content`, `icon`, `authorId`)
VALUES
    (
        'Getting Started',
        'Welcome to the server wiki',
        'fa fa-book',
        42
    ),
    (
        'Game Mechanics',
        'Learn about our custom features',
        'fa fa-cogs',
        42
    ),
    (
        'Rules and Guidelines',
        'Server rules and guidelines',
        'fa fa-gavel',
        42
    ),
    (
        'FAQ',
        'Frequently asked questions',
        'fa fa-question-circle',
        42
    );

-- Create wiki subcategories
INSERT INTO
    `wiki_sub_categories` (
        `name`,
        `content`,
        `categoryId`,
        `authorId`,
        `icon`
    )
VALUES
    (
        'New Player Guide',
        'Guide for new players',
        6,
        42,
        'fa fa-star'
    ),
    (
        'Basic Commands',
        'List of basic commands',
        7,
        42,
        'fa fa-terminal'
    ),
    (
        'Custom Items',
        'Guide to custom items',
        8,
        32,
        'fa fa-diamond'
    ),
    (
        'Economy System',
        'How the economy works',
        9,
        34,
        'fa fa-money'
    ),
    (
        'Server Rules',
        'Detailed server rules',
        6,
        36,
        'fa fa-list'
    ),
    (
        'Building Rules',
        'Rules for building',
        7,
        35,
        'fa fa-building'
    ),
    (
        'Common Questions',
        'Most asked questions',
        8,
        42,
        'fa fa-info-circle'
    ),
    (
        'Technical Issues',
        'Common technical problems',
        7,
        42,
        'fa fa-wrench'
    );

-- Create forum messages
INSERT INTO
    `forum_messages` (`title`, `message`, `senderId`, `receiverId`)
VALUES
    (
        'Welcome Message',
        'Welcome to the server!',
        34,
        32
    ),
    (
        'Question about rules',
        'Can you explain rule #3?',
        32,
        42
    ),
    (
        'Event participation',
        'Are you joining the event?',
        36,
        42
    ),
    (
        'Build team application',
        'I would like to join the build team',
        37,
        42
    ),
    (
        'Server suggestion',
        'I have an idea for the server',
        34,
        42
    ),
    ('Help request', 'Need help with a plugin', 36, 42),
    (
        'Collaboration request',
        'Want to work on a project?',
        35,
        42
    ),
    ('Bug report', 'Found a bug in the shop', 34, 42),
    (
        'Staff application',
        'Interested in becoming staff',
        39,
        42
    ),
    (
        'Thank you message',
        'Thanks for your help!',
        34,
        42
    );

-- Create profile wall posts
INSERT INTO
    `profile_wall` (`content`, `userId`, `profileId`)
VALUES
    ('Great player to team with!', 42, 34),
    ('Thanks for the help yesterday', 42, 34),
    ('Nice base you built!', 42, 32),
    ('Thanks for trading', 32, 42),
    ('Good game yesterday', 34, 42),
    ('Welcome to the server', 36, 42),
    ('Thanks for the tour', 35, 42),
    ('Great shop prices', 37, 42),
    ('Nice meeting you', 38, 37),
    ('Looking forward to more events', 39, 42);