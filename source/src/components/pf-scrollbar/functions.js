function UaIndexOf(keyword) {
	return navigator.userAgent.indexOf(keyword);
}

export const is_mac = ()=>{return UaIndexOf('Macintosh') > -1;}
export const is_touchable = ()=>{return "ontouchstart" in document;}
export const is_firefox = ()=>{return UaIndexOf('Firefox') > -1;}






export const mapStyles = (el,styles) =>{
	Object.keys(styles).forEach(key=>{
		el.style[key] = styles[key];
	})
}



let timer, flag;
export function throttle(func, wait = 300, immediate = true) {
	if (immediate) {
		if (!flag) {
			flag = true;
			// 如果是立即执行，则在wait毫秒内开始时执行
			typeof func === 'function' && func();
			timer = setTimeout(() => {
				flag = false;
			}, wait);
		}
	} else {
		if (!flag) {
			flag = true
			// 如果是非立即执行，则在wait毫秒内的结束处执行
			timer = setTimeout(() => {
				flag = false
				typeof func === 'function' && func();
			}, wait);
		}
	}
};