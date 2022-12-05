<template>
	<div class="widget blogger-info">
		<img :src="$store.state.theme_settings.niRvana_blogger_avatar_url">
		<div>
			<div class="nickname">{{$store.state.theme_settings.niRvana_blogger_nickname}}</div>
			{{$store.state.theme_settings.niRvana_blogger_description}}
		</div>
	</div>
</template>

<script>
import { defineComponent,computed } from "vue";
export default defineComponent({
	name: 'post-info',
})
</script>
<style lang="less">
.blogger-info {
	display: flex;
	column-gap: 1em;
	align-items: center;
	color: var(--text-color-3);
	text-shadow: 0 1px var(--white-default);
	img {
		width: 4.5em;
		height: 4.5em;
		object-fit: cover;
		border-radius: .8em;
		box-shadow: 0 13px 15px var(--gray-opacity-2);
	}
	.nickname {
		font-size: 120%;
		color: var(--text-color);
		text-shadow: 0 -1px var(--white-default), 0 2px 2px var(--gray-opacity-3);
	}
}
</style>