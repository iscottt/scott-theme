<template>
	<ul class="card-type">
		<li
		class="anchor"
		ref="anchor"
		:style="{
			transform: `translateX(${$store.state.card_type == 'card' ? 1 : 41}px)`
		}"
		></li>
		<n-tooltip>
			<template #trigger>
				<li
				class="flex items-center justify-center"
				:class="{
					'is-active': $store.state.card_type == 'card',
				}"
				@click="$store.state.card_type = 'card'"
				>
					<svg-icon name="grip" />
				</li>
			</template>
			卡片
		</n-tooltip>
		<n-tooltip>
			<template #trigger>
				<li
				class="flex items-center justify-center"
				:class="{
					'is-active': $store.state.card_type == 'list',
				}"
				@click="$store.state.card_type = 'list'"
				>
					<svg-icon name="list" />
				</li>
			</template>
			列表
		</n-tooltip>
	</ul>
</template>

<script>
import {NTooltip} from 'naive-ui';
import { defineComponent } from "vue";
export default defineComponent({
	name: 'card-type',
	components: {
		NTooltip
	}
})
</script>

<style lang='less' scoped>
ul {
	margin: 0;
	padding: 1px;
	display: grid;
	grid-auto-flow: column;
	justify-content: start;
	align-items: center;
	position: relative;
	background: rgba(31,45,61,.08);
	box-shadow: 0 8px 10px rgba(31,45,61,.15) inset,0 1px var(--white-opacity-6);
	border-radius: 9em;
}
li {
	list-style: none;
	height: 40px;
	width: 40px;
	border-radius: 50%;
	cursor: pointer;
	z-index: 1;
	color: var(--gray-4);
	position: relative;
	transition: color .3s;
	&.anchor {
		position: absolute;
		background: linear-gradient(var(--white-default),var(--gray-7));
		box-shadow: 0 6px 6px rgba(0,0,0,.05),0 10px 10px rgba(0,0,0,.15),0 -1px 2px var(--white-default) inset;
		transition: .3s;
		z-index: 0;
	}
	&.is-active {
		color: var(--primary-color);
	}
	&:not(.anchor):after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: radial-gradient(closest-side at center, rgba(255,255,255,.55),transparent);
		opacity: 0;
		transform: scale(.4);
		z-index: -2;
		transition: .25s;
	}
	&:not(.anchor):hover:after {
		opacity: 1;
		transform: scale(.8);
	}
}

</style>
<style lang="less">
.card-type {
	.svg-icon path {
		filter: drop-shadow(0 33px 0 var(--white-opacity-6));
	}
}
</style>