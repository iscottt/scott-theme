<template>
	<div
	class="pandastudio-title"
	:data-tag="tag"
	:data-style="style"
	>
		<richText class="title" :tag="tag" v-model:value="text" :nowrap />
	</div>
</template>
<script>
export default {
	name: 'pandastudio-title-block',
	components:{
		richText: nv.components.richText,
	},
	data(){return {
		tag: 'h2',
		style: 1,
		text: '',
	}},
	mounted() {
		// 加载默认数据
		nv.block.loadDefaultData.bind(this)();
	},
}
</script>
<style scoped>
.pandastudio-title {
	margin-top: .4em;
	margin-bottom: .4em;
	color: var(--primary-color);
}
.pandastudio-title[data-style="1"] {
	--inset: 60px;
	margin-left: calc(0px - var(--inset));
	margin-right: calc(0px - var(--inset));
	border-bottom: 1px solid var(--border-color);
	padding-left: var(--inset);
	padding-right: var(--inset);
	padding-bottom: 5px;
	position: relative;
	text-shadow: 0 2px 3px var(--primary-opacity-3);
}
.pandastudio-title[data-style="1"] .title {
	font-size: 1.25em;
}
.pandastudio-title[data-style="1"]:after {
	content: "";
	position: absolute;
	bottom: -2px;
	left: var(--inset);
	height: 3px;
	border-radius: 3px;
	width: 2em;
	background: linear-gradient(#33bbff,#1f8bff);
	box-shadow: 0 3px 4px var(--primary-opacity-5);
	transition: .25s;
}
.pandastudio-title[data-style="1"]:hover:after {
	width: 4em;
}
@media (max-width: 650.5px) {
	.pandastudio-title[data-style="1"] {
	  --inset: 15px;
	}
}
.pandastudio-title[data-style="2"] {
	border-left: 3px solid var(--primary-color);
	background: var(--primary-opacity-1);
	text-shadow: 0 2px 3px var(--primary-opacity-3), 0 -1px var(--white-default);
	border-radius: 0 8px 8px 0;
	padding: .5em 15px
}
.pandastudio-title[data-style="2"] .title {
	font-size: 1.1875em;
}

.title {
	margin: 0;
	font-weight: normal;
}
</style>
