<template>
	<div class="tune-buttons border-bottom">
		<button
		class="cdx-settings-button"
		@click="handleTypeSelect('')"
		>
			<div class="color-selector" :class="{active: type==''}"></div>
		</button>
		<button
		class="cdx-settings-button"
		@click="handleTypeSelect('success')"
		>
			<div class="color-selector success" :class="{active: type=='success'}"></div>
		</button>
		<button
		class="cdx-settings-button"
		@click="handleTypeSelect('warning')"
		>
			<div class="color-selector warning" :class="{active: type=='warning'}"></div>
		</button>
		<button
		class="cdx-settings-button"
		@click="handleTypeSelect('error')"
		>
			<div class="color-selector error" :class="{active: type=='error'}"></div>
		</button>
	</div>
</template>
<script>
export default {
	name: 'nv-tip-settings',
	components:{
	},
	data(){return{
		type: "",
		title: "",
		content: {},
	}},
	mounted() {
		// 读取上次保存的数据或默认数据
		nv.block.loadDefaultData.bind(this)();
	},
	methods: {
		handleTypeSelect(type) {
			this.type = type;
		}
	},
}
</script>
<style scoped>
.color-selector {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	color: var(--primary-color);
	background-color: currentColor;
	box-shadow: 0 0 0 0 transparent, 0 0 0 0 transparent;
	transition: .35s;
	
}
.color-selector.success {
	color: var(--success-color);
}
.color-selector.warning {
	color: var(--warning-color);
}
.color-selector.error {
	color: var(--error-color);
}
.color-selector.active {
	box-shadow: 0 0 0 2px var(--base-color), 0 0 0 4px currentColor;
}
</style>