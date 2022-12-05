<template>
	<div></div>
</template>
<script>
import { defineComponent,computed } from "vue";
export default defineComponent({
	name: 'block-delimiter',
	props: {
		data: {
			type: Object
		}
	},
})
</script>
<style lang="less" scoped>
div {
	text-align: center;
	font-size: 14px;
	&:before {
		display: inline-block;
		content: "***";
		font-size: 2em;
		line-height: 3em;
		height: 2.6em;
		letter-spacing: .2em;
		color: var(--border-color);
		text-shadow: 0 2px var(--white-default);
	}
}
</style>