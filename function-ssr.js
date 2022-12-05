/*
=========================================================
SEO：专为搜索引擎处理ssr。不是搜索引擎的UA则使用前端渲染
=========================================================
*/

var fs = require('fs');
var path = require('path');

// 静态资源
register_static_url('/', path.join(__dirname,"./web/") );

// 渲染路径控制
add_action('register_server_side_render_router',express=>{
	// 由于使用了SSR，所以每个可能的地址都要判定一遍
	express.get('/', (req,res,next)=>{
		res.type("text/html");
		// res.send( "进来了：/" );
		res.send( ssr_frontpage() );
		return;
	})
	express.get('/sitemap', (req,res,next)=>{
		res.type("text/xml");
		// res.send( "进来了：/" );
		res.send( ssr_sitemap() );
		return;
	})
	express.get('/articles', (req,res,next)=>{
		res.type("text/html");
		// res.send( "进来了" );
		res.send( ssr_articles({current_page: 1}) );
		return;
	})
	express.get('/articles/page/:current_page', (req,res,next)=>{
		var current_page = req.params.current_page;
		res.type("text/html");
		// res.send( "进来了" );
		res.send( ssr_articles({current_page}) );
		return;
	})
	express.get('/:post_slug', (req,res,next)=>{
		var post_slug = req.params.post_slug;
		if (post_slug.includes('.')) {
			next();
		} else {
			// 这是文章页
			res.type("text/html");
			// res.send( "进来了：post" );
			res.send( ssr_single({post_slug, comment_page: 1}) );
			return;
		}
	})
	express.get('/:post_slug/comment-page-:comment_page', (req,res,next)=>{
		var comment_page = req.params.comment_page;
		var post_slug = req.params.post_slug;
		res.type("text/html");
		// res.send( "进来了" );
		res.send( ssr_single({post_slug, comment_page}) );
		return;
	})
	express.get('/:taxonomy/:term_slug', (req,res,next)=>{
		var term_slug = req.params.term_slug;
		var taxonomy = req.params.taxonomy;
		if (term_slug.includes('.')) {
			next();
		} else {
			res.type("text/html");
			// res.send( "进来了" );
			res.send( ssr_term({taxonomy,term_slug,current_page:1}) );
			return;
		}
	})
	express.get('/:taxonomy/:term_slug/page/:current_page', (req,res,next)=>{
		var term_slug = req.params.term_slug;
		var taxonomy = req.params.taxonomy;
		var current_page = req.params.current_page;
		res.type("text/html");
		// res.send( "进来了" );
		res.send( ssr_term({taxonomy,term_slug,current_page}) );
		return;
	})

	express.get('*', (req,res,next)=>{
		res.type("text/html");
		// res.send( "进来了：*" );
		res.status(404).send( ssr_404() );
		return;
	})
},99)




class Echo {
	#html = "";
	get isEmpty() {
		return !this.#html.length;
	}
	get html() {
		return this.#html;
	}
	constructor(message) {
		if (message) {
			this.#html = message;
		}
		this.attach = this.appendString.bind(this)
		return this;
	}
	appendString(sth) {
		if (typeof(sth) == 'string') {
			this.#html += sth;
		}
		else if (sth.toString && typeof(sth.toString) == 'function') {
			this.#html += sth.toString();
		}
		else {
			var tryStr = JSON.Stringify( sth );
			this.#html += tryStr ? tryStr : '__UNDEFINED__';
		}
		return this;
	}
}

function ssr_frontpage() {
	// 首页
	var echo = new Echo();
	require( path.join(__dirname,"./function-ssr-frontpage.js") )({
		echo: echo.attach,
	})
	return echo.html;
}

function ssr_sitemap() {
	// 首页
	var echo = new Echo();
	require( path.join(__dirname,"./function-ssr-sitemap.js") )({
		echo: echo.attach,
	})
	return echo.html;
}

function ssr_single({post_slug,comment_page}) {
	// 内容页
	post_slug = encodeURIComponent(decodeURIComponent(post_slug));
	var post = get_post(post_slug);
	if ( is_nv_error(post) ) {
		return ssr_404();
	}
	if ( post.status !== "publish" || post.modified_time > new Date().getTime() ) {
		return ssr_404();
	}
	var echo = new Echo();
	require( path.join(__dirname,"./function-ssr-single.js") )({
		echo: echo.attach,
		post,
		post_slug,
		comment_page,
	})
	return echo.html;
}

function ssr_articles({current_page}) {
	// 文章时间线
	var echo = new Echo();
	require( path.join(__dirname,"./function-ssr-articles.js") )({
		echo: echo.attach,
		current_page,
	})
	return echo.html;
}

function ssr_term({taxonomy,term_slug,current_page}) {
	// 文章分类页
	var term_id = term_exists(term_slug, taxonomy);
	if (!term_id) {
		return ssr_404();
	}

	var echo = new Echo();
	require( path.join(__dirname,"./function-ssr-term.js") )({
		echo: echo.attach,
		term_id,
		taxonomy,term_slug,current_page
	})
	return echo.html;
}

function ssr_404() {
	var echo = new Echo();
	require( path.join(__dirname,"./function-ssr-404.js") )({
		echo: echo.attach,
	})
	return echo.html;
}