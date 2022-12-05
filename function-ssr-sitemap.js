var parse_modified_time = (modified_time)=>{
	var date = new Date(modified_time);

	var DD = String(date.getDate()).padStart(2, '0');
	var MM = String(date.getMonth() + 1).padStart(2, '0');
	var yyyy = date.getFullYear();

	return `${yyyy}-${MM}-${DD}`;
}

var last_generate = 0;
var last_info = "";

var get_post_info = ()=>{
	var now = new Date().getTime();
	if (now - last_generate > 86400000) {
		last_generate = now;
		last_info = ""; 
		var posts = query_posts({
			post_type: "article",
			status: "publish",
			posts_per_page: 999,
		});
		var home_url = get_option('nv_home_url','');
		
		posts.data.forEach(post=>{
			last_info += `<url>`;
			last_info += `<loc>${home_url}/${post.slug}</loc>`
			last_info += `<lastmod>${ parse_modified_time(post.modified_time) }</lastmod>`
			last_info += `<changefreq>weekly</changefreq>`
			last_info += `<priority>1.0</priority>`
			last_info += `</url>`
		})
	}

	return last_info;
}

module.exports = ({echo})=>{
	echo(`<?xml version="1.0" encoding="utf-8"?>`);
	echo(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);

	echo( get_post_info() );

	echo(`</urlset>`);
}