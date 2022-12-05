<template>
	<div class="widget-title"><span><slot /></span></div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
	name: 'widget-title',
})
</script>

<style lang="less">
.widget-title {
	border-bottom: 1px solid var(--border-color);
	box-shadow: 0 1px var(--white-opacity-7);
	color: var(--text-color-3);
	text-shadow: 0 1px var(--white-default);
	span {
		display: inline-block;
		position: relative;
		padding-bottom: .4em;
		transition: .35s;
		&:after {
			content: "";
			position: absolute;
			left: 0;
			bottom: -2px;
			height: 3px;
			width: 2em;
			border-radius: 9px;
			background: linear-gradient(var(--analogous-color) 20%,var(--primary-color) 80%);
			box-shadow: 0 3px 4px var(--primary-opacity-5);
			transition: .35s;
		}
	}
	
}
.widget:hover .widget-title span {
	color: var(--primary-color);
	text-shadow: 0 2px 2px var(--primary-opacity-4), 0 -1px var(--white-default);
	&:after {
		width: 100%;
	}
}
</style>