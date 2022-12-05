<template>
	<div class="four04 flex flex-col justify-center items-center">
		<div class="title">Lost</div>
		<p>放眼望去，这里一片荒芜，只剩白雪茫茫……<br>疲惫的旅人，您迷路了吗？</p>
		<p><button @click="$router.replace('/')">带我回家</button></p>
	</div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
	name: '404',
	watch: {
		'$store.state.theme_settings.nv_site_name'() {
			document.title = `${this.$store.state.theme_settings.nv_site_name} - Lost`;
		},
	},
	mounted() {
		document.title = `${this.$store.state.theme_settings.nv_site_name} - Lost`;
	}
})
</script>
<style lang='less'>
.four04 {
	text-align: center;
	height: 100vh;
	background: linear-gradient(var(--gray-0),transparent);
	color: #fff;
	text-shadow: 0 5px 8px var(--gray-opacity-3);
	.title {
		font-size: 42px;
		margin-bottom: 1em;
		&:after {
			content: "";
			display: block;
			width: .75em;
			height: 1px;
			background: rgba(255,255,255,.5);
			position: absolute;
			left: 50%;
			transform: translateX(-50%) translateY(.5em);
		}
	}
	button {
		border: 1px solid var(--gray-opacity-3);
		font-size: 16px;
		padding: .5em 2em;
		border-radius: 9em;
		box-shadow: 0 13px 15px var(--gray-opacity-1);
		transition: .35s;
		background: var(--gray-opacity-3);
		color: #fff;
		&:hover {
			background: rgba(255,255,255,.3);
			color: var(--text-color-2);
		}
	}
}
</style>