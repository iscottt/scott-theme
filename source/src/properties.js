import axios from 'axios'
import moment from "moment";
import "moment/dist/locale/zh-cn";

import $store from "./store"

import {localStorage, cookies} from "./functions.js"

import router from "./router";

//请求拦截器，总是要手动添加nvnonce
axios.interceptors.request.use(function (config) {
    var nvnonce = cookies('nvnonce') || localStorage('nvnonce') || $store.state.nonce;
    if (nvnonce) {
        config.headers.nvnonce = nvnonce;
        return config;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
   // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
	// 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status == 401) {
        cookies('nvnonce','')
    	localStorage('nvnonce','');
    	location.reload();
    }
    return Promise.reject(error);
});

export const $axios = axios;
export const $moment = moment;
// export const $API = process.env.NODE_ENV === 'production' ? "" : '/vite-proxy';
export const $API = process.env.NODE_ENV === 'production'
											? ((window.__niRvana_config__||{}).api||'')
											: '/vite-proxy';
export const $unbind = obj => JSON.parse(JSON.stringify({a:obj})).a;