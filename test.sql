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
        1,
        1,
        'welcome-to-server'
    ),
    (
        'Server Rules',
        'Please read our server rules',
        1,
        1,
        'server-rules'
    ),
    (
        'How to Get Started',
        'Guide for new players',
        2,
        3,
        'how-to-get-started'
    ),
    (
        'Known Issues',
        'List of known issues',
        3,
        5,
        'known-issues'
    ),
    (
        'Introduce Yourself',
        'New player introductions',
        4,
        3,
        'introduce-yourself'
    ),
    (
        'Suggestions',
        'Share your suggestions',
        5,
        2,
        'suggestions'
    ),
    (
        'Bug Report Template',
        'How to report bugs',
        1,
        5,
        'bug-report-template'
    ),
    (
        'Event Calendar',
        'Upcoming server events',
        2,
        1,
        'event-calendar'
    ),
    (
        'Staff Applications',
        'Apply for staff position',
        1,
        1,
        'staff-applications'
    ),
    (
        'Server Updates Log',
        'History of updates',
        1,
        2,
        'server-updates-log'
    );

-- Create topic replies
INSERT INTO
    `forum_topic_replies` (`content`, `authorId`, `topicIdId`)
VALUES
    ('Great post!', 2, 1),
    ('Thanks for sharing', 3, 1),
    ('I agree with this', 4, 2),
    ('Very helpful information', 5, 3),
    ('Looking forward to more updates', 6, 4),
    ('This helped me a lot', 7, 5),
    ('Good to know', 8, 6),
    ('Thanks for explaining', 9, 7),
    ('I will try this out', 10, 8),
    ('Keep up the good work', 2, 9),
    ('Excellent guide', 3, 10),
    ('This is useful', 4, 1),
    ('I have a question about this', 5, 2),
    ('Could you clarify something?', 6, 3),
    ('Great initiative', 7, 4),
    ('I found a similar issue', 8, 5),
    ('Let me know if you need help', 9, 6),
    ('I support this idea', 10, 7),
    ('Looking forward to participating', 2, 8),
    ('Count me in', 3, 9);

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
        1
    ),
    (
        'Game Mechanics',
        'Learn about our custom features',
        'fa fa-cogs',
        1
    ),
    (
        'Rules and Guidelines',
        'Server rules and guidelines',
        'fa fa-gavel',
        1
    ),
    (
        'FAQ',
        'Frequently asked questions',
        'fa fa-question-circle',
        1
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
        1,
        1,
        'fa fa-star'
    ),
    (
        'Basic Commands',
        'List of basic commands',
        1,
        1,
        'fa fa-terminal'
    ),
    (
        'Custom Items',
        'Guide to custom items',
        2,
        1,
        'fa fa-diamond'
    ),
    (
        'Economy System',
        'How the economy works',
        2,
        1,
        'fa fa-money'
    ),
    (
        'Server Rules',
        'Detailed server rules',
        3,
        1,
        'fa fa-list'
    ),
    (
        'Building Rules',
        'Rules for building',
        3,
        1,
        'fa fa-building'
    ),
    (
        'Common Questions',
        'Most asked questions',
        4,
        1,
        'fa fa-info-circle'
    ),
    (
        'Technical Issues',
        'Common technical problems',
        4,
        1,
        'fa fa-wrench'
    );

-- Create forum messages
INSERT INTO
    `forum_messages` (`title`, `message`, `senderId`, `recieverId`)
VALUES
    ('Welcome Message', 'Welcome to the server!', 1, 2),
    (
        'Question about rules',
        'Can you explain rule #3?',
        2,
        1
    ),
    (
        'Event participation',
        'Are you joining the event?',
        3,
        4
    ),
    (
        'Build team application',
        'I would like to join the build team',
        4,
        1
    ),
    (
        'Server suggestion',
        'I have an idea for the server',
        5,
        1
    ),
    ('Help request', 'Need help with a plugin', 6, 1),
    (
        'Collaboration request',
        'Want to work on a project?',
        7,
        8
    ),
    ('Bug report', 'Found a bug in the shop', 8, 1),
    (
        'Staff application',
        'Interested in becoming staff',
        9,
        1
    ),
    (
        'Thank you message',
        'Thanks for your help!',
        10,
        1
    );

-- Create profile wall posts
INSERT INTO
    `profile_wall` (`content`, `userId`, `profileIdId`)
VALUES
    ('Great player to team with!', 2, 1),
    ('Thanks for the help yesterday', 3, 2),
    ('Nice base you built!', 4, 3),
    ('Thanks for trading', 5, 4),
    ('Good game yesterday', 6, 5),
    ('Welcome to the server', 7, 6),
    ('Thanks for the tour', 8, 7),
    ('Great shop prices', 9, 8),
    ('Nice meeting you', 10, 9),
    ('Looking forward to more events', 1, 10);