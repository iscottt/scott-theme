<template>
	<n-modal :show="visibility" @update:show="handleCancel" style="width:600px" preset="dialog" :show-icon="false">
		<template #header>
			插入 FontAwesome 图标
		</template>
		<n-el>
			<NInputGroup class="mb-5">
				<NInput placeholder="搜索图标名称..." :value="fa_query" @update:value="handleQueryUpdate" :clearable style="width: 200%">
					<template #prefix>
						<i class="el-icon-search"></i>
					</template>
				</NInput>
				<NSelect
				v-model:value="animation"
				:options="[
					{label: '无动画',value: ''},
					{label: 'Beat',value: 'fa-beat'},
					{label: 'Fade',value: 'fa-fade'},
					{label: 'Beat-Fade',value: 'fa-beat-fade'},
					{label: 'Bounce',value: 'fa-bounce'},
					{label: 'Flip',value: 'fa-flip'},
					{label: 'Shake',value: 'fa-shake'},
					{label: 'Spin',value: 'fa-spin'},
				]"></NSelect>
				<NSelect
				v-model:value="size"
				:options="[
					{label: '超级小',value: 'fa-2xs'},
					{label: '很小',value: 'fa-xs'},
					{label: '小',value: 'fa-sm'},
					{label: '正常',value: ''},
					{label: '大',value: 'fa-lg'},
					{label: '加大',value: 'fa-xl'},
					{label: '加加大',value: 'fa-2xl'},
				]"></NSelect>
			</NInputGroup>
			<div class="icons">
				<div
				class="font"
				v-for="className in onshow_icons_class.filter((item,index)=>index >= icons_per_page * (current_page - 1) && index < icons_per_page * current_page)"
				:class="{
					active: selectedClassName == className
				}"
				@click="selectedClassName = className"
				@dblclick="()=>{handleConfirm(className)}"
				>
					<i :class="[className,animation,size]"></i>
				</div>
			</div>
			<NPagination v-model:page="current_page" :item-count="onshow_icons_class.length" :page-size="icons_per_page" class="mt-5 justify-center" :page-slot="7"/>
		</n-el>
		<template #action>
			<n-el>
				<button class="nv-button mr-4" @click="handleCancel">取消</button>
				<button class="nv-button primary" @click="handleConfirm(selectedClassName)" :disabled="!selectedClassName">插入</button>
			</n-el>
		</template>
	</n-modal>
</template>

<script>
import {defineComponent} from 'vue'
const {
	button: NButton,
	modal: NModal,
	element: NEl,
	input: NInput,
	pagination: NPagination,
	inputGroup: NInputGroup,
	select: NSelect,
} = nv.components
export default defineComponent({
	name:"paragraph-with-align-settings-ui",
	props: ['visibility'],
	components: {
		NButton,
		NModal,
		NEl,
		NInput,
		NPagination,
		NInputGroup,
		NSelect,
	},
	data(){return{
		fa_icons: {},
		fa_categories: {},
		fa_query: "",
		selectedClassName: "",
		icons_per_page: 36,
		current_page: 1,
		animation: "",
		size: "",
	}},
	watch: {
		visibility(val) {
			if (val) {
				this.get_fa_icons();
			}
		}
	},
	computed: {
		onshow_icons_class() {
			var classes = [];
			Object.keys(this.fa_icons).forEach(name=>{
				if (name.includes(this.fa_query)) {
					this.fa_icons[name].forEach(style=>{
						classes.push(`fa-${style} fa-${name}`)
					})
				}
			})
			return classes;
		},
	},
	methods: {
		get_fa_icons() {
			if (window.niRvana_FontAwesome) {
				this.fa_icons = window.niRvana_FontAwesome.icons;
				this.fa_categories = window.niRvana_FontAwesome.categories;
				return;
			}
			nv.axios({
				method: 'post',
				url: `${location.port==3000?"/vite-proxy":""}/nirvana/get-fontawesome-infos`,
			})
			.then(({data})=>{
				window.niRvana_FontAwesome = {}
				window.niRvana_FontAwesome.icons = data.icons;
				window.niRvana_FontAwesome.categories = data.categories;
				this.fa_icons = data.icons;
				this.fa_categories = data.categories;
			})
			.catch((error)=>{
				$message.error('读取FontAwesome失败')
			})
		},
		handleConfirm(className) {
			this.$emit('update:visibility',false)
			var iconClass = [className];
			this.animation && iconClass.push(this.animation)
			this.size && iconClass.push(this.size)
			this.$emit('iconConfirm',iconClass.join(' '))
		},
		handleCancel() {
			this.$emit('update:visibility',false)
		},
		handleQueryUpdate(val) {
			this.fa_query = val;
			this.current_page = 1;
			this.selectedClassName = "";
		}
	}
})
</script>

<style scoped>
.icons {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}
.font {
	width: 48px;
	height: 48px;
	margin: 5px;
	background: var(--divider-color);
	border-radius: 8px;
	font-size: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	outline: 2px solid transparent;
	transition: .25s;
}
.font:hover {
	background: var(--primary-opacity-2);
	outline-color: var(--primary-color);
	transition: .1s;
}
.font.active {
	background: var(--primary-color);
	box-shadow: 0 3px 5px var(--primary-opacity-4);
	outline-color: transparent;
	color: #fff;
	transition: .25s;
}
</style>