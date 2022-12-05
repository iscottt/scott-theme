<template>
	<p
	class="nv-image"
	:class="{
		'align-left':data.align=='left',
		'align-center':data.align=='center',
		'align-right':data.align=='right',
		'align-full':data.align=='full',
	}">
		<component
		:is="data.href ? 'a' : 'nullBlock'"
		:href="data.href"
		:target="data.opennew ? '_blank' : '_self'"
		>
			<img
			:class="{
				rounded: data.rounded,
				shadow: data.shadow
			}"
			:src="data.src"
			@click="handleClick"
			/>
		</component>
	</p>
</template>
<script>
import { defineComponent,computed } from "vue";
import nullBlock from "./null.vue"
import createLightbox from "./create-lightbox.js"
export default defineComponent({
	name: 'block-image',
	props: {
		data: {
			type: Object
		}
	},
	components: {
		nullBlock
	},
	methods:{
		handleClick(event) {
			if (this.data.href && !this.data.opennew) {
				event.preventDefault()
				createLightbox(this.data.href)
			}
		}
	}
})
</script>
<style scoped>
img {
	display: block;
	max-width: 100%;
}
.rounded {
	border-radius: .5em;
}
.shadow {
	box-shadow: 0 10px 10px var(--gray-opacity-1);
}
.nv-image.align-left img {
	margin-right: auto;
}
.nv-image.align-center img {
	margin-left: auto;
	margin-right: auto;
}
.nv-image.align-right img {
	margin-left: auto;
}
.nv-image.align-full {
	margin-left: -3em;
	margin-right: -3em;
}
@media (max-width: 577px) {
	.nv-image.align-full {
		margin-left: -1em;
		margin-right: -1em;
	}
}
.nv-image.align-full img {
	width: 100%;
}
</style>

<style>
.nv-columns p.nv-image {
	margin-top: 0;
	margin-bottom: 0;
}
@media (max-width: 577px) {
	.nv-columns.column-on-mobile > .nv-col > div > .nv-image:only-child:not(.align-full) img {
		margin-left: auto;
		margin-right: auto;
	}
}
</style>