<template>
	<component :is="name" class="svg-icon" :height="height"/>
</template>

<script>
const files = import.meta.globEager('./svg/*.vue');
const modules = {};
for (const key in files) {
	modules[key.replace(/(\.\/svg\/|\.vue)/g, '')] = files[key].default
}
import { defineComponent,h } from "vue";
export default defineComponent({
	name: 'svg-icon',
	components: {
		...modules
	},
	props: {
		name: String,
		height: {
			default: 16
		},
	},
	data(){return {

	}},
	watch: {

	},
	mounted() {
	},
	methods:{
		
	}
})
</script>
<style scoped>
.svg-icon {
  vertical-align: -0.125em;
  fill: currentColor;
}
</style>