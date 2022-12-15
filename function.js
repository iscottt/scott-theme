var path = require('path');
var fs = require('fs');

/*
服务器端渲染模式，检测用户UA
	如果是普通浏览器，则返回web/app.html用于SPA
	如果是搜索引擎，则服务端渲染出最简页面，用于索引
*/
set_frontstage_rendering_mode('SSR');
require('./function-ssr.js');

// set_frontstage_rendering_mode('CSR', path.join(__dirname,"./web/") );

add_action('init_express', () => {
  register_static_url('/srcs', path.join(__dirname, './srcs/'));
});

register_posttype('article_microblog', {
  label: '轻博客',
  labels: {
    all_items: '所有轻博客',
    add_new_item: '写轻博客',
  },
  show_ui: true,
  supports: ['editor', 'author', 'title', 'comments', 'excerpt'],
  menu_icon: '<i class="el-icon-chat-round"></i>',
});

register_nav_menus({
  topNav: '顶部菜单',
  catNav: '分类菜单',
});

add_submenu_page({
  parent_slug: 'appearance',
  page_title: '主题设置',
  menu_title: '主题设置',
  menu_slug: 'theme-settings',
  power: 10,
  position: 9,
  component_url: '/srcs/page-settings/index.vue',
});
add_submenu_page({
  parent_slug: 'appearance',
  page_title: '主题设置(Scott)',
  menu_title: '主题设置(Scott)',
  menu_slug: 'scott-settings',
  power: 10,
  position: 10,
  component_url: '/srcs/scott-settings/index.vue',
});

// 使用metabox组件便捷生成
add_meta_box({
  post_types: ['article'],
  meta_box_slug: 'article-metabox-likes',
  content: {
    title: '点赞量',
    items: [
      {
        label: '',
        type: 'InputNumber',
        meta_key: 'likes',
        config: { min: 0, defaultValue: 0 },
      },
    ],
  },
});

add_meta_box({
  post_types: ['article'],
  meta_box_slug: 'article-metabox-views',
  content: {
    title: '阅读量',
    items: [
      {
        label: '',
        type: 'InputNumber',
        meta_key: 'views',
        config: { min: 0, defaultValue: 0 },
      },
    ],
  },
});

add_meta_box({
  post_types: ['page'],
  meta_box_slug: 'page-metabox-banner',
  content: {
    title: '页面头图',
    defaultExpanded: true,
    items: [
      {
        label: '',
        type: 'ThumbnailUploader',
        meta_key: 'banner',
        config: { height: 100 },
      },
    ],
  },
});

register_rest_route('nirvana', 'site-metas', {
  methods: 'post',
  callback(data, req) {
    var opts = get_options([
      'nv_site_name',
      'nv_site_description',
      'nv_date_format',
      'nv_time_format',
      'require_name_email',
      'enable_comment',
      'comment_registration',

      'niRvana_logo_url',
      'niRvana_favicon_32',
      'niRvana_apple_touch_icon',
      'niRvana_copyright',
      'niRvana_footer_links',
      'niRvana_blogger_avatar_url',
      'niRvana_blogger_nickname',
      'niRvana_blogger_description',
      'niRvana_fake_login',

      'scott_reward_links',
      'scott_card_theme',
      'scott_personal_links',
    ]);
    return { ...opts };
  },
});

// 引入其他模块
require('./function-home.js');
require('./function-archive.js');
require('./function-post.js');
require('./function-widgets.js');
require('./function-blocks.js');
require('./function-fontawesome.js');

// 引入自定义模块
var custom_function_file = path.join(__dirname, './custom_functions.js');
if (fs.existsSync(custom_function_file)) {
  require(custom_function_file);
}
