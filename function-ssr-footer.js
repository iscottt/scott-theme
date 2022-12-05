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
	echo(`<aside>
			<h4>近期文章</h4>
			<ul>${show_post_list()}</ul>
		</aside>`);
	echo(`</noscript></div></body></html>`);
}