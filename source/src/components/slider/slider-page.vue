<template>
	<div class="container flex flex-col items-center justify-center">
		<div class="title">{{post.title}}</div>
		<div v-if="post.excerpt" class="excerpt flex flex-col items-center justify-center">{{post.excerpt}}</div>
		<div class="page-bg">
			<img :src="post.metas.banner">
		</div>
	</div>
</template>
<script>
import { defineComponent,computed } from "vue";
export default defineComponent({
	name: 'nv-slider-page',
	inject: ['post'],
})
</script>

<style scoped lang="less">
.container {
	height: 344px;
	color: #fff;
	text-shadow: 0 3px 5px rgba(0,0,0,.3);
	@media (max-width:991.5px) {
		height: 200px;
	}
	@media (max-width:767.5px) {
		height: 200px;
	}
}
.title {
	font-size: 32px;
}
.excerpt {
	opacity: .5;
	&:before {
		content: "";
		height: 1px;
		width: 2em;
		background: #fff;
		display: block;
		margin: 1em 0;
	}
}
@media (max-width:991.5px) {
	.title {
		font-size: 24px;
	}
}
@media (max-width:767.5px) {
	.title {
		font-size: 18px;
	}
}

.page-bg {
	position: absolute;
	z-index: -999;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: .5s;
	}
}

</style>


<style lang="less">
.is-menubar-open,.is-sidebar-open {
	.page-bg {
		img {
			border-bottom-left-radius: 15px;
			border-bottom-right-radius: 15px;
		}
	}
}
</style>