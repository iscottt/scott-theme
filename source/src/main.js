import Vue3TouchEvents from 'vue3-touch-events'

import { createApp } from 'vue'
import App from './App.vue'
import store from "./store"
import router from './router'
// import "./assets/element-icons/index.css"
import "./assets/global_style.less"
import "./assets/grid-css-framework/index.scss"
import "./assets/root-color.scss"
import svgIcon from "./components/icons/svg-icon.vue"
import "/@/assets/fontawesome/css/all.css"

/*const app = createApp({
	template: "<App />",
	components: {App}
});*/

const app = createApp(App);

import {init_body_scrollbar,scrollbar_container} from "./components/pf-scrollbar";
init_body_scrollbar();
app.component('pfScroller',scrollbar_container)


import {
	$axios,
	$moment,
	$API,
	$unbind
} from "./properties.js";
app.config.globalProperties.$axios = $axios;
app.config.globalProperties.$moment = $moment;
app.config.globalProperties.$API = $API;
app.config.globalProperties.$unbind = $unbind;

app.config.unwrapInjectedRef = true

app.config.globalProperties.$isSuccess = function(data) {
	if (!data.error) {
		return true;
	}
	else {
		$message.warning(data.error || '错误：未返回错误原因');
		if (data.error_code >= 600 && data.error_code <=700) {
			//nonce验证失败
			router.push('login');
		}
		return false;
	}
}

import {
	localStorage,
	cookies,
	setClipboard,
	add_deal_list,
	array_to_tree,
	get_img_color,
} from "./functions.js";
app.config.globalProperties.$localStorage = localStorage;
app.config.globalProperties.$cookies = cookies;
app.config.globalProperties.$setClipboard = setClipboard;
app.config.globalProperties.$add_deal_list = add_deal_list;
app.config.globalProperties.$array_to_tree = array_to_tree;
app.config.globalProperties.$get_img_color = get_img_color;

app.component('svg-icon',svgIcon);

app
.use(store)
.use(router)
.use(Vue3TouchEvents)
.mount('#app')