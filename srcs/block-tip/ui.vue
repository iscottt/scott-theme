<template>
	<div
	class="pandastudio-tip"
	:class="{
		error: type=='error',
		warning: type=='warning',
		success: type=='success'
	}"
	>
		<richText class="title" v-model:value="title" />
		<innerBlocks class="content" :value="content" @update:value="val=>{text = val}" v-if="content !== null" />
	</div>
</template>
<script>
export default {
	name: 'pandastudio-tip-block',
	components:{
		richText: nv.components.richText,
		innerBlocks: nv.components.innerBlocks,
	},
	data(){return {
		type: '',
		title: '',
		text: null, //以前有些数据是纯文本，要转换成block再显示
	}},
	computed: {
		content() {
			if( typeof(this.text) == 'string' ) {
				return {
					blocks: this.text.split('<br>').map(text=>({
						type: 'paragraph',
						data: {text}
					}))
				}
			}
			else {
				return this.text;
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
.pandastudio-tip {
	--solid-color: var(--primary-color);
	--opacity-color: var(--primary-opacity-1);
	--content-color: var(--text-color-2);

	background: var(--opacity-color);
	padding: 1px 1.5em;
	border-left: .2em solid var(--solid-color);
	border-radius: 0 .3em .3em 0;
}
.pandastudio-tip .title {
	outline: none;
	margin: 1em 0 -.5em;
	color: var(--solid-color);
}
.pandastudio-tip .content {
	outline: none;
	margin: .6em 0;
	color: var(--content-color);
}
.pandastudio-tip.success {
	--solid-color: var(--success-color);
	--opacity-color: rgba(103,194,58,.1);
	--content-color: #36661f;
}
.pandastudio-tip.warning {
	--solid-color: var(--warning-color);
	--opacity-color: rgba(230,162,60,.1);
	--content-color: #66481b;
}
.pandastudio-tip.error {
	--solid-color: var(--error-color);
	--opacity-color: rgba(245,108,108,.1);
	--content-color: #662d2d;
}
</style>

<style>
.is-dark .pandastudio-tip .content {
	color: var(--text-color-2) !important;
}
</style>