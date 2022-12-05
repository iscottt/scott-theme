<template>
	<div>
		<div class="tune-buttons">
			<NTooltip>
				<template #trigger>
					<button
					class="cdx-settings-button"
					@click="e=>{handleOpenFaSelector(e)}"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width:14px"><path d="M448 48V384C385 407 366 416 329 416C266 416 242 384 179 384C159 384 143 388 128 392V328C143 324 159 320 179 320C242 320 266 352 329 352C349 352 364 349 384 343V135C364 141 349 144 329 144C266 144 242 112 179 112C128 112 104 133 64 141V448C64 466 50 480 32 480S0 466 0 448V64C0 46 14 32 32 32S64 46 64 64V77C104 69 128 48 179 48C242 48 266 80 329 80C366 80 385 71 448 48Z"/></svg>
					</button>
				</template>
				插入FontAwesome图标
			</NTooltip>
			<button
			class="cdx-settings-button"
			:class="{'cdx-settings-button--active': align == 'left'}"
			@click="e=>{handleToggleAlign(e,'left')}"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width:14px"><path d="M256 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H256C273.7 32 288 46.33 288 64C288 81.67 273.7 96 256 96zM256 352H32C14.33 352 0 337.7 0 320C0 302.3 14.33 288 32 288H256C273.7 288 288 302.3 288 320C288 337.7 273.7 352 256 352zM0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224H32C14.33 224 0 209.7 0 192zM416 480H32C14.33 480 0 465.7 0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480z"/></svg>
			</button>
			<button
			class="cdx-settings-button"
			:class="{'cdx-settings-button--active': align == 'center'}"
			@click="e=>{handleToggleAlign(e,'center')}"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width:14px"><path d="M320 96H128C110.3 96 96 81.67 96 64C96 46.33 110.3 32 128 32H320C337.7 32 352 46.33 352 64C352 81.67 337.7 96 320 96zM416 224H32C14.33 224 0 209.7 0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224zM0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480H32C14.33 480 0 465.7 0 448zM320 352H128C110.3 352 96 337.7 96 320C96 302.3 110.3 288 128 288H320C337.7 288 352 302.3 352 320C352 337.7 337.7 352 320 352z"/></svg>
			</button>
			<button
			class="cdx-settings-button"
			:class="{'cdx-settings-button--active': align == 'right'}"
			@click="e=>{handleToggleAlign(e,'right')}"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width:14px"><path d="M416 96H192C174.3 96 160 81.67 160 64C160 46.33 174.3 32 192 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96zM416 352H192C174.3 352 160 337.7 160 320C160 302.3 174.3 288 192 288H416C433.7 288 448 302.3 448 320C448 337.7 433.7 352 416 352zM0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224H32C14.33 224 0 209.7 0 192zM416 480H32C14.33 480 0 465.7 0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480z"/></svg>
			</button>
		</div>
		<div class="tune-box border-top border-bottom">
			<div class="title flex justify-between">
				字号
				<n-button type="primary" text @click="e=>{handelResetFontSize(e)}" v-show="fontSize">恢复默认</n-button>
			</div>
			<n-slider :min="12" :max="72" :value="fontSize || 0" @update:value="val=>{fontSize = val}" style="width: 120px" :tooltip="!!fontSize" />

			<div class="flex justify-between items-center mt-5">
				<NCheckbox :checked="!!color" @update:checked="handleColorChecked" @click="e=>{e.stopPropagation()}">颜色</NCheckbox>
				<NColorPicker
				v-model:value="_color"
				size="small"
				style="width: 28px;"
				:disabled="!_color"
				@complete="hancleColorComplete"
				>
					<template #label></template>
				</NColorPicker>
			</div>
		</div>
		<modalFaSelector v-model:visibility="modalFaVisible" @iconConfirm="hanldeIconConfirm" />
	</div>
</template>

<script>
import {defineComponent} from 'vue'
import modalFaSelector from './modal_fa_selector.vue'
const {
	slider: NSlider,
	button: NButton,
	colorPicker: NColorPicker,
	checkbox: NCheckbox,
	tooltip: NTooltip,
} = nv.components

export default defineComponent({
	name:"paragraph-with-align-settings-ui",
	props: ['rawEl','rawData'],
	components: {
		NSlider,
		NButton,
		NColorPicker,
		NCheckbox,
		modalFaSelector,
		NTooltip,
	},
	data(){return{
		align: this.rawData.align,
		fontSize: this.rawData.fontSize,
		color: this.rawData.color,
		_color: this.rawData.color,
		modalFaVisible: false,
	}},
	watch: {
		fontSize() {
			this.fresh();
		},
		color(val) {
			this._color = val;
			this.fresh();
		},
	},
	methods: {
		handleToggleAlign(event,align) {
			event.stopPropagation();
			event.preventDefault();
			this.align = align;
			this.fresh();
		},
		handelResetFontSize(event) {
			event.stopPropagation();
			event.preventDefault();
			this.fontSize = '',
			this.fresh();
		},
		handelResetColor(event) {
			event.stopPropagation();
			event.preventDefault();
			this.color = '',
			this.fresh();
		},
		handleColorChecked(checked) {
			if (checked) {
				this.color = 'rgba(32,160,255,1)'
			} else {
				this.color = ''
			}
		},
		hancleColorComplete(color) {
			this.color = color;
			this.$emit('forceUpdate')
		},
		fresh() {
			//存储data和ui
			this.rawData.align = this.align;
			this.rawData.fontSize = this.fontSize;
			this.rawData.color = this.color;
			this.rawEl.classList.remove('ce-paragraph--left','ce-paragraph--center','ce-paragraph--right');
			this.rawEl.classList.add(`ce-paragraph--${this.align}`);
			this.rawEl.style.fontSize = this.fontSize ? `${this.fontSize}px` : '';
			this.rawEl.style.color = this.color || '';
		},
		handleOpenFaSelector(event) {
			event.stopPropagation();
			event.preventDefault();
			// 先保存要添加的位置
			this.anchorNode = window.getSelection().anchorNode;
			if (this.anchorNode && this.anchorNode.nodeType == 3) {
				// 选择图标
				this.modalFaVisible = true;
			} else {
				$message.info('请先点击要插入图标的位置')
			}
		},
		hanldeIconConfirm(iconClassName) {
			var icon = document.createElement('span');
			icon.classList.add(...iconClassName.split(' '))
			this.anchorNode.after(icon);
			this.$emit('forceUpdate')
		}
	}
})
</script>