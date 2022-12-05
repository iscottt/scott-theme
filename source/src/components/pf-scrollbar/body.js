import {
	is_mac,
	is_touchable,
	is_firefox,
	mapStyles,
	throttle,
} from "./functions";

import nativeScrollbarExists from './test';

var body_scroll_inited = false;

var initY = ()=>{
	var scroller_y = document.createElement('div');
	scroller_y.classList.add('pf_scroller_y');
	var computedStyle = window.getComputedStyle(document.body);
	if (parseInt(computedStyle.marginTop) !== 0 || parseInt(computedStyle.marginBottom) !== 0) {
		console.log('pfScroller Init Err: Body Margin Not 0');
		return;
	}

	document.body.prepend(scroller_y);

	var parse_body_scroll_y = ()=>{
		var viewHeight = window.innerHeight,
			scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
			scrollHeight = document.body.scrollHeight,
			wrapPaddingTop = 0,
			wrapPaddingBottom = 0,
			sliderHeight = viewHeight * (viewHeight + wrapPaddingTop + wrapPaddingBottom) / scrollHeight;
		var sliderTop = scrollTop / scrollHeight * viewHeight;

		mapStyles(scroller_y,{
			transform: 'translateY('+ sliderTop / sliderHeight * 100 + '%)',
			height: sliderHeight+"px",
			display: viewHeight / scrollHeight >= 1 ? "none" : ''
		})
	}

	parse_body_scroll_y();
	window.addEventListener('scroll',parse_body_scroll_y)
	window.addEventListener('mouseover',parse_body_scroll_y)
	window.addEventListener('resize',()=>{
		throttle(parse_body_scroll_y,1000,false)
	})

	// drag
	var mouseY,
		currentScrollTop;
	var mousemove = function(event) {
		var new_mouseY = event.clientY,
			viewHeight = window.innerHeight,
			scrollHeight = document.documentElement.scrollHeight,
			offsetPercent = (new_mouseY - mouseY) / viewHeight,
			offsetPixel = offsetPercent * scrollHeight;
		document.documentElement.scrollTop = currentScrollTop + offsetPixel;
	}
	var mouseup = function() {
		mapStyles(document.body,{
			userSelect: '',
			pointerEvents: ''
		})
		document.body.classList.remove('is_dragging')
		document.removeEventListener('mousemove', mousemove);
		document.removeEventListener('mouseup', mouseup);
	}
	scroller_y.addEventListener('mousedown', function(event) {
		mouseY = event.clientY;
		currentScrollTop = document.documentElement.scrollTop;
		mapStyles(document.body,{
			userSelect: 'none',
			pointerEvents: 'none'
		});
		document.body.classList.add('is_dragging')
		document.addEventListener('mousemove', mousemove);
		document.addEventListener('mouseup', mouseup);
	});
}

var initX = ()=>{
	var scroller_x = document.createElement('div');
	scroller_x.classList.add('pf_scroller_x');
	var computedStyle = window.getComputedStyle(document.body);
	if (parseInt(computedStyle.marginLeft) !== 0 || parseInt(computedStyle.marginRight) !== 0) {
		console.log('pfScroller Init Err: Body Margin Not 0');
		return;
	}

	document.body.prepend(scroller_x);

	var parse_body_scroll_x = function() {
		var viewWidth = window.innerWidth,
			scrollLeft = document.documentElement.scrollLeft,
			scrollWidth = document.documentElement.scrollWidth,
			wrapPaddingLeft = 0,
			wrapPaddingRight = 0,
			sliderWidth = viewWidth * (viewWidth + wrapPaddingLeft + wrapPaddingRight) / scrollWidth;
		var sliderLeft = scrollLeft / scrollWidth * viewWidth;

		mapStyles(scroller_x,{
			transform: 'translateX('+ sliderLeft / sliderWidth * 100 + '%)',
			width: sliderWidth+'px',
			display: viewWidth / scrollWidth >= 1 ? "none" : ''
		})
	}

	parse_body_scroll_x();
	window.addEventListener('scroll',parse_body_scroll_x)
	window.addEventListener('mouseover',parse_body_scroll_x)
	window.addEventListener('resize',()=>{
		throttle(parse_body_scroll_x,1000,false)
	})

	//drag
	var mouseX,
	currentScrollLeft;
	var mousemove = function(event) {
		var new_mouseX = event.clientX,
		viewWidth = window.innerWidth,
		scrollWidth = document.documentElement.scrollWidth,
		offsetPercent = (new_mouseX - mouseX) / viewWidth,
		offsetPixel = offsetPercent * scrollWidth;
		document.documentElement.scrollLeft = currentScrollLeft + offsetPixel;
	}
	var mouseup = function(){
		mapStyles(document.body,{
			userSelect: '',
			pointerEvents: ''
		})
		document.body.classList.remove('is_dragging')
		document.removeEventListener('mousemove', mousemove);
		document.removeEventListener('mouseup', mouseup);
	}
	scroller_x.addEventListener('mousedown', function(event) {
		mouseX = event.clientX;
		currentScrollLeft = document.documentElement.scrollLeft;
		mapStyles(document.body,{
			userSelect: 'none',
			pointerEvents: 'none'
		})
		document.body.classList.add('is_dragging')
		document.addEventListener('mousemove', mousemove);
		document.addEventListener('mouseup', mouseup);
	});
}

export default ()=>{
	if (body_scroll_inited) {
		console.log('pfScroller Init Err: Inited');
		return;
	}
	if (is_mac()) {
		document.documentElement.classList.add('pf_scroller_is_mac');
		console.log('pfScroller Init Err: macOS skipped');
		return;
	}
	if (is_touchable()) {
		document.documentElement.classList.add('pf_scroller_is_touchable');
		console.log('pfScroller Init Err: touchableDevice skipped');
		return;
	}
	if (nativeScrollbarExists()) {
		console.log('pfScroller Init Err: Native Scrollbar Existed');
		return;
	}

	import('./style.body.css');
	document.body.classList.add('pf_scroller');

	initY();
	initX();

	body_scroll_inited = true;
};