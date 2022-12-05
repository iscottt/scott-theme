var path = require('path');
var fs = require('fs');
var yaml = require('./module-js-yaml.min.js');

var fa_categories = yaml.load(fs.readFileSync( path.join(__dirname,"./srcs/block-paragraph/fontawesome/metadata/categories.yml") , 'utf8'));
var fa_icons = yaml.load(fs.readFileSync( path.join(__dirname,"./srcs/block-paragraph/fontawesome/metadata/icons.yml") , 'utf8'));

var fa_categories_modify = {};
Object.keys(fa_categories).forEach(key=>{
	fa_categories_modify[ fa_categories[key].label ] = fa_categories[key].icons;
})

var query_icons = (keyword, categories = [] ) => {
	if (categories.length) {
		var icons = [];
		categories.forEach(category_name=>{
			if (fa_categories_modify[category_name]) {
				icons = [...icons, ...fa_categories_modify[category_name]]
			}	
		})
	} else {
		var icons = Object.keys(fa_icons);
	}

	var queried_icons = {};
	keyword = keyword.toLowerCase();
	icons.forEach(icon_name=>{
		if (icon_name.includes(keyword)) {
			queried_icons[icon_name] = fa_icons[icon_name].styles;
		}
	})

	return queried_icons;
}

// console.log(query_icons('bell',['Education','Alert']))

register_rest_route('nirvana','get-fontawesome-infos',{
	methods: 'post',
	callback(data,req) {
		var all_icons = {};
		Object.keys(fa_icons).forEach(icon_name=>{
			all_icons[icon_name] = fa_icons[icon_name].styles;
		})
		return {
			icons: all_icons,
			categories: fa_categories_modify,
		};
	},
	permission_callback: power=>power >= 6,
});