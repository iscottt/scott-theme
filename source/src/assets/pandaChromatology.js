const rgb2hsl = (x,y,z)=>{
	if (x instanceof Array) {
		var r = x[0] || 0,
			g = x[1] || 0,
			b = x[2] || 0;
	} else {
		var r = x || 0,
			g = y || 0,
			b = z || 0
	}
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b),
	min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
			h = (g - b) / d + (g < b ? 6 : 0);
			break;
			case g:
			h = (b - r) / d + 2;
			break;
			case b:
			h = (r - g) / d + 4;
			break;
		}
		h /= 6;
	}

	return [h * 360, s * 100, l * 100];
	//H:0~360,S:0%~100%,l:0%~100%;
}
const hsl2rgb = (x,y,z)=>{
	if (x instanceof Array) {
		var h = x[0] || 0,
			s = x[1] || 0,
			l = x[2] || 0;
	} else {
		var h = x || 0,
			s = y || 0,
			l = z || 0
	}
	h /= 360, s /= 100, l /= 100;
	var r, g, b;

	if (s == 0) {
		r = g = b = l; // achromatic
	} else {
		var hue2rgb = function hue2rgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
const hex2rgb = (hexStr)=>{
	var hex = hexStr.replace(/#/g,'');

	if (hex.length == 6) {
		var r=parseInt(hex.substring(0,2),16),
			g=parseInt(hex.substring(2,4),16),
			b=parseInt(hex.substring(4,6),16);
	} else if (hex.length == 3) {
		var r=parseInt(hex.substring(0,1)+hex.substring(0,1),16),
			g=parseInt(hex.substring(1,2)+hex.substring(1,2),16),
			b=parseInt(hex.substring(2,3)+hex.substring(2,3),16);
	} else {
		console.warn('hex2rgb输入错误：',hexStr);
		return [0,0,0];
	}

	return [r,g,b];
}
const rgb2hex = (x,y,z)=>{
	if (x instanceof Array) {
		var r = x[0] || 0,
			g = x[1] || 0,
			b = x[2] || 0;
	} else {
		var r = x || 0,
			g = y || 0,
			b = z || 0
	}
	function to16(num) {
		var num = parseInt(num);
		if (num > 255) {
			console.warn('rgb2hex输入错误，分析出值大于256');
			return "FF";
		}
		if (num < 0) {
			console.warn('rgb2hex输入错误，分析出值小于0');
			return "00";
		}
		var result = num.toString(16);
		if (result.length < 2) {
			result = "0"+result;
		}
		return result;
	}
	return "#"+to16(r)+to16(g)+to16(b);
}
const hex2hsl = (hexStr)=>{
	return rgb2hsl(hex2rgb(hexStr));
}
const hsl2hex = (x,y,z)=>{
	return rgb2hex(hsl2rgb(x,y,z));
}
const color2str = (original_type,color,opacity)=>{
	//将任意格式的颜色转换成hex或者rgba
	//有opacity就转换为rgba，否则就是hex
	var result;
	if (opacity != null || opacity != undefined) {
		switch(original_type) {
			case "rgb":
				result = color;
				break;
			case "hsl":
				result = hsl2rgb(color);
				break;
			case "hex":
				result = hex2rgb(color);
				break;
		}
		result = "rgba("+result.join(",")+","+opacity+")";
	} else {
		switch(original_type) {
			case "rgb":
				result = rgb2hex(color);
				break;
			case "hsl":
				result = hsl2hex(color);
				break;
			case "hex":
				result = color;
				break;
		}
	}
	return result;
}
//修正算法
//用户增加饱和度，亮度。使用方法：传入hex，以及饱和度亮度的改变百分比
const fix_HEX_sl = (hex, saturationStep, lightStep)=>{
	var hsl = hex2hsl(hex);
	var s = validate(hsl[1] * saturationStep);
	var l = validate(hsl[2] * lightStep);
	function validate(x) {
		if (x >= 100) { return 100;}
		if (x <= 0) { return 0;}
		return x;
	}
	return hsl2hex(hsl[0], s, l);
}
const fix_RGB_sl = (rgb, saturationStep, lightStep)=>{
	var hex = rgb2hex(rgb);
	var newHex = fix_HEX_sl(hex,saturationStep, lightStep);
	return hex2rgb(newHex);
}

//将亮度、饱和度调整到某个范围内（用于提升或降低亮度饱和度）
const fix_HEX_sl_range = (hex, s_range, l_range)=>{
	//把s修正到范围以内，把l修正到范围以内
	//s_range:[10,40]
	//l_range:[10,40]
	var hsl = hex2hsl(hex);
	var s = hsl[1];
	var l = hsl[2];
	s = fix(s,s_range);
	l = fix(l,l_range);

	function fix(x,[s,m]) {
		return (x/100)*(m-s)+s;
	}
	return hsl2hex(hsl[0],s,l);
}
const fix_RGB_sl_range = (rgb, s_range, l_range)=>{
	var hex = rgb2hex(rgb);
	var fixed_hex = fix_HEX_sl_range(hex, s_range, l_range);
	return hex2rgb(fixed_hex);
}

//获取邻近色。使用方法：输入hex，以及相邻的delta值
//黄-绿-青-蓝：减delta
//蓝-洋-红-黄：加delta
const get_analogous_HEX = (hex,delta)=>{
	var hsl = hex2hsl(hex);
	if (hsl[0] >=0 && hsl[0] <= 60 - delta) {
		hsl[0] += delta;
	} else if (hsl[0] > 60 - delta && hsl[0] <= 240) {
		hsl[0] -= delta;
	} else if (hsl[0] > 240 && hsl[0] <= 360) {
		hsl[0] += delta;
	}
	hsl[0] = hsl[0] >= 360 ? hsl[0] - 360 : hsl[0];
	return hsl2hex(hsl[0],hsl[1],hsl[2]);
}

function pdColor() {
	var HEX = '#000';
	var ALPHA = 1;
	this.setAlpha = (number)=>{
		//设置alpha
		if (number >= 0 && number <= 1) {
			ALPHA = number;
		} else {
			console.log(`alpha值输入错误：${number}`);
		}
		return this;
	}
	this.setA = this.setAlpha;
	this.setHex = (string)=>{
		var hex = string.replace(/#/g,'');
		if (hex.length == 6 || hex.length == 3) {
			HEX = `#${hex}`;
		} else {
			console.log(`HEX输入错误：${string}`);
		}
		return this;
	}
	this.setRgb = (x,y,z)=>{
		//将rgb设置为hex
		HEX = rgb2hex(x,y,z);
		return this;
	}
	this.setRgba = (x,y,z,a)=>{
		if (x instanceof Array) {
			HEX = rgb2hex(x);
			this.setAlpha(x[3])
		} else {
			HEX = rgb2hex(x,y,z);
			this.setAlpha(a)
		}
		return this;
	}
	this.setHsl = (x,y,z)=>{
		//将hsl设置为hex
		HEX = hsl2hex(x,y,z);
		return this;
	}
	this.setHsla = (x,y,z)=>{
		if (x instanceof Array) {
			HEX = hsl2hex(x);
			this.setAlpha(x[3])
		} else {
			HEX = hsl2hex(x,y,z);
			this.setAlpha(a)
		}
		return this;
	}
	switch(arguments.length){
		case(1):
		//hex/option
		if (typeof arguments[0] == 'string') {
			//hex
			this.setHex(arguments[0]);
		} else if (typeof arguments[0] == 'object') {
			if (Array.isArray(arguments[0])) {
				// array
				if (arguments[0].length == 3) {
					this.setRgb(arguments[0]);
				} else if (arguments[0].length == 4) {
					this.setRgba(arguments[0]);
				}
			} else {
				//object
				console.log('参数错误');
			}
		} else {
			console.log('参数错误');
		}
		break;

		case(3):
		// rgb
		this.setRgb(arguments[0],arguments[1],arguments[2]);
		break;

		case(4):
		// rgba
		this.setRgba(arguments[0],arguments[1],arguments[2],arguments[3]);		
		break;

		default:
		//默认0
		break;
	}
	this.getAlpha = ()=>{return ALPHA;}
	this.getA = this.getAlpha;
	this.getHex = ()=>{return HEX;}
	this.getRgb = ()=>{return hex2rgb(HEX);}
	this.getRgba = ()=>{
		var result = this.getRgb();
		result.push(ALPHA);
		return result;
	}
	this.getHsl = ()=>{
		var result = hex2hsl(HEX);
		return [Math.round(result[0]),Math.round(result[1]),Math.round(result[2])]
	}
	this.getHsla = ()=>{
		var result = this.getHsl();
		result.push(ALPHA);
		return result;
	}
	this.getR = ()=>{return this.getRgb()[0];}
	this.getG = ()=>{return this.getRgb()[1];}
	this.getB = ()=>{return this.getRgb()[2];}
	this.getH = ()=>{return this.getHsl()[0];}
	this.getS = ()=>{return this.getHsl()[1];}
	this.getL = ()=>{return this.getHsl()[2];}
	this.getString = (type)=>{
		switch(type) {
			case('hex'):
			return color2str('hex',HEX);
			break;

			case('rgb'):
			return `rgb(${this.getRgb()})`;
			break;

			case('rgba'):
			return `rgba(${this.getRgba()})`;
			break;

			case('hsl'):
			return `hsl(${this.getHsl()})`;
			break;

			case('hsla'):
			return `hsla(${this.getHsla()})`;
			break;

			default:
			return color2str('hex',HEX,ALPHA == 1 ? undefined : ALPHA);
		}
	};
	this.lighten = (l_step)=>{
		//增加亮度
		var step = l_step || 1.1;
		HEX = fix_HEX_sl(HEX,1,step);
		return this;
	}
	this.darken = (l_step)=>{
		//减少亮度
		var step = l_step || 0.90909;
		HEX = fix_HEX_sl(HEX,1,step);
		return this;
	}
	this.saturate = (s_step)=>{
		//增加饱和度
		var step = s_step || 1.1;
		HEX = fix_HEX_sl(HEX,step,1);
		return this;
	}
	this.desaturate = (s_step)=>{
		//减少饱和度
		var step = s_step || 0.90909;
		HEX = fix_HEX_sl(HEX,step,1);
		return this;
	}
	this.setR = (x)=>{
		var arr = this.getRgb();
		arr[0] = x;
		this.setRgb(arr);
		return this;
	}
	this.setG = (x)=>{
		var arr = this.getRgb();
		arr[1] = x;
		this.setRgb(arr);
		return this;
	}
	this.setB = (x)=>{
		var arr = this.getRgb();
		arr[2] = x;
		this.setRgb(arr);
		return this;
	}
	this.setH = (x)=>{
		var arr = this.getHsl();
		arr[0] = x;
		this.setHsl(arr);
		return this;
	}
	this.setS = (x)=>{
		var arr = this.getHsl();
		arr[1] = x;
		this.setHsl(arr);
		return this;
	}
	this.setL = (x)=>{
		var arr = this.getHsl();
		arr[2] = x;
		this.setHsl(arr);
		return this;
	}
	this.adjustH = (x)=>{
		var h = this.getH();
		if (x > -360 && x < 360) {
			h = h + x;
			if (h > 360) {
				h = h - 360;
			}
			if (h < 0) {
				h = 360 + h;
			}
			this.setH(h);
		} else {
			console.log(`调整范围错误：${x}`)
		}
		return this;
	}
	this.analogous = (x)=>{
		// 修改为邻近色
		// 自动邻近: x为正数 - 向高亮度方向邻近
		// 自动邻近: x为负数 - 向低亮度方向邻近
		HEX = get_analogous_HEX(HEX,x ? x : 8);
		return this;
	}
	this.mappingS = (range)=>{
		if (range) { HEX = fix_HEX_sl_range(HEX,range,[0,100]); }
		return this;
	}
	this.mappingL = (range)=>{
		if (range) { HEX = fix_HEX_sl_range(HEX,[0,100],range); }
		return this;
	}
}

export {
	rgb2hsl, //色彩转换
	hsl2rgb,
	hex2rgb,
	rgb2hex,
	hex2hsl,
	hsl2hex,
	color2str, //将指定的类型颜色转换为字符串（有opacity就转成rgba，否则是hex）
	fix_HEX_sl, //修正（增减）饱和度亮度
	fix_RGB_sl,
	fix_HEX_sl_range, //将亮度、饱和度调整到某个范围内（用于提升或降低亮度饱和度）
	fix_RGB_sl_range,
	get_analogous_HEX, //获取邻近色
	pdColor
}