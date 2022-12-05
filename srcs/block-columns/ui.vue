<template>
	<div
	class="nv-columns"
	:class="{
		'has-top-border': !!borderTop,
		'has-bottom-border': !!borderBottom,
		'column-on-mobile': !!columnOnMobile,
		'reverse-on-mobile': !!reverseOnMobile,
		'align-full': !!alignFull,
	}"
	:style="{
		backgroundImage: backgroundImage ? `url(${backgroundImage})` : null,
	}"
	>
		<template v-if="columns.length">
			<div
			class="nv-col"
			:class="{
				'has-background-color': !!col.backgroundColor,
				'vertical-center': !!col.verticalCenter,
			}"
			:style="colStyle(col)"
			v-for="col in columns"
			:key="col"
			>
				<nvPopover overlap trigger="click" :ref="`popover_${columns.indexOf(col)}`">
					<template #trigger>
						<svg class="icon icon--dots col-setting-btn" width="16px" height="16px"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#dots"></use></svg>
					</template>
					<nvEl style="width: 200px;margin: -7px -11px">
						<div class="tune-box border-bottom grid cols-5 items-center place-items-center">
							<nvTooltip>
								<template #trigger><div class="cdx-settings-button" @click="handleMoveTo(col,-1)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width:15px"><path fill="currentColor" d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"/></svg></div></template>
								左移
							</nvTooltip>
							<nvTooltip>
								<template #trigger><div class="cdx-settings-button" @click="handleInsert(col,0)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width:19px;border-right:2px solid;padding-right:2px;"><path fill="currentColor" d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg></div></template>
								左侧插入
							</nvTooltip>
							<nvTooltip>
								<template #trigger><removeButtton :action="()=>{handleRemove(col)}" /></template>
								移除
							</nvTooltip>
							<nvTooltip>
								<template #trigger><div class="cdx-settings-button" @click="handleInsert(col,1)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width:19px;border-left:2px solid;padding-left:2px;"><path fill="currentColor" d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg></div></template>
								右侧插入
							</nvTooltip>
							<nvTooltip>
								<template #trigger><div class="cdx-settings-button" @click="handleMoveTo(col,1)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width:15px"><path fill="currentColor" d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"/></svg></div></template>
								右移
							</nvTooltip>
						</div>
						<div class="tune-box">
							<div class="flex justify-between title">
								<span>宽度</span>
								<nvButton type="primary" text v-show="showAverage()" @click="handleAverage">平均分布</nvButton>
							</div>
							<nvSlider v-model:value="col.width" :min="50" :max="500" :tooltip="false" />

							<div class="flex justify-between mt-4 title">
								<span>
									水平内边距
								</span>
								<nvButton type="primary" text v-show="col.paddingX!==null" @click="col.paddingX=null">恢复默认</nvButton>
							</div>
							<div class="flex items-center">
								<nvSlider v-model:value="col.paddingX" :min="0" :max="300" :tooltip="col.paddingX!==null" :format-tooltip="val=>{return `${val}px`}"/>
								<nvInputNumber v-model:value="col.paddingX" :show-button="false" class="ml-2 -mt-2" style="width: 60px" placeholder="px" size="small" />
							</div>

							<div class="flex justify-between mt-4 title">
								<span>
									垂直内边距
								</span>
								<nvButton type="primary" text v-show="col.paddingY!==null" @click="col.paddingY=null">恢复默认</nvButton>
							</div>
							<div class="flex items-center">
								<nvSlider v-model:value="col.paddingY" :min="0" :max="300" :tooltip="col.paddingY!==null" :format-tooltip="val=>{return `${val}px`}"/>
								<nvInputNumber v-model:value="col.paddingY" :show-button="false" class="ml-2 -mt-2" style="width: 60px" placeholder="px" size="small" />
							</div>

							<div class="flex justify-between items-center mt-4">
								<nv-checkbox v-model:checked="col.verticalCenter">垂直居中</n-checkbox>
							</div>

							<div class="flex justify-between items-center mt-4">
								<div><nv-checkbox :checked="!!col.backgroundColor" @update:checked="val=>{col.backgroundColor=val?true:''}">背景色</n-checkbox></div>
								<nv-color-picker style="width: 50px" :render-label="()=>{}" :value="col.backgroundColor == true ? '' :col.backgroundColor " @update:value="val=>{col.backgroundColor=val}" :disabled="!col.backgroundColor"/>
							</div>
						</div>
					</nvEl>
				</nvPopover>
				<innerBlocks v-model:value="col.content" style="width:100%" />
			</div>
		</template>
		<div class="nv-empty-cols pl-4 pr-4" v-else>
			<div class="title pt-15 pb-10">新增列</div>
			<div class="cols pb-15 flex justify-center">
				<div @click="setCols(i)" v-for="i in 5" class="col-btn">
					<div class="example grid mb-3" :class="[`cols-${i}`]">
						<div v-for="i in i" class="example-col"></div>
					</div>
					{{i}}列
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import removeButtton from "./remove_btn.vue"
export default {
	name: 'nv-columns',
	components:{
		removeButtton,
		innerBlocks: nv.components.innerBlocks,
		nvPopover:nv.components.popover,
		nvTooltip:nv.components.tooltip,
		nvSlider:nv.components.slider,
		nvButton:nv.components.button,
		nvInputNumber:nv.components.inputNumber,
		nvCheckbox:nv.components.checkbox,
		nvColorPicker:nv.components.colorPicker,
		nvEl:nv.components.element,
		nvSwitch:nv.components.switch,
	},
	data(){return {
		columns: [
			/*{
				content: "",
				backgroundColor: "",
				paddingX: null,
				paddingY: null,
				backgroundImage: "",
				width: 100,
				verticalCenter: false,
			}*/
		],
		borderTop: false,
		borderBottom: false,
		backgroundImage: "",
		columnOnMobile: true,
		reverseOnMobile: false,
		alignFull: false,
	}},
	computed: {
		cols() {
			return this.columns.length;
		}
	},
	mounted() {
		nv.block.loadDefaultData.bind(this)();
	},
	methods: {
		setCols(count) {
			for (var i = 0; i < count; i++) {
				this.columns.push({
					content: {},
					backgroundColor: i%2 ? true : '',
					paddingX: null,
					paddingY: null,
					backgroundImage: "",
					width: 100,
					verticalCenter: false,
				})
			}
		},
		showAverage() {
			return this.columns.some(col=>col.width !== 100);
		},
		handleAverage() {
			this.columns.forEach(col=>col.width = 100)
		},
		colStyle(col) {
			var widthSummary = this.columns.map(col=>col.width).reduce( (a,b)=>a+b );
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
		handleRemove(col) {
			var index = this.columns.indexOf(col);
			this.columns.splice(index,1);
		},
		handleMoveTo(col,position) {
			var index = this.columns.indexOf(col);
			if (position == -1 && index == 0) {
				return $message.info('已经在最左侧了')
			}
			if (position == 1 && index == this.columns.length - 1) {
				return $message.info('已经在最右侧了')
			}

			this.columns.splice(index,1)
			this.columns.splice(index + position,0,col)

			this.$nextTick(()=>{
				this.$refs[`popover_${this.columns.indexOf(col)}`].syncPosition();
				nv.block.editor.focus()
			})
		},
		handleInsert(col,position) {
			var index = this.columns.indexOf(col);
			this.columns.splice(index+position,0,{
				content: {},
					backgroundColor: true,
					paddingX: null,
					paddingY: null,
					backgroundImage: "",
					width: 100,
					verticalCenter: false,
			});
			this.$nextTick(()=>{
				this.$refs[`popover_${this.columns.indexOf(col)}`].syncPosition();
				nv.block.editor.focus()
			})
		},
	}
}
</script>
<style scoped>
.nv-columns {
	display: flex;
	background-size: cover;
	background-position: center;
	/*grid-template-columns: repeat(v-bind(cols), minmax(0, 1fr));*/
}
.nv-columns:hover .nv-col {
	outline: 1px dashed var(--border-color);
}
.nv-columns.has-top-border {
	border-top: 1px solid var(--border-color);
}
.nv-columns.has-bottom-border {
	border-bottom: 1px solid var(--border-color);
}
.nv-columns.align-full {
	margin: -.4em -60px;
}
@media (max-width: 650.5px) {
	.nv-columns.align-full {
		margin: -.4em -15px;
	}
}
.nv-columns .nv-col {
	padding: 30px 60px;
	word-break: break-all;
	position: relative;
}
.nv-columns .col-setting-btn {
	position: absolute;
	left: 50%;
	top: 0;
	transform: translateX(-50%) translateY(-100%) rotate(90deg);
	opacity: 0;
	transition: .25s ease .5s;
	cursor: pointer;
}
.nv-columns .nv-col:hover .col-setting-btn {
	opacity: .5;
	transition: .25s;
}
.nv-columns .nv-col.vertical-center {
	display: flex;
	align-items: center;
}
.nv-empty-cols {
	background: var(--divider-color);
	border: 1px solid var(--border-color);
	width: 100%;
	text-align: center;
	text-shadow: 0 1px var(--white-default);
	color: var(--text-color-3);
}
.nv-empty-cols .title {
	font-size: 20px;
	border: none;
}
.nv-empty-cols .cols .example {
	width: 50px;
	margin-left: auto;
	margin-right: auto;
}
.nv-empty-cols .cols .example-col {
	border: 1px solid currentColor;
	height: 50px;
}
.nv-empty-cols .cols .example-col + .example-col {
	margin-left: -1px;
}
.nv-empty-cols .col-btn {
	padding: 15px 0;
	flex-grow: 1;
	max-width: 150px;
	cursor: pointer;
	border-radius: 8px;
	transition: .25s;
}
.nv-empty-cols .col-btn:hover {
	color: var(--text-color);
	background: var(--border-color);
}
</style>
<style>
.nv-columns .nv-col .nv-image.align-full {
	margin-left: auto;
	margin-right: auto;
}	
</style>