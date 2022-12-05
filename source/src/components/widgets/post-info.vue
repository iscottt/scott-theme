<template>
	<div class="widget post-info">
		<widgetTitle>标签与分类</widgetTitle>
		<div class="tags">
			<router-link
			v-for="item in post.taxonomies.tag"
			:to="`/tag/${item.slug}`"
			>
				<svg-icon name="tag" :height="14" /> {{item.name}}
			</router-link>

			<router-link
			v-for="item in post.taxonomies.category"
			:to="`/category/${item.slug}`"
			>
				<svg-icon name="book" :height="14" /> {{item.name}}
			</router-link>
		</div>
	</div>
</template>

<script>
import { defineComponent,computed } from "vue";
import widgetTitle from "./widget-title.vue"
export default defineComponent({
	name: 'post-info',
	components: {
		widgetTitle
	},
	props: {
		post: Object,
	}
})
</script>
<style lang="less">
.post-info .tags {
	display: flex;
	flex-wrap: wrap;
	grid-gap: .45em;
	margin-top: .8em;
	a {
		z-index: 0;
		text-decoration: none;
		font-size: 87.5%;
		color: var(--text-color-3);
		background-color: var(--white-opacity-8);
		text-shadow: 0 1px var(--white-default);
		padding: .25em .9em .25em .6em;
		border-radius: .5em;
		box-shadow: 0 .7em .8em var(--gray-opacity-1), 0 0 0 1px var(--white-default) inset;
		transition: .25s;
		display: flex;
		align-items: center;
		grid-gap: .35em;
		&:hover {
			color: var(--white-default);
			box-shadow: 0 .15em .2em var(--primary-opacity-3), 0 0 0 -100px var(--white-default) inset;
			transform: translateY(.36em);
			text-shadow: 0 2px 2px var(--primary-color),0 3px 3px var(--primary-color);
			background-color: var(--analogous-color);
			background-image: linear-gradient(100deg,var(--primary-color),transparent);
		}
	}
}
</style>