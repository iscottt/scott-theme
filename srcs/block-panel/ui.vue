<template>
	<div
	class="nv-panel"
	:class="{
		error: type=='error',
		warning: type=='warning',
		success: type=='success'
	}"
	>
		<richText v-model:value="title" placeholder="请输入面板标题..." class='title' />
		<innerBlocks v-model:value="content" class="content" />
	</div>
</template>
<script>
export default {
	name: 'nv-panel',
	components:{
		richText: nv.components.richText,
		innerBlocks: nv.components.innerBlocks,
	},
	data(){return {
		type: "",
		title: "",
		content: {},
	}},
	mounted() {
		nv.block.loadDefaultData.bind(this)();
	},
}
</script>
<style scoped>
.nv-panel {
	--solid-color: var(--primary-color);
	--opacity-color: var(--primary-opacity-2);

	border: 1px solid var(--solid-color);
	border-radius: .5em;
	box-shadow: 0 2px 2px var(--opacity-color);
}
.nv-panel > .title {
	padding: .625em 1em;
	border-radius: .4em .4em 0 0;
	border-bottom: 1px solid var(--solid-color);
	background: var(--opacity-color);
	color: var(--solid-color);
	text-shadow: 0 1px var(--white-default);
}
.nv-panel > .content {
	padding: 1em;
}
.nv-panel.success {
	--solid-color: rgb(103,194,58);
	--opacity-color: rgba(103,194,58,.2);
}
.nv-panel.warning {
	--solid-color: rgb(230,162,60);
	--opacity-color: rgba(230,162,60,.1);

}
.nv-panel.error {
	--solid-color: rgb(245,108,108);
	--opacity-color: rgba(245,108,108,.1);
}
</style>