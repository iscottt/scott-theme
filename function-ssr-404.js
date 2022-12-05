module.exports = ({echo})=>{
	var site_name = get_option('nv_site_name','nvPress');
	var title = `404 - ${site_name}`;
	require('./function-ssr-header')({echo,title});
	echo('<h1>404</h1><p>您访问的页面不存在</p>')
	require('./function-ssr-footer')({echo});
}