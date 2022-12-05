<template>
	<div
	class="nv-columns"
	:class="{
		'has-top-border': !!data.borderTop,
		'has-bottom-border': !!data.borderBottom,
		'column-on-mobile': !!data.columnOnMobile,
		'reverse-on-mobile': !!data.reverseOnMobile,
		'align-full': !!data.alignFull,
	}"
	:style="{
		backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : null,
	}"
	>
		<div
		class="nv-col"
		:class="{
			'has-background-color': !!col.backgroundColor,
			'vertical-center': !!col.verticalCenter,
		}"
		:style="colStyle(col)"
		v-for="col in data.columns">
			<blockParser :blocks="col.content.blocks" style="width:100%" />
		</div>
	</div>
</template>
<script>
import { defineComponent,computed } from "vue";
import blockParser from "/@/components/block-parser/parser.vue"
export default defineComponent({
	name: 'block-columns',
	props: {
		data: {
			type: Object
		}
	},
	components: {blockParser},
	methods: {
		colStyle(col) {
			var widthSummary = this.data.columns.map(col=>col.width).reduce( (a,b)=>a+b );
			var width = col.width * 100 /  widthSummary;
			var result = {
				backgroundColor: col.backgroundColor == true ? `var(--gray-9)` : col.backgroundColor,
				paddingLeft: `${col.paddingX}px`,
				paddingRight: `${col.paddingX}px`,
				paddingTop: `${col.paddingY}px`,
				paddingBottom: `${col.paddingY}px`,
				backgroundImage: col.backgroundImage ? `url(${col.backgroundImage})` : null,
				width: `${width}%`
			}
			if (col.paddingX == null) {
				delete result.paddingLeft
				delete result.paddingRight
			}
			if (col.paddingY == null) {
				delete result.paddingTop
				delete result.paddingBottom
			}
			return result;
		},
	}
})
</script>
<style scoped>
.nv-columns {
	display: flex;
	background-size: cover;
	background-position: center;
}
.nv-columns.has-top-border {
	border-top: 1px solid var(--border-color);
}
.nv-columns.has-bottom-border {
	border-bottom: 1px solid var(--border-color);
}
.nv-columns.align-full {
	margin: 0 -3em;
}

.nv-columns .nv-col {
	padding: 30px 60px;
	word-break: break-all;
	position: relative;
}
.nv-columns .nv-col.vertical-center {
	display: flex;
	align-items: center;
}
@media (max-width: 577px) {
	.nv-columns.align-full {
		margin: 0 -1em;
	}
	.nv-columns.column-on-mobile {
		flex-flow: column;
	}
	.nv-columns.column-on-mobile > .nv-col {
		width: 100% !important;
	}
	.nv-columns.reverse-on-mobile {
		flex-direction: row-reverse;
	}
	.nv-columns.column-on-mobile.reverse-on-mobile {
		flex-direction: column-reverse;
	}
}
</style>
<style>
.nv-columns .nv-col .nv-image.align-full {
	margin-left: auto;
	margin-right: auto;
}
</style>