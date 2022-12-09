var path = require('path');

// 重写paragraph，以增加fontAwesome功能
register_editor_block('paragraph', ['page', 'article'], '/srcs/block-paragraph/rewrite.js');

register_editor_block('pandastudio/gallery', ['page', 'article'], '/srcs/block-gallery/index.js');
register_editor_block('pandastudio/title', ['page', 'article'], '/srcs/block-title/index.js');
register_editor_block('pandastudio/tip', ['page', 'article'], '/srcs/block-tip/index.js');
register_editor_block('pandastudio/collapse', ['page', 'article'], '/srcs/block-collapse/index.js');
register_editor_block('pandastudio/panel', ['page', 'article'], '/srcs/block-panel/index.js');
register_editor_block('pandastudio/columns', ['page', 'article'], '/srcs/block-columns/index.js');
register_editor_block('pandastudio/download', ['page', 'article'], '/srcs/block-download/index.js');
register_editor_block('scottstudio/timeline', ['page', 'article'], '/srcs/block-timeline/index.js');
