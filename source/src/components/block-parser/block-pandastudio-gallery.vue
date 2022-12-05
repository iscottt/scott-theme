<template>
	<div
	class="pandastudio-gallery"
	:class="{
		'align-left':data.align=='left',
		'align-center':data.align=='center',
		'align-right':data.align=='right',
	}">
		<div
		class="image" 
		:style="{backgroundImage:`url(${image.thumbnail || image.original})`}"
		v-for="image in data.images"
		@click="handleClick(image.original)"></div>
	</div>
</template>
<script>
import { defineComponent,computed } from "vue";
import createLightbox from "./create-lightbox.js"
export default defineComponent({
	name: 'block-gallery',
	props: ['data'],
	methods: {
		handleClick(src) {
			createLightbox(src)
		}
	}
})
</script>
<style scoped>
.pandastudio-gallery {
	margin: 1em 0;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}
.pandastudio-gallery.align-left {
	justify-content: flex-start;
}
.pandastudio-gallery.align-center {
	justify-content: center;
}
.pandastudio-gallery.align-right {
	justify-content: flex-end;
}
.image {
	width: 140px;
	height: 140px;
	background-color: var(--divider-color);
	background-size: cover;
	background-position: center;
	border-radius: 5px;
	cursor: pointer;
	transition: .25s;
}
.image:hover {
	background-color: var(--primary-opacity-1);
	border-color: var(--primary-color);
	box-shadow: 0 0 0 1px var(--primary-color),0 0 0 3px var(--primary-opacity-2);
	color: var(--primary-color);
}
</style>