function get_description(post) {
	if (post.excerpt) {
		return post.excerpt;
	}
	return post.content.blocks
	.filter(block=>block.type == 'paragraph')
	.map(block=>block.data.text)
	.join('')
	.substr(0,160);
}

var post_taxonomies = {};
var generate_post_taxonomies = (post) =>{
	var id = post.id;
	//读取这个post对应posttype所注册的所有taxonomy
	var post_taxs = get_taxonomies(post.post_type);
	var taxonomies = { /*taxonomyName: [term]*/ }
	post_taxs.forEach(tax=>{
		var terms = nv_get_object_terms(id, tax.taxonomy);
		taxonomies[tax.taxonomy] = terms;
	})
	post_taxonomies = taxonomies;
}
var show_taxonomies = (home_url)=>{
	var result = "";
	post_taxonomies.category.map(term=>{
		result += `<li><a href="${home_url}/category/${term.slug}">${term.name}</a></li>`
	})
	post_taxonomies.tag.map(term=>{
		result += `<li><a href="${home_url}/tag/${term.slug}">${term.name}</a></li>`
	})
	return result;
}

var show_relate_list = (post,home_url)=>{
	var id = post.id;
	var categoryIDs = post_taxonomies.category.map(term=>term.id);
	var tagIDs = post_taxonomies.tag.map(term=>term.id);

	var posts = query_posts({
		post_type: 'article',
		status: 'publish',
		post_not_in: [id],
		tax_query: {
			relation: 'OR',
			opts: [{
				taxonomy: 'category',
				terms: categoryIDs,
				operator: 'IN'
			},{
				taxonomy: 'tag',
				terms: tagIDs,
				operator: 'IN'
			}]
		},
		orderby: 'rand',
		posts_per_page: 4
	});
	return posts.data.map(post=>{
		var thumbnail_url = get_post_meta(post.id,"_nv_thumbnail");
		return `<li><a href="${home_url}/${post.slug}">${thumbnail_url ? `<img src='${thumbnail_url}' />` : ""}<h4>${post.title}</h4></a></li>`;
	}).join('');
}

module.exports = ({echo,post,post_slug,comment_page})=>{
	var home_url = get_option('nv_home_url',"");
	var site_name = get_option('nv_site_name','nvPress');
	var title = `${post.title} - ${site_name}`;
	var description = get_description(post);
	var thumbnail_url = get_post_meta(post.id,"_nv_thumbnail");
	generate_post_taxonomies(post);
	require('./function-ssr-header')({echo,post,title,description,image:thumbnail_url});
	echo(`<article>`);
	if (thumbnail_url) {
		echo(`<img src='${thumbnail_url}' />`);
	}

	// 有密码时不显示内容
	if (!post.password) {
		require('./function-ssr-block-renderer')({echo,blocks:post.content.blocks});
	}

	echo(`</article>`);

	// 是文章才显示相关文章和标签，页面没有这些，尝试显示反而会出错
	if (post.post_type == 'article') {
		echo(`<aside>
			<h4>标签与分类</h4>
			<ul>${show_taxonomies(home_url)}</ul>
			<h4>相关文章</h4>
			<ul>${show_relate_list(post,home_url)}</ul>
		</aside>`);
	}

	require('./function-ssr-footer')({echo});
}