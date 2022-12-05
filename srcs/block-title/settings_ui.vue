<template>
	<div>
		<div class="tune-buttons">
			<button
			class="cdx-settings-button"
			:class="{'cdx-settings-button--active':tag=='h2'}"
			@click="tag='h2'"
			><strong>H2</strong></button>
			<button
			class="cdx-settings-button"
			:class="{'cdx-settings-button--active':tag=='h3'}"
			@click="tag='h3'"
			><strong>H3</strong></button>
			<button
			class="cdx-settings-button"
			:class="{'cdx-settings-button--active':tag=='p'}"
			@click="tag='p'"
			><strong>P</strong></button>
		</div>
		<div class="tune-buttons border-bottom">
			<button
			class="cdx-settings-button"
			:class="{'cdx-settings-button--active':style==1}"
			@click="style=1"
			>样式1</button>
			<button
			class="cdx-settings-button"
			:class="{'cdx-settings-button--active':style==2}"
			@click="style=2"
			>样式2</button>
		</div>
	</div>
</template>
<script>
export default {
	name: 'pandastudio-tip-settings',
	components:{
	},
	data(){return{
		tag: 'h2',
		style: 1,
		text: '',
	}},
	mounted() {
		// 加载默认数据
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