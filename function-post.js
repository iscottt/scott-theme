// 列表页相关
var path = require('path');
var fs = require('fs');

// 查询朋友圈列表
register_rest_route('nirvana', 'moment-post', {
  methods: 'post',
  callback(data, req) {
    const { page = 1, pageSize = 10 } = data;
    var posts = query_posts({
      post_type: 'article_microblog',
      status: 'publish',
      orderby: 'rand',
      current_page: page,
      posts_per_page: pageSize,
      tax_query: {
        relation: 'AND',
        opts: [
          {
            taxonomy: 'article_microblog_category',
            terms: [23],
            operator: 'IN',
          },
        ],
      },
    });
    return posts.data.map((post) => get_post(post.id));
  },
});
// 查询随笔列表
register_rest_route('nirvana', 'micro-post', {
  methods: 'post',
  callback(data, req) {
    var posts = query_posts({
      post_type: 'article_microblog',
      status: 'publish',
      orderby: 'rand',
      tax_query: {
        relation: 'AND',
        opts: [
          {
            taxonomy: 'article_microblog_category',
            terms: [22],
            operator: 'IN',
          },
        ],
      },
      posts_per_page: 4,
    });
    return posts.data.map((post) => get_post(post.id));
  },
});
register_rest_route('nirvana', 'relate-post', {
  methods: 'post',
  callback(data, req) {
    var { id, categoryIDs, tagIDs } = data;
    var posts = query_posts({
      post_type: 'article',
      status: 'publish',
      post_not_in: [id],
      tax_query: {
        relation: 'OR',
        opts: [
          {
            taxonomy: 'category',
            terms: categoryIDs,
            operator: 'IN',
          },
          {
            taxonomy: 'tag',
            terms: tagIDs,
            operator: 'IN',
          },
        ],
      },
      orderby: 'rand',
      posts_per_page: 4,
    });
    return posts.data.map((post) => nirvana_lite_post(post));
  },
});

register_rest_route('nirvana', 'post-like', {
  methods: 'post',
  callback(data, req) {
    var { id } = data;
    var likes = get_post_meta(id, 'likes') || 0;
    likes = parseInt(likes + 1) || 1;
    update_post_meta(id, 'likes', likes);
    return likes;
  },
});

register_rest_route('nirvana', 'post-view', {
  methods: 'post',
  callback(data, req) {
    var { id } = data;
    var views = get_post_meta(id, 'views') || 0;
    views = parseInt(views + 1) || 1;
    update_post_meta(id, 'views', views);
    return views;
  },
});

// 不用自带的get-post原因：需要对文章结果进行处理。以实现评论后可见
register_rest_route('nirvana', 'get-post', {
  methods: 'post',
  callback(data, req) {
    var { id, slug, password } = data;
    if (!(id || slug)) {
      return new NV_Error('参数错误');
    }

    var post = get_post(id || slug);
    if (is_nv_error(post)) {
      return post;
    }

    id = post.id;
    slug = post.slug;

    //读取这个post对应posttype所注册的所有taxonomy
    var post_taxs = get_taxonomies(post.post_type);
    var taxonomies = {
      /*taxonomyName: [term_ids]*/
    };
    post_taxs.forEach((tax) => {
      var terms = nv_get_object_terms(id, tax.taxonomy);
      taxonomies[tax.taxonomy] = terms.map((term) => {
        delete term.taxonomy;
        return term;
      });
    });

    var result = {
      require_password: false,
      is_preview: false,
      ...post,
      author_name: get_user_by_id(post.author).name || '',
      metas: get_post_meta(id),
      taxonomies,
    };

    // 如果文章是未发布状态(不含私有)，那么必须是作者本人或者编辑以上才可以预览显示。
    if (['pending', 'draft'].includes(post.status) || post.modified_time > Date.now()) {
      var user = get_user_by_nonce(req.headers.nvnonce);
      var currentUserPower = user.power || 0;
      if (post.author == user.id || currentUserPower >= 8) {
        //预览模式
        result.title = `预览：${result.title}`;
        result.is_preview = true;
      } else {
        //禁止访问
        return new NV_Error('文章禁止访问');
      }
    }

    // 有密码时必须提供密码才可以访问
    if (post.password.length > 0 && password !== post.password) {
      result.content = null;
      result.require_password = true;
    } else {
      // 前台文章内容过滤器
      result.content = apply_filters('get_the_content', result.content, post);
    }

    delete result.password;

    // 对文章进行处理，评论后可见
    // 首先读取用户信息，如果req里面是已注册用户，那就读取用户email，如果不是，那就读取传来的email
    var current_user_email = get_user_by_nonce(req.headers.nvnonce).email || data.email;
    var is_current_user_replied = current_user_email
      ? query_comments({
          email: current_user_email,
          post: post.id,
        }).pagination.total
      : false;
    // 处理文章 content
    result.content.blocks.forEach((block) => {
      if (block.type == 'pandastudio/download') {
        if (block.data.need_reply && !is_current_user_replied) {
          block.data.url = '';
          block.data.links.forEach((link) => {
            link.url = '';
          });
        } else {
          block.data.need_reply = false;
        }
      }
    });

    return result;
  },
});

register_rest_route('nirvana', 'post-view', {
  methods: 'post',
  callback(data, req) {
    var { id } = data;
    var views = get_post_meta(id, 'views') || 0;
    views = parseInt(views + 1) || 1;
    update_post_meta(id, 'views', views);
    return views;
  },
});
