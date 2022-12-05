<template>
	<div
	class="pandastudio-download"
	:class="{
		'align-left':data.align=='left',
		'align-center':data.align=='center',
		'align-right':data.align=='right',
	}"
	>
		<div class="get-it">
			<a class="main flex items-center justify-center" target="_blank" :href="data.url" @click="handleClick">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="14" class="arrow mr-3"><path d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"/></svg>
				Get it
			</a>
			<n-popover v-if="data.links.length" raw class="nv-popover">
				<template #trigger>
					<div class="more flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width="4"><path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z"/></svg>
					</div>
				</template>
				<div class="title">更多链接</div>
				<div class="content">
					<div class="link-item" v-for="link in data.links">
						<a target="_blank" :href="link.url" @click="handleClick">{{link.title || '未标题'}}</a>
					</div>
				</div>
			</n-popover>
		</div>
	</div>
</template>
<script>
import { defineComponent } from "vue";
import { NPopover } from "naive-ui";

export default defineComponent({
	name: 'block-download',
	components: {NPopover},
	props: {
		data: {
			type: Object
		}
	},
	methods: {
		handleClick(event) {
			if (this.data.need_reply) {
				event.preventDefault();
				$notification.warning({
					title: "请认真评论后再下载",
					content: "评论时务必填写邮箱，审核通过后将邮件通知您。届时使用您的邮箱登录网站即可查看",
					duration: 20000,
				})
			}
		}
	}
})
</script>
<style lang="less" scoped>
.pandastudio-download {
	margin: 1em 0;
}
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
	margin-right: 8px;
	color: var(--primary-color);
	filter: drop-shadow(0 2px 1px var(--primary-opacity-3));
	animation: arrow-animation .5s infinite alternate;
}
@keyframes arrow-animation {
	0% {transform: translateY(-6px);opacity:.5}
	100% {transform: translateY(0);opacity:1;}
}
.get-it {
	width: 120px;
	cursor: pointer;
	display: flex;
}
.get-it .main {
	flex-grow: 1;
	font-size: 18px;
	border: 1px solid var(--border-color);
	padding: 7px 0;
	border-radius: 8px 0 0 8px;
	text-align: center;
	box-shadow: 0 2px var(--gray-opacity-1);
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
	box-shadow: 0 2px var(--gray-opacity-1);
	color: var(--text-color-3);
}
.get-it .more:hover {
	color: var(--primary-color);
}
svg path {
	fill: currentColor;
}
.link-item {
	font-size: 14px;
	border-radius: 5px;
	padding: 5px 7px;
	margin: 0 -7px;
	transition: .25s;
	&:hover {
		background-color: var(--primary-opacity-1);
	}
	a {
		color: var(--primary-color);
		text-decoration: none;
		text-shadow: 0 2px 2px var(--primary-opacity-3);
		display: block;
	}
}
</style>