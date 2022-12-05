<template>
	<details
	class="pandastudio-collapse"
	:open="true"
	>
		<richText tag="summary" class="title" v-model:value="title" />
		<innerBlocks class="content" :value="collapseContent" @update:value="val=>{content = val}" v-if="collapseContent" />
	</details>
</template>
<script>
export default {
	name: 'pandastudio-collapse',
	components:{
		richText: nv.components.richText,
		innerBlocks: nv.components.innerBlocks,
	},
	data(){return {
		title: '',
		content: null,
	}},
	computed: {
		collapseContent() {
			if( typeof(this.content) == 'string' ) {
				return {
					blocks: this.content.split('<br>').map(text=>({
						type: 'paragraph',
						data: {text}
					}))
				}
			}
			else {
				return this.content;
			}
		}
	},
	mounted() {
		// 加载默认数据
		nv.block.loadDefaultData.bind(this)();
	},
}
</script>
<style scoped>
.pandastudio-collapse {
	background: var(--gray-9);
	box-shadow: 0 0 0 1px rgba(0,0,0,.08);
	padding: 1px 1.5em;
	border-radius: .3em;
}
.pandastudio-collapse .content,
.pandastudio-collapse summary {
	outline: none;
	margin: 1em 0;
}
</style>