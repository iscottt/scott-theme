<template>
	<div v-if="columns.length">
		<div class="tune-box border-bottom">
			<div class="title">背景图</div>
			<n-input-group style="min-width: 150px;">
				<n-input placeholder="http://" v-model:value="backgroundImage" />
				<n-button type="primary" ghost @click="handleSelectImage"><i class="el-icon-upload2"></i></n-button>
			</n-input-group>
		</div>
		<div class="tune-box border-bottom">
			<div class="flex justify-between mb-4">
				<label>全宽</label>
				<n-switch v-model:value="alignFull"/>
			</div>
			<div class="flex justify-between mb-4">
				<label>上边框</label>
				<n-switch v-model:value="borderTop"/>
			</div>
			<div class="flex justify-between mb-4">
				<label>下边框</label>
				<n-switch v-model:value="borderBottom"/>
			</div>
			<div class="flex justify-between mb-4">
				<label>小屏幕换行</label>
				<n-switch v-model:value="columnOnMobile"/>
			</div>
			<div class="flex justify-between">
				<label>小屏幕反向</label>
				<n-switch v-model:value="reverseOnMobile"/>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'nv-columns-settings',
	components:{
		NInput: nv.components.input,
		NInputGroup: nv.components.inputGroup,
		NButton: nv.components.button,
		NButtonGroup: nv.components.buttonGroup,
		NSwitch: nv.components.switch,
	},
	data(){return{
		columns: [
			/*{
				content: "",
				backgroundColor: "",
				paddingX: null,
				paddingY: null,
				backgroundImage: "",
			}*/
		],
		borderTop: true,
		borderBottom: false,
		backgroundImage: "",
		columnOnMobile: true,
		reverseOnMobile: false,
		alignFull: true,

	}},
	mounted() {
		// 读取上次保存的数据或默认数据
		nv.block.loadDefaultData.bind(this)();
	},
	methods: {
		handleSelectImage() {
			nv.block.mediaSelector({
				multiple: false,
				callback: images=>{
					this.backgroundImage = images[0].urls.original
				}
			})
		}
	},
}
</script>
<style scoped>

</style>