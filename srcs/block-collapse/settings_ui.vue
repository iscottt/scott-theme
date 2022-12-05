<template>
	<div class="tune-buttons">
		123
	</div>
</template>
<script>
export default {
	name: 'pandastudio-collapse-settings',
	data(){return{
		title: '',
		content: null,
	}},
	mounted() {
		// 加载默认数据
		nv.block.loadDefaultData.bind(this)();
	},
	methods: {
	},
}
</script>