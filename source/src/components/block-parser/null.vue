<template>
	<slot />
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
	name: 'null-block',
	props: ['href','target'],
})
</script>