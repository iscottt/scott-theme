import './style.css'

import {
	is_mac,
	is_touchable,
	is_firefox,
} from "./functions";

if (!is_mac() && !is_touchable() && is_firefox()) {
	import('./style.firefox.css');
}

import body from "./body.js";
var init_body_scrollbar = ()=>{
	setTimeout(()=>{
		body();
	},100)
}

import scrollbar_container from './pf-scroller.vue';

export {
	init_body_scrollbar,
	scrollbar_container,
}