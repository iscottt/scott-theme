<template>
	<div class="nv-top-slider" :data-post-type="post.post_type">
		<sliderArticle v-if="$store.state.is_post && post.post_type == 'article'" />
		<sliderPage v-else-if="$store.state.is_post && post.post_type == 'page'" />
		<sliderSwiper v-else-if="$store.state.is_home || $store.state.is_term" />
		<sliderLoading v-else />
	</div>
</template>

<script>
import { defineComponent } from "vue";
import sliderArticle from "./slider-article.vue";
import sliderPage from "./slider-page.vue";
import sliderSwiper from "./slider-swiper.vue";
import sliderLoading from "./slider-loading.vue";

export default defineComponent({
	name: 'nv-top-slider',
	components: {sliderArticle,sliderPage,sliderSwiper,sliderLoading},
	inject: ['post'],
	data(){return {
		nav_float: false,
		nav_float_in: false,
	}},
	mounted() {
		new IntersectionObserver(this.handleObserver,{
			threshold:[0,.01,.8,1]
		}).observe(this.$el)
	},
	methods:{
		handleObserver([{intersectionRatio}]) {
			// var ratio = entries[0].intersectionRatio <= 0;
			if (intersectionRatio <= 0) {
				this.nav_float_in = true;
				// console.log('动画显示')
			}
			if (intersectionRatio > 0) {
				this.nav_float_in = false;
				// console.log('动画隐藏')
			}
			if (intersectionRatio > .8) {
				this.nav_float = false;
				this.nav_float_in = false;
				// console.log('隐藏')
			}
			if (intersectionRatio < .8) {
				this.nav_float = true;
				// console.log('显示')
			}
		},
	}
})
</script>

<style lang="less" scoped>
.nv-top-slider {
	position: relative;
	box-shadow: 0 1px rgba(255,255,255,.6), 0 -10px 15px rgba(0,0,0,.1) inset, 0 10px 15px rgba(255,255,255,.2);
	transition: .5s;
	&:not([data-post-type="page"]) {
		position: relative;
		background-image:
		linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.3)),
		repeating-linear-gradient(-45deg, rgba(0,0,0,.05), rgba(0,0,0,.05) 1.414px, transparent 0px,transparent 6px);
		/*border-radius: 0 0 15px 15px;*/
		/*box-shadow: 0 -1px rgba(255,255,255,.2) inset,0 0 0 1px rgba(0,0,0,.4), 0 0 20px rgba(0,0,0,.3);*/
		@media (min-width: 768px) {
			//手机性能差，大屏幕才显示动画
			animation: slider-bg-moving linear .35s infinite;
		}
	}
}
@keyframes slider-bg-moving {
	0% {background-position: 0 0}
	100% {background-position: 8.5px 0}
}
@media (min-width: 992px) {
	.nv-top-slider {
		padding-top: 56px;
	}
}
@media (max-width: 991.5px) {
	.nv-top-slider {
		padding-top: 46px;
	}
}
</style>
<style lang="less">
@media (min-width: 578px) and (max-width:991.5px) {
	.is-menubar-open,.is-sidebar-open {
		.nv-top-slider {
			border-radius: 0 0 15px 15px;
			box-shadow: 0 0 transparent,0 0 0 transparent inset,0 0 transparent,0 -1px rgba(255,255,255,.2) inset,0 0 0 1px rgba(0,0,0,.4), 0 0 20px rgba(0,0,0,.3);
		}
	}
}

</style>