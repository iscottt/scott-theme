<template>
	<component
	:is="is"
	class="pf_scroller"
	:class="{is_dragging,pf_scroller_is_mac,pf_scroller_is_touchable}"
	ref="wrap"
	@scroll="!nativeScrollbarExists && parse_scroller_y(), !nativeScrollbarExists && parse_scroller_x()"
	@wheel="event=>{!nativeScrollbarExists && init_wheel_scroll_x(event)}"
	@mouseover="!nativeScrollbarExists && parse_scroller_y(),!nativeScrollbarExists && parse_scroller_x()"
	>
		<div class="scroller-x-wrapper" ref="scroller_x_wrapper" v-if="!nativeScrollbarExists">
			<div
			class="scroller_x"
			ref="scroller_x"
			@mousedown = 'handle_scroller_x_mousedown'
			></div>
		</div>

		<div class="scroller-y-wrapper" ref="scroller_y_wrapper" v-if="!nativeScrollbarExists">
			<div
			class="scroller_y"
			ref="scroller_y"
			@mousedown = 'handle_scroller_y_mousedown'
			></div>
		</div>

		<slot />
	</component>
</template>
<script>
import {defineComponent} from 'vue';
import {mapStyles,is_mac,is_touchable} from "./functions"
import nativeScrollbarExists from "./test"

var getStyle = (el,styleName)=>window.getComputedStyle(el)[styleName];
var mouseY,currentScrollTop,mouseX,currentScrollLeft;

export default defineComponent({
	name: 'pf-scrollbar',
	props: {
		is: {
			type: String,
			default: "div"
		}
	},
	data(){return {
		nativeScrollbarExists: true,
		is_dragging: false,
		pf_scroller_is_mac: false,
		pf_scroller_is_touchable: false,
	}},
	mounted() {
		if (is_mac()) {
			this.pf_scroller_is_mac = true;
			console.log('pfScroller Init Err: macOS skipped');
			return;
		}
		if (is_touchable()) {
			this.pf_scroller_is_touchable = true;
			console.log('pfScroller Init Err: touchableDevice skipped');
			return;
		}
		setTimeout(()=>{
			this.nativeScrollbarExists = nativeScrollbarExists();
		},100)
	},
	methods: {
		handle_scroller_x_mousedown(event) {
			var wrap = this.$refs.wrap;
			if (!wrap) {return;}
			mouseX = event.clientX;
			currentScrollLeft = wrap.scrollLeft;
			mapStyles(wrap,{
				userSelect: 'none',
				pointerEvents: 'none'
			})
			this.is_dragging = true;
			document.addEventListener('mousemove', this.handle_x_mousemove);
			document.addEventListener('mouseup', this.handle_x_mouseup);
		},
		handle_x_mousemove() {
			var wrap = this.$refs.wrap;
			if (!wrap) {return;}
			var new_mouseX = event.clientX,
				viewWidth = wrap.offsetWidth,
				scrollWidth = wrap.scrollWidth,
				offsetPercent = (new_mouseX - mouseX) / viewWidth,
				offsetPixel = offsetPercent * scrollWidth;
			wrap.scrollLeft = currentScrollLeft + offsetPixel;
		},
		handle_x_mouseup() {
			var wrap = this.$refs.wrap;
			if (!wrap) {return;}
			mapStyles(wrap,{
				userSelect: '',
				pointerEvents: ''
			})
			this.is_dragging = false;
			document.removeEventListener('mousemove', this.handle_x_mousemove);
			document.removeEventListener('mouseup', this.handle_x_mouseup);
		},
		handle_scroller_y_mousedown(event) {
			var wrap = this.$refs.wrap;
			if (!wrap) {return;}
			mouseY = event.clientY;
			currentScrollTop = wrap.scrollTop;

			mapStyles(wrap,{
				userSelect: 'none',
				pointerEvents: 'none'
			})
			this.is_dragging = true;
			document.addEventListener('mousemove',this.handle_y_mousemove)
			document.addEventListener('mouseup',this.handle_y_mouseup)
		},
		handle_y_mousemove() {
			var wrap = this.$refs.wrap;
			if (!wrap) {return;}
			var new_mouseY = event.clientY,
				viewHeight = wrap.offsetHeight,
				scrollHeight = wrap.scrollHeight,
				offsetPercent = (new_mouseY - mouseY) / viewHeight,
				offsetPixel = offsetPercent * scrollHeight;
			wrap.scrollTop = currentScrollTop + offsetPixel;
		},
		handle_y_mouseup() {
			var wrap = this.$refs.wrap;
			if (!wrap) {return;}
			mapStyles(wrap,{
				userSelect: '',
				pointerEvents: ''
			})
			this.is_dragging = false;
			document.removeEventListener('mousemove', this.handle_y_mousemove);
			document.removeEventListener('mouseup', this.handle_y_mouseup);
		},
		parse_scroller_y() {
			var wrap = this.$refs.wrap;
			if (!wrap) {return;}
			var viewHeight = wrap.offsetHeight - parseInt(getStyle(wrap,'border-top-width')) - parseInt(getStyle(wrap,'border-bottom-width')),
			scrollTop = wrap.scrollTop,
			scrollHeight = wrap.scrollHeight,
			sliderHeight = viewHeight * viewHeight / scrollHeight;
			var sliderTop = scrollTop / scrollHeight * viewHeight + scrollTop;

			mapStyles(this.$refs.scroller_y,{
				transform: 'translateY('+ scrollTop / scrollHeight * viewHeight +'px) translateX('+wrap.scrollLeft+'px)',
				height: sliderHeight + 'px',
				display: viewHeight / scrollHeight >= 1 ? "none" : ''
			})
		},
		parse_scroller_x() {
			var wrap = this.$refs.wrap;
			if (!wrap) {return;}
			var viewHeight = wrap.offsetHeight - parseInt(getStyle(wrap,'border-top-width')) - parseInt(getStyle(wrap,'border-bottom-width')),
			viewWidth = wrap.offsetWidth - parseInt(getStyle(wrap,'border-left-width')) - parseInt(getStyle(wrap,'border-right-width')),
			scrollLeft = wrap.scrollLeft,
			scrollWidth = wrap.scrollWidth,
			sliderWidth = viewWidth * viewWidth / scrollWidth;
			var sliderLeft = scrollLeft / scrollWidth * viewWidth + scrollLeft;

			mapStyles(this.$refs.scroller_x,{
				transform: 'translateX('+ scrollLeft / scrollWidth * viewWidth + 'px)',
				width: sliderWidth + 'px',
				display: viewWidth / scrollWidth >= 1 ? "none" : ''
			})

			mapStyles(this.$refs.scroller_x_wrapper,{
				top: viewHeight - 7 + 'px'
			})
		},
		init_wheel_scroll_x(event) {
			var wrap = this.$refs.wrap;
			if (!wrap) {return;}
			var position = event.deltaY > 0 ? 1 : -1;
			var scrollRightEnd = false;
			var scrollLeftEnd = false;
			if (position > 0) {
				scrollRightEnd = wrap.scrollWidth == wrap.scrollLeft + wrap.clientWidth;
			}
			if (position < 0) {
				scrollLeftEnd = wrap.scrollLeft == 0
			}
			// 判断是不是只有 x 滚动
			if ( getStyle(this.$refs.scroller_x,'display') == 'block' && getStyle(this.$refs.scroller_y,'display') == 'none' && !(scrollRightEnd || scrollLeftEnd) && event.deltaY) {
				event.preventDefault();
				wrap.scrollBy({
					left: position * 300,
					behavior: 'smooth'
				})
			}
		}
	},
})
</script>
<style scoped>
.scroller-y-wrapper {
	position: sticky;
	height: 0;
	top: 0;
}
.scroller_y {
	width: 5px;
	border-radius: 9px;
	float: right;
	margin-right: 2px;
}
.scroller-x-wrapper {
	position: sticky;
	width: 0;
	left: 0;
	height: 0;
	top: 10px;
}
.scroller_x {
	height: 5px;
	border-radius: 9px;
}
.scroller_y,
.scroller_x {
	background: rgba(0,0,0,.15);
	cursor: pointer;
	opacity: 0;
	transition: opacity .3s;
}
.pf_scroller:hover > .scroller-y-wrapper > .scroller_y,
.pf_scroller:hover > .scroller-x-wrapper >.scroller_x,
.pf_scroller.is_dragging > .scroller-y-wrapper > .scroller_y,
.pf_scroller.is_dragging > .scroller-x-wrapper > .scroller_x {
	opacity: 1;
}
</style>
<style>
.is-dark .pf_scroller > .scroller-y-wrapper > .scroller_y,
.is-dark .pf_scroller > .scroller-x-wrapper > .scroller_x {
	color: rgba(255,255,255,.3);
}
</style>