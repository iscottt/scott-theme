// 首页相关
var path = require('path');
var fs = require('fs');

// post作为card显示的最小化数据。全局通用
global.nirvana_lite_post = (post)=>{
	return {
		id: post.id,
		title: post.title,
		slug: post.slug,
		modified_time: post.modified_time,
		views: get_post_meta(post.id,'views') || 0,
		likes: get_post_meta(post.id,'likes') || 0,
		comments: post.comment_count,
		thumbnail: get_the_post_thumbnail_url(post.id),
		categories: nv_get_object_terms(post.id, 'category')
					.map(term=>term.name),
		tags: nv_get_object_terms(post.id, 'tag')
					.map(term=>term.name),
	}
}

// 首页最新文章 && 首页滚动图（前端自己从里面随机5个出来显示）
var get_home_recent_articles = ()=>{
	var posts = query_posts({
		post_type: 'article',
		status: 'publish',
		posts_per_page: 12,
	});

	return posts.data.map(post=>nirvana_lite_post(post))
}

// 首页分类展示
var get_home_categories = ()=>{
	var cats = get_option('niRvana_frontpage_categories',[]);

	var termSlugs = {};
	query_terms({
		include: cats.map(({termId})=>termId[0]),
		terms_per_page: 99,
	})
	.data
	.forEach(term=>{
		termSlugs[term.id] = term.slug
	})

	return cats.map(({termId,title})=>{
		var posts = query_posts({
			post_type: 'article',
			status: 'publish',
			tax_query: {
				opts: [{
					taxonomy: "category", //必填
					terms: termId,
					operator: "IN"
				}]
			},
			posts_per_page: 5,
		})
		return {
			slug: termSlugs[termId[0]],
			title,
			posts: posts.data.map(post=>nirvana_lite_post(post)),
		}
	})
}

register_rest_route('nirvana','home',{
	methods: 'post',
	callback(data,req) {
		return {
			recent_articles: get_home_recent_articles(),
			categories: get_home_categories(),
		};
	}
});