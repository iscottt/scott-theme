<template>
	<component :is="`h${data.level}`">{{data.text}}</component>
</template>
<script>
import { defineComponent,computed } from "vue";
export default defineComponent({
	name: 'block-header',
	props: {
		data: {
			type: Object
		}
	},
})
</script>