<template>
	<figure :data-alignment="data.alignment" class="block-quote">
		<blockquote>
			<p v-html="data.text"></p>
		</blockquote>
		<figcaption v-html="'—— '+data.caption"></figcaption>
	</figure>
</template>
<script>
import { defineComponent,computed } from "vue";
export default defineComponent({
	name: 'block-quote',
	props: {
		data: {
			type: Object
		}
	},
})
</script>
<style scoped lang="less">
figure {
	margin: 1.5em 0;
}
blockquote {
	background: var(--bg-color);
	padding: .1px 1em;
	margin: 0;
	border-radius: .4em;
}
p {
	background: url("/@/components/block-parser/quote.svg") no-repeat left top / 1.5em;
	padding-left: 2em;
	text-shadow: 0 1px var(--white-default);
}
figure[data-alignment=center] {
	display: flex;
	align-items: center;
	flex-direction: column;
}
figcaption {
	font-size: 85%;
	margin-top: .5em;
	color: var(--text-color-3);
	text-align: right;
}
</style>
<style>
.block-quote a {
	color: var(--primary-color);
	text-decoration: none;
	text-shadow: 2px 2px 2px var(--primary-opacity-3);
}
</style>