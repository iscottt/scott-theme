const localStorage = function(name,value) {
	if (arguments.length == 1) {
		//没有value，仅读取
		try{
			var result = JSON.parse(window.localStorage.getItem(name)).v;
		}catch(e){
			var result = window.localStorage.getItem(name);
		}
		return result;
	} else {
		//有value，存储
		window.localStorage.setItem(name,JSON.stringify({v:value}));
	}
}

export {localStorage};

import ColorThief from "/@/assets/color-thief.js";
import {pdColor} from "/@/assets/pandaChromatology";
export const get_img_color = function(url) {
	return new Promise((resolve,reject)=>{
		//尝试从localStorage里面读出已有的主色调
		var mainColors = localStorage('mainColors');
		mainColors = mainColors ? mainColors : {};
		if (mainColors[url]) {
			resolve(mainColors[url]);
			return;
		}
		//因为是从background-image里面提取的css，所以没有的时候是none，这个时候会onerror
		var img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = ()=> {
			var colorThief = new ColorThief();
			var color = colorThief.getColor(img);
			//看看颜色的亮度是否比较低，如果低，就重新取色彩盘
			var pdColorInstance = new pdColor(color);
			if (pdColorInstance.getL() < 5 || pdColorInstance.getS() < 5) {
				var result = null;
				colorThief.getPalette(img,5).map(function(el) {
					var instance = new pdColor(el);
					if (instance.getL() >= 5 && instance.getS() >= 5 && result == null) {
						result = el;
					}
				})
				color = result ? result : color;
			}
			resolve(color);
			img = null;
			//将当前的URL对应的color保存起来
			mainColors = localStorage('mainColors');
			mainColors = mainColors ? mainColors : {};
			mainColors[url] = color;
			localStorage('mainColors', mainColors);
		};
		img.onerror= ()=> {
			console.log(`图片地址不正确，无法获取主色调：${url}`);
			reject([0,0,0]);
			img = null;
		};
		img.src = url;
	})
}

export const cookies = function(name,value,days) {
	if (arguments.length == 1) {
		//没有value，仅读取
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)) {
			return decodeURIComponent(arr[2]);
		} else {
			return null;
		}
	} else {
		//有value，存储
		var exp = new Date();
		exp.setTime(exp.getTime() + (days || 0)*24*60*60*1000);
		
		var nameVal = `${name}=${encodeURIComponent(value)};`;
		var expires = days ? `expires=${exp.toGMTString()};` : '';
		var path = 'path=/;';
		var sameSite = 'sameSite=Strict;';
		document.cookie = `${nameVal}${expires}${path}${sameSite}`
	}
}

export const setClipboard = function(content) {
	var aux = document.createElement("textarea"); 
	aux.value = content;
	document.body.appendChild(aux); 
	aux.select();
	document.execCommand("copy"); 
	document.body.removeChild(aux);
}

export const add_deal_list = (func,args) => {
	if ( !(func._list instanceof Array) ) { func._list = [] }
	func._list.push(args)
	var dealFunc = ()=>{
		var currentArgs = func._list.shift();
		func( ...currentArgs )
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			if (func._list.length > 0) {
				dealFunc();
			} else {
				func._dealing = false;
			}
		})
	}
	if (!func._dealing) {
		func._dealing = true;
		dealFunc();
	}
}

export const array_to_tree = (arr,parentKey,idKey,childrenKey) => {
	parentKey = parentKey || 'parent';
	idKey = idKey || 'id';
	childrenKey = childrenKey || 'children';
	const res = []
	const map = arr.reduce((res, v) => (res[v[idKey]] = v, res), {})
	for (const item of arr) {
		if (item[parentKey] === 0) {
			res.push(item)
			continue
		}
		if (item[parentKey] in map) {
			const parent = map[item[parentKey]]
			parent[childrenKey] = parent[childrenKey] || []
			parent[childrenKey].push(item)
		}
	}
	return res;
};