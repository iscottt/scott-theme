<template>
	<div v-html="data.html"></div>
</template>
<script>
import { defineComponent,computed } from "vue";
export default defineComponent({
	name: 'block-raw',
	props: {
		data: {
			type: Object
		}
	},
})
</script>
<style scoped>
div {
	margin: 1em 0;
}
</style>