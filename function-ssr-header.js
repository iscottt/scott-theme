var fs = require('fs');
var path = require('path');

var show_category_list = (home_url)=>{
	return query_terms({
		taxonomy: 'category',
	}).map(cat=>{
		return ` | <a href="${home_url}/category/${cat.slug}">${cat.name}</a>`
	})
	.join('');
}

var theme_scripts_and_styles = fs.readFileSync( path.join(__dirname,"./web/application.html")  );

var parse_date = timestamp => {
　　var timestr = new Date(timestamp);
　　var year = timestr.getFullYear();
　　var month = timestr.getMonth()+1;
　　var date = timestr.getDate();
	return `${year}-${month}-${date}`;
}

var parse_image_url = url=>{
	if (!url) {return url}
	if (url.substr(0,4) == "http" || url.substr(0,2) == "//") {
		return url;
	} else {
		return get_option('nv_home_url',"") + url;
	}
}

var create_og = (property,content)=>`<meta property="${property}" content="${content}"/>`;
var open_graph_protocol = ({post,site_name,description,image,home_url})=>{
	if (!post) {return ""}
	var og = `<meta name="Author" content="${site_name}" />
	<meta name="Owner" content="${site_name}" />
	`;
	og += create_og("og:type","article");
	og += create_og("og:locale","zh-CN");
	og += create_og("og:site_name",site_name);
	og += create_og("og:title",post.title);
	og += create_og("og:description",esc_html(strip_tags(description)) );
	og += create_og("og:url",home_url+"/"+post.slug);
	og += create_og("og:image", image );
	og += create_og("og:release_date", parse_date(post.created_time) );
	og += create_og("article:author", `${site_name},${site_name}` );
	og += create_og("article:published_first", `${site_name},${home_url+"/"+post.slug}` );

	og += `<link rel="canonical" href="${home_url+"/"+post.slug}" />`
	return og;
}

module.exports = ({title,post,echo,image,description})=>{
	var home_url = get_option('nv_home_url',"");
	var site_name = get_option('nv_site_name','nvPress');
	var description = description || `欢迎光临 ${site_name}，${get_option('nv_site_description','')}`;
	var logo = parse_image_url(get_option('niRvana_logo_url'));
	var favicon = parse_image_url(get_option('niRvana_favicon_32'));
	var apple_touch_icon = parse_image_url(get_option('niRvana_apple_touch_icon'));
	image = parse_image_url(image);
	echo(`
<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="UTF-8">
	<title>${esc_html(title)}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,viewport-fit=cover">
	<meta description="${esc_html(strip_tags(description))}">
	<meta itemprop="name" content="${esc_html(title)}" />
	<meta itemprop="image" content="${image || apple_touch_icon || favicon || logo}" />
	<meta name="description" itemprop="description" content="${esc_html(strip_tags(description))}">
	${open_graph_protocol({post,site_name,description,image,home_url})}
	${favicon ? `<link rel="shortcut icon" href="${favicon}" sizes="32x32">` : ''}
	${apple_touch_icon ? `<link rel="apple-touch-icon" href="${apple_touch_icon}">` : ''}
	<script type="text/javascript" src="/config.js"></script>
	${get_option('niRvana_custom_head','')}
	${theme_scripts_and_styles}
</head>
<body>
	<h1>${esc_html( post ? post.title : title )}</h1>
	<div id="app">
		<noscript>
		<nav>
		<a href="${home_url}/" rel="home">${logo ? `<img rel="logo" height="50" src="${logo}" />` : ''}</a> | 
		<a href="${home_url}/articles">全部文章</a>
		${show_category_list(home_url)}
		</nav>
	`);
}