<template>
	<details
	class="nv-collapse"
	>
		<summary class="title" v-html="data.title"></summary>
		<p
		v-if="'string' == typeof(data.content)"
		class="content"
		v-html="data.content"></p>
		<blockParser
		v-else
		class="nested-blocks"
		:blocks="data.content.blocks" />
	</details>
</template>
<script>
import { defineComponent,computed } from "vue";
import blockParser from "/@/components/block-parser/parser.vue"
export default defineComponent({
	name: 'block-collapse',
	props: {
		data: {
			type: Object
		}
	},
	components: {blockParser}
})
</script>
<style lang="less" scoped>
.nv-collapse {
	margin: 1em 0;
	background: var(--gray-8);
	box-shadow: 0 0 0 1px rgba(0,0,0,.08);
	padding: 1px 1.5em;
	border-radius: .3em;
	p,summary {
		outline: none;
		margin: 1em 0;
	}
	summary {
		cursor: pointer;
	}
}
</style>