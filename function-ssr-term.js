module.exports = ({echo,term_id,taxonomy,term_slug,current_page})=>{
	var home_url = get_option('nv_home_url',"");
	var site_name = get_option('nv_site_name','nvPress');
	var term = nvdb.terms.find(r=>r.id == term_id)[0];
	var title = `${term.name} - ${site_name}`;

	var posts = query_posts({
		post_type: 'article',
		status: 'publish',
		tax_query: {
			opts: [{
				taxonomy,
				terms: [term_id],
			}]
		},
		current_page,
		posts_per_page: get_option('niRvana_posts_per_page',10)
	});

	var {posts_per_page, total} = posts.pagination;

	require('./function-ssr-header')({echo,title,description: `欢迎光临${site_name}，您当前浏览的分类是：${term.name}，该分类共${total}篇文章，每页${posts_per_page}篇。`});
	echo(`<h1>文章分类：${term.name}</h1>`);

	

	var post_list_dom = posts.data
						.map(post=>{
							var thumbnail_url = get_post_meta(post.id,"_nv_thumbnail");
							return `<li><a href="${home_url}/${post.slug}">${thumbnail_url ? `<img src='${thumbnail_url}' />` : ""}<h4>${post.title}</h4></a></li>`;
						})
						.join('');

	echo(`<ul>${post_list_dom}</ul>`);

	if (current_page > 1) {
		if (current_page==2) {
			echo(`<a rel="prev" href="${home_url}/${taxonomy}/${term_slug}">上一页</a>`);
		} else {
			echo(`<a rel="prev" href="${home_url}/${taxonomy}/${term_slug}/page/${current_page-1}">上一页</a>`);
		}
	}
	if (current_page < Math.ceil( total / posts_per_page ) ) {
		echo(`<a rel="next" href="${home_url}/${taxonomy}/${term_slug}/page/${current_page+1}">下一页</a>`);
	}

	require('./function-ssr-footer')({echo});
}