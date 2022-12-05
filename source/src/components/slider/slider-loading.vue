<template>
	<div class="container flex flex-col items-center justify-center">
		<div class="title">加载中...</div>
	</div>
</template>
<script>
import { defineComponent,computed } from "vue";
import moment from "moment"

import { NSpin } from 'naive-ui'

export default defineComponent({
	name: 'nv-slider-article',
	components: {
	},
	watch: {
	},
	data(){return {
		moment
	}},
	mounted() {
	},
	methods:{
	},
	beforeUnmount() {
	}
})
</script>

<style scoped lang="less">
.container {
	height: 344px;
	color: #fff;
	text-shadow: 0 3px 5px rgba(0,0,0,.3);
	@media (max-width:991.5px) {
		height: 200px;
	}
	@media (max-width:767.5px) {
		height: 200px;
	}
}
.title {
	font-size: 32px;
}
@media (max-width:991.5px) {
	.title {
		font-size: 24px;
	}
}
@media (max-width:767.5px) {
	.title {
		font-size: 18px;
	}
}
</style>