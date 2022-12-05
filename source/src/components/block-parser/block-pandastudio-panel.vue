<template>
	<div
	class="pandastudio-panel"
	:class="{
		error: data.type=='error',
		warning: data.type=='warning',
		success: data.type=='success'
	}"
	>
		<div
		class="title"
		v-html="data.title"></div>
		<blockParser
		class="content"
		:blocks="data.content.blocks" />
	</div>
</template>
<script>
import { defineComponent,computed } from "vue";
import blockParser from "/@/components/block-parser/parser.vue"
export default defineComponent({
	name: 'block-panel',
	props: {
		data: {
			type: Object
		}
	},
	components: {blockParser}
})
</script>
<style scoped>
.pandastudio-panel {
	margin: 1em 0;
	--solid-color: var(--primary-color);
	--opacity-color: var(--primary-opacity-2);

	border: 1px solid var(--solid-color);
	border-radius: .5em;
	box-shadow: 0 2px 2px var(--opacity-color);
}
.pandastudio-panel > .title {
	padding: .625em 1em;
	border-radius: .4em .4em 0 0;
	border-bottom: 1px solid var(--solid-color);
	background: var(--opacity-color);
	color: var(--solid-color);
	text-shadow: 0 1px var(--white-default);
}
.pandastudio-panel > .content {
	padding: .4em 1em;
}
.pandastudio-panel.success {
	--solid-color: rgb(103,194,58);
	--opacity-color: rgba(103,194,58,.2);
}
.pandastudio-panel.warning {
	--solid-color: rgb(230,162,60);
	--opacity-color: rgba(230,162,60,.1);

}
.pandastudio-panel.error {
	--solid-color: rgb(245,108,108);
	--opacity-color: rgba(245,108,108,.1);
}
</style>