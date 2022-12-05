<template>
	<pf-scroller is="div" class="block-table">
		<table>
			<thead v-if="data.withHeadings">
				<tr>
					<th v-for="th in data.content[0]" v-html="th"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="tr in (data.withHeadings ? data.content.slice(1) : data.content)">
					<td v-for="td in tr" v-html="td"></td>
				</tr>
			</tbody>
		</table>
	</pf-scroller>
</template>
<script>
import { defineComponent,computed } from "vue";
export default defineComponent({
	name: 'block-table',
	props: {
		data: {
			type: Object
		}
	},
})
</script>
<style scoped lang="less">
table {
	width: 100%;
	border-collapse: collapse;
}
th,td {
	&:not(:last-child) {
		border-right: 1px solid var(--border-color-2);
	}
	text-align: left;
	padding: .35em .8em;
}
tr {
	border-top: 1px solid var(--border-color-2);
	border-bottom: 1px solid var(--border-color-2);
	&:first-child {
		border-top-width: 2px;
	}
	&:last-child {
		border-bottom-width: 2px;
	}
}
thead tr {
	color: var(--text-color-2);
}
div {
	margin: 1em 0;
}
</style>
<style>
.block-table a {
	color: var(--primary-color);
	text-decoration: none;
	text-shadow: 2px 2px 2px var(--primary-opacity-3);
}
</style>