// 列表页相关
var path = require('path');
var fs = require('fs');

register_rest_route('nirvana','post-list',{
	methods: 'post',
	callback(data,req) {
		var {taxonomy,term_slug,current_page} = data;

		var queryOpt = {
			post_type: 'article',
			status: 'publish',
			posts_per_page: get_option('niRvana_posts_per_page',12),
			current_page,
		};
		// 传了tax和slug才查询，否则就当做全部文章时间线来查
		if (taxonomy && term_slug) {
			queryOpt.tax_query = {
				relation: "AND",
				opts: [
					{
						taxonomy,
						terms: Array.isArray(term_slug) ? term_slug : [term_slug],
						operator: "IN"
					}
				]
			}
		}
		var posts = query_posts(queryOpt);
		return {
			term_names: term_slug
						?
						get_terms({
							taxonomy,
							include: Array.isArray(term_slug) ? term_slug : [term_slug],
						}).map(term=>term.name)
						: [],
			articles: posts.data.map(post=>nirvana_lite_post(post)),
			pagination: posts.pagination
		}
	}
});