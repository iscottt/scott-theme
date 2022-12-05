<template>
	<div
	class="pandastudio-download"
	:class="{
		'align-left':align=='left',
		'align-center':align=='center',
		'align-right':align=='right',
	}"
	>
		<div class="get-it">
			<div class="main">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="14" class="arrow mr-3"><path d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"/></svg>
				Get it
			</div>
			<div class="more" v-if="links.length">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width="4"><path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z"/></svg>
			</div>
		</div>
		<div v-show="false">{{links}}{{url}}{{need_reply}}</div>
	</div>
</template>
<script>
export default {
	name: 'pandastudio-download-block',
	components: {
		NInput: nv.components.input,
		NButton: nv.components.button,
	},
	data(){return {
		need_reply: false,
		align: '',
		url: '',
		links: [],
	}},
	mounted() {
		// 加载默认数据
		nv.block.loadDefaultData.bind(this)();
	},
}
</script>
<style scoped>
.pandastudio-download.align-left .get-it {
	margin-right: auto;
}
.pandastudio-download.align-center .get-it {
	margin-left: auto;
	margin-right: auto;
}
.pandastudio-download.align-right .get-it {
	margin-left: auto;
}
.arrow {
	color: var(--primary-color);
	filter: drop-shadow(0 2px 1px var(--primary-opacity-3));
	animation: arrow-animation .5s infinite alternate;
}
@keyframes arrow-animation {
	0% {transform: translateY(-8px);opacity:.5}
	100% {transform: translateY(-2px);opacity:1;}
}
.get-it {
	width: 120px;
	cursor: default;
	display: flex;
}
.get-it .main {
	flex-grow: 1;
	font-size: 18px;
	border: 1px solid var(--border-color);
	padding: 7px 0;
	border-radius: 8px 0 0 8px;
	text-align: center;
	box-shadow: 0 2px var(--divider-color);
	color: var(--primary-color);
	text-shadow: 0 2px 2px var(--primary-opacity-3);
	transition: .25s;
}
.get-it .main:only-child {
	border-radius: 8px;
}
.get-it .main:hover {
	border-color: var(--primary-color);
	box-shadow: 0 2px var(--primary-opacity-3);
}
.get-it .more {
	border: 1px solid var(--border-color);
	border-left: 0;
	padding: 7px;
	border-radius: 0 8px 8px 0;
	box-shadow: 0 2px var(--divider-color);
	color: var(--text-color-3);
}
.get-it .more:hover {
	color: var(--primary-color);
}
</style>