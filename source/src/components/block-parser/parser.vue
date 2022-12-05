<template>
	<component :is="is" class="nv-blocks">
		<p v-if="blocks.length == 0">暂无数据</p>
		<template v-for="block in blocks">
			<component :is="`block-${block.type.replace(/\//g,'-')}`" :data="block.data" :data-block-id="block.id" />
		</template>
	</component>
</template>
<script>
import { defineComponent,defineAsyncComponent,computed } from "vue";

// const files = import.meta.globEager('./block-*.vue');
// const modules = {};
// for (const key in files) {
// 	modules[key.replace(/(\.\/|\.vue)/g, '')] = files[key].default
// }

const files = import.meta.glob('./block-*.vue');
const modules = {}
for (const key in files) {
	modules[key.replace(/(\.\/|\.vue)/g, '')] = defineAsyncComponent(files[key])
}

export default defineComponent({
	name: 'block-parser',
	components: {
		...modules
	},
	props: {
		is: {
			type: String,
			default: "div",
		},
		blocks: {
			type: Array
		}
	},
})
</script>

<style>
.nv-blocks a {
	color: var(--primary-color);
	text-decoration: none;
	text-shadow: 2px 2px 2px var(--primary-opacity-3);
}
.nv-blocks mark {
	background: var(--primary-opacity-1);
	border-radius: 5px;
	color: var(--primary-color);
	padding: 3px 5px;
	margin: 0 3px;
	text-shadow: 0 2px 2px var(--primary-opacity-3), 0 -1px var(--white-default);
}
</style>