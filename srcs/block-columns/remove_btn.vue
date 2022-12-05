<template>
	<div
	class="cdx-settings-button"
	:class="{
		'ce-settings__button--confirm': confirm
	}"
	@click="handelClick"
	><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width:13px"><path fill="currentColor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg></div>
</template>
<script>
export default {
	name: 'nv-block-remove-button',
	props: ['action'],
	data(){return {
		confirm: false,
	}},
	methods: {
		handelClick() {
			if (this.confirm) {
				if (typeof(this.action) == 'function') {
					this.action();
				} else {
					console.log('nv-remove-button: action prop is not a function')
				}
			} else {
				this.confirm = true;
			}
		}
	}
}
</script>
<style scoped>
.cdx-settings-button,svg {
	transition: .35s;
}
.ce-settings__button--confirm {
	color: #fff;
}
.ce-settings__button--confirm svg{
	transform: rotate(90deg);
}
</style>