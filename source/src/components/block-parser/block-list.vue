<template>
	<component :is="`${data.style == 'ordered' ? 'ol' : 'ul'}`" class="block-list">
		<li v-for="item in data.items" >
			<div>
				<div v-html="item.content"></div>
				<block-list v-if="item.items && item.items.length > 0" :data="{style:data.style, items: item.items}" />
			</div>
		</li>
	</component>
</template>
<script>
import { defineComponent,computed } from "vue";
export default defineComponent({
	name: 'block-list',
	props: {
		data: {
			type: Object
		}
	},
})
</script>
<style scoped lang="less">
ol,ul {
	padding-left: 0;
}
li {
	list-style: none;
	display: flex;
	&:before {
		margin-right: .4em;
	}
}
ol {
	counter-reset: i;
	li {
		&:before {
			content: counters(i, ".") ".";
			counter-increment: i;
		}
	}
}
ul {
	li {
		&:before {
			content: "•";
		}
	}
}
</style>