// 列表页相关
var path = require('path');
var fs = require('fs');


// 大家喜欢
register_rest_route('nirvana','most-likes',{
	methods: 'post',
	callback(data,req) {
		var posts = query_posts({
			post_type: 'article',
			status: 'publish',
			orderby: 'likes',
			meta_query: {
				relation: "AND",
				opts: [{
					key: 'likes'
				}]
			},
			posts_per_page: 3
		});
		return posts.data.map(post=>nirvana_lite_post(post));
	}
});

// 热评文章
register_rest_route('nirvana','most-comments',{
	methods: 'post',
	callback(data,req) {
		var posts = query_posts({
			post_type: 'article',
			status: 'publish',
			orderby: 'comment_count',
			posts_per_page: 3
		});
		return posts.data.map(post=>nirvana_lite_post(post));
	}
});