<template>
	<div class="container flex items-center xxs:flex-col-reverse xs:flex-col-reverse xxs:justify-center xs:justify-center">
		<div class="metas" :class="{'fade-right': fadeTowards=='-','fade-left':fadeTowards=='+'}">
			<div class="categories">
				<template v-if="$route.params.taxonomy == 'category'">
					<svg-icon name="book" /> 分类：{{currentSlide.categories.join(' · ')}}
				</template>
				<template v-else-if="$route.params.taxonomy == 'tag'">
					<svg-icon name="tag" /> 标签：{{currentSlide.categories.join(' · ')}}
				</template>
				<template v-else>
					{{currentSlide.categories.length ? currentSlide.categories.join(' · ') : '未分类'}}
				</template>
			</div>
			<router-link :to="`/${currentSlide.slug}`" class="title block">{{currentSlide.title}}</router-link>
			<router-link :to="`/${currentSlide.slug}`" class="link background_shining"><svg-icon name="arrow-right" /> 阅读全文</router-link>
		</div>
		<coverflow :past="3" :future="3" class="coverflow" :transitionTime="700" @change="handleSlideChange" @init="handleSlideInit" v-if="sliders.length">
			<template v-slot:[getSlideSlot(slide.id)] v-for="slide in sliders">
				<router-link
				class="cover"
				:to="`/${slide.slug}`"
				:style="{
					backgroundImage:`url(${slide.thumbnail})`
				}"
				></router-link>
			</template>
			<template v-slot:controls-prev><svg-icon name="arrow-left" /></template>
			<template v-slot:controls-next><svg-icon name="arrow-right" /></template>
			<template v-slot:anchor-default></template>
		</coverflow>
		<div class="cover-blur" :class="{fade:fadeTowards}">
			<div class="cover-blur-img-wrapper"><img :src="currentSlide.thumbnail"></div>
		</div>
	</div>
	
</template>
<script>
import { defineComponent,computed } from "vue";
import coverflow from "./coverflow.vue"
export default defineComponent({
	name: 'nv-swiper',
	components: {coverflow},
	watch: {
	},
	data(){return {
		currentSlide: {
			categories: []
		},
		timeoutInstance: null,
		fadeTowards: "",
	}},
	inject: ['sliders'],
	mounted() {
	},
	methods:{
		getSlideSlot(id) {
			return "scene-"+id;
		},
		handleSlideInit() {
			this.currentSlide = this.sliders[0] || {};
		},
		handleSlideChange({currentIndex,stageIndex,currentEl,isPrev,isNext,isJump,jumpEnd,towards}) {
			this.fadeTowards = towards;
			clearTimeout(this.timeoutInstance);
			this.timeoutInstance = setTimeout(()=>{
				var slide = this.sliders[currentIndex];
				this.currentSlide = slide;
				this.fadeTowards = '';
			},416)
		}
	},
	beforeUnmount() {
		clearTimeout(this.timeoutInstance);
	}
})
</script>

<style scoped lang="less">
.container {
	height: 400px;
	@media (max-width:991.5px) {
		height: 300px;
	}
	@media (max-width:767.5px) {
		height: 370px;
	}
}
.metas {
	flex-grow: 1;
	padding-left: 3em;
	padding-right: 110px;
	color: #fff;
	text-shadow: 0 3px 5px rgba(0,0,0,.3);
	transition: .4s;
	&.fade-right {
		opacity: 0;
		transform: translateX(-5em);
		animation: toRight ease-in .38s;
	}
	&.fade-left {
		opacity: 0;
		transform: translateX(5em);
		animation: toLeft ease-in .38s;
	}

	.categories {
		opacity: .5;
		&:after {
			content: "";
			width: 2em;
			height: 1px;
			display: block;
			background: #fff;
			margin-top: .5em;
			margin-bottom: 1em;
		}
	}
	.title {
		font-size: 32px;
		color: inherit;
		text-decoration: none;
	}
	.link {
		font-size: 15px;
		display: inline-flex;
		text-decoration: none;
		color: #fff;
		border: 1px solid rgba(255,255,255,.2);
		align-items: center;
		height: 2.5em;
		column-gap: 10px;
		padding: 0 1.3em 0 .9em;
		border-radius: 9em;
		// margin-top: 2em;
		// margin-bottom: 2em;
		margin: 2em 0 2em -.2em;
		text-shadow: none;
		box-shadow: 0 5px 10px rgba(0,0,0,.2);
		transition: .35s;
		&:hover {
			border-color: hsla(0,0,100%,.5) !important;
			transform: translateX(1em);
			box-shadow: 0 10px 10px rgba(0,0,0,.2);
		}
	}

	@media (max-width:991.5px) {
		padding-right: 90px;
		.title {
			font-size: 24px;
		}
	}
	@media (max-width:767.5px) {
		padding-right: 0;
		padding-left: 0;
		flex-grow: 0;
		text-align: center;
		margin: 1em 0;
		.categories {
			display: flex;
			align-items: center;
			flex-direction: column;
		}
		.title {
			font-size: 18px;
		}
		.link {
			display: none;
		}
	}
}
@keyframes toLeft {
	0% {transform: translateX(0);opacity:1}
	100% {transform: translateX(-5em);opacity:0}
}
@keyframes toRight {
	0% {transform: translateX(0);opacity:1}
	100% {transform: translateX(5em);opacity:0}
}

.coverflow {
	width: 380px;
	@media (max-width:991.5px) {
		width: 290px;
	}
	@media (max-width:767.5px) {
		width: 100vw;
		overflow: hidden;
		display: flex;
		justify-content: center;
	}
}
.cover {
	border-radius: .7em;
	width: 256px;
	height: 229px;
	display: block;
	background-size: cover;
	background-position: center;
	box-shadow: 0 10px 20px rgba(0,0,0,.3),0 0 0 1px rgba(255,255,255,.2) inset,0 0 0 1px rgba(0,0,0,.15), 0 0 0 8em rgba(0,0,0,0) inset;
	transition: .5s;
	@media (max-width:991.5px) {
		width: 200px;
		height: 178px;
	}
}
.cover-blur {
	position: absolute;
	z-index: -999;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	transition: .4s;
	.cover-blur-img-wrapper {
		width: 100%;
		height: 100%;
    border-radius: 1em;
		overflow: hidden;
		-webkit-mask-image: linear-gradient(#000 20%,rgba(0,0,0,.6) 456px,rgba(0,0,0,.13) 456px,rgba(0,0,0,0));
		mask-image: linear-gradient(#000 20%,rgba(0,0,0,.6) 456px,rgba(0,0,0,.13) 456px,rgba(0,0,0,0));
		@media (max-width:991.5px) {
			-webkit-mask-image: linear-gradient(#000 20%,rgba(0,0,0,.6) 346px,rgba(0,0,0,.13) 346px,rgba(0,0,0,0));
			mask-image: linear-gradient(#000 20%,rgba(0,0,0,.6) 346px,rgba(0,0,0,.13) 346px,rgba(0,0,0,0));
		}
		@media (max-width:767.5px) {
			-webkit-mask-image: linear-gradient(#000 20%,rgba(0,0,0,.6) 416px,rgba(0,0,0,.13) 416px,rgba(0,0,0,0));
			mask-image: linear-gradient(#000 20%,rgba(0,0,0,.6) 416px,rgba(0,0,0,.13) 416px,rgba(0,0,0,0));
      width: 100vw;
      border-radius: 0;
		}
	}
	img {
		margin-left: -1.5em;
		width: calc(100% + 3em);
		height: 100%;
		object-fit: cover;
		filter: saturate(1.5) blur(.8em);
	}
	&.fade {
		opacity: 0;
	}
}

</style>
<style lang="less">
.is-menubar-open,.is-sidebar-open {
	@media (min-width: 578px) and (max-width:991.5px) {
		.cover-blur {
			opacity: 0;
			img {
				width: 100%;
				margin-left: 0;
				transition: .1s;
			}
		}
	}
	.nv-top-slider {
		.coverflow {
			.controls {
				visibility: hidden;
				opacity: 0;
			}
		}
	}
}
.nv-top-slider:hover {
	.coverflow {
		.controls {
			.prev,.next {
				opacity: .3;
			}
		}
	}
}
.coverflow {
	.controls {
		z-index: 5;
		.prev,.next {
			opacity: 0;
			padding: 0;
			color: #fff;
			top: 50%;
			position: absolute;
			z-index: 9;
			background: transparent;
			border: none;
			display: grid;
			align-items: center;
			width: 6em;
			height: 6em;
			transform: translateY(-50%);
			transition: .5s;
      overflow: hidden;
			&:before {
				content: '';
				width: 4em;
				height: 4em;
				background: rgba(0,0,0,.5);
				display: block;
				border-radius: 1.2em 0;
				position: absolute;
				z-index: -1;
				width: 4em;
				height: 4em;
			}
			&:hover {
				opacity: .8 !important;
			}
		}
		.prev {
			left: 0em;
			&:before {
				transform: translateX(calc(-50% - 0em)) rotate(-45deg);
			}
		}
		.next {
			right: 0em;
			overflow: hidden;
			justify-content: end;
			&:before {
				transform: translateX(calc(50% + 2em)) rotate(-45deg);
			}
		}
	}
}
</style>