function UaIndexOf(keyword) {
	return navigator.userAgent.indexOf(keyword);
}
export const is_mac = ()=>{return UaIndexOf('Macintosh') > -1;}
export const is_touchable = ()=>{return "ontouchstart" in document;}
export const is_firefox = ()=>{return UaIndexOf('Firefox') > -1;}
export const is_iPad = ()=>{return UaIndexOf('iPad') > -1;}
export const is_iPhone = ()=>{return UaIndexOf('iPhone') > -1;}
export const is_safari = ()=>{ return UaIndexOf('Chrome') == -1 && UaIndexOf('Safari') > -1 ? true : false; }
export const is_mobile = ()=>{
	var ios = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	var android = UaIndexOf('Android') > -1 || UaIndexOf('Linux') > -1;
	var iPhone = UaIndexOf('iPhone') > -1;
	var iPad = UaIndexOf('iPad') > -1;
	if (ios | android | iPhone | iPad) {
		return true;
	} else {
		return false;
	}
}