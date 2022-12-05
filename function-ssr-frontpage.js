var show_post_list = ()=>{
	var home_url = get_option('nv_home_url',"");
	return query_posts({
		post_type: 'article',
	})
	.data.map(post=>{
		var thumbnail_url = get_post_meta(post.id,"_nv_thumbnail");
		return `<li><a href="${home_url}/${post.slug}">${thumbnail_url ? `<img src='${thumbnail_url}' />` : ""}<h4>${post.title}</h4></a></li>`;
	})
	.join('')
}

module.exports = ({echo})=>{
	var site_name = get_option('nv_site_name','nvPress');
	var site_description = get_option('nv_site_description','');
	var title = `${site_name} - ${site_description}`;

	require('./function-ssr-header')({echo,title});

	echo(`
	<h1>${site_name}</h1>
	<h2>${site_description}</h2>
	<hr>
	<h3>近期文章</h3>
	<ul>
		${show_post_list()}	
	</ul>
	`);
	
	require('./function-ssr-footer')({echo});
}