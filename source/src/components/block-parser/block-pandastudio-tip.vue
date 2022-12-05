<template>
	<div
	class="nv-tip"
	:class="{
		error: data.type=='error',
		warning: data.type=='warning',
		success: data.type=='success'
	}"
	>
		<p class="title" v-html="data.title"></p>
		<p
		v-if="'string' == typeof(data.text)"
		class="content"
		v-html="data.text"></p>
		<blockParser
		v-else
		class="nested-blocks"
		:blocks="data.text.blocks" />
	</div>
</template>
<script>
import { defineComponent,computed } from "vue";
import blockParser from "/@/components/block-parser/parser.vue"
export default defineComponent({
	name: 'block-tip',
	props: {
		data: {
			type: Object
		}
	},
	components: {blockParser}
})
</script>
<style lang="less" scoped>
.nv-tip {
	margin: 1em 0;
	background: var(--primary-opacity-1);
	padding: 1px 1.5em;
	border-left: .2em solid var(--primary-color);
	border-radius: 0 .3em .3em 0;
	p {
		outline: none;
		margin: 1em 0;
	}
	.title {
		color: var(--primary-color);
		margin-bottom: -.5em;
	}
	&.success {
		background: rgba(103,194,58,.1);
		border-left-color: var(--success-color);
		.title {
			color: var(--success-color);
		}
		.content {
			color: #36661f;
		}
	}
	&.warning {
		background: rgba(230,162,60,.1);
		border-left-color: var(--warning-color);
		.title {
			color: var(--warning-color);
		}
		.content {
			color: #66481b;
		}
	}
	&.error {
		background: rgba(245,108,108,.1);
		border-left-color: var(--error-color);
		.title {
			color: var(--error-color);
		}
		.content {
			color: #662d2d;
		}
	}
}
</style>
<style lang="less">
.is-dark {
	.nv-tip {
		.content {
			color: var(--text-color-2) !important;
		}
	}
}
</style>