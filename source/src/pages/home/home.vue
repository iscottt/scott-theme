<template>
	<div class="home">
		<SliderWrapper />
		<div class="container menu-container flex gx-8">
			<div class="menu-wrapper">
				<pf-scroller :style="{pointerEvents: windowIsScrolling ? 'none' : 'auto'}">
					<div class="cat-menu">
						<CatMenu :menu="$store.state.nav_menus.catNav" class="menu" />
					</div>
				</pf-scroller>
			</div>
			<div class="grid justify-center items-center">
				<CardType />
			</div>
		</div>
		<contentWrapper type="transparent" class="content-wrapper">
			<template v-slot:main>
				<transition name="posts-change" mode="out-in">
					<component :is="$store.state.card_type =='card' ? 'nv-cards-wrapper' : 'nv-list-wrapper'">
						<nvPostCard v-for="post in recent_articles" :post="post" :key="post.id" />
					</component>
				</transition>
				<div class="read-all flex items-start justify-center">
					<router-link :to="`/articles`" class="go flex items-end"><span>全部文章 <svg-icon name="angle-down" height="12" /></span></router-link>
				</div>
			</template>
			<template v-slot:aside>
				<bloggerInfo />
				<mostLikes />
				<mostComments />
			</template>
		</contentWrapper>
		<div class="category" v-for="cat in categories">
			<div class="container">
				<div class="title flex justify-between items-end">
					<span>{{cat.title}}</span>
					<router-link :to="`/category/${cat.slug}`" class="more flex items-center gx-2">
						更多<svg-icon name="angle-right" height="12" />
					</router-link>
				</div>
				<transition name="posts-change" mode="out-in">
					<component :is="$store.state.card_type =='card' ? 'home-cards-wrapper' : 'home-list-wrapper'">
						<template v-for="(post,index) in cat.posts" :key="post.id">
							<nvPostCard :post="post" v-if="showCatCard(index)" />
						</template>
					</component>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent,computed } from "vue";
import {throttle} from "/@/assets/throttle.js"
import SliderWrapper from "/@/components/slider/slider-wrapper.vue"
import contentWrapper from "/@/components/contentWrapper.vue"
import nvPostCard from "/@/components/nv-post-card.vue"
import CatMenu from "/@/components/catMenu.vue"
import CardType from "/@/components/cardType.vue"
import bloggerInfo from "/@/components/widgets/blogger-info.vue";
import mostLikes from "/@/components/widgets/most-likes.vue";
import mostComments from "/@/components/widgets/most-comments.vue";
import nvCardsWrapper from "/@/components/nv-cards-wrapper.vue";
import nvListWrapper from "/@/components/nv-list-wrapper.vue";
import homeCardsWrapper from "./home-cards-wrapper.vue";
import homeListWrapper from "./home-list-wrapper.vue";
export default defineComponent({
	name: 'home',
	components: {
		SliderWrapper,
		contentWrapper,
		CatMenu,
		CardType,
		nvPostCard,
		bloggerInfo,
		mostLikes,
		mostComments,
		nvCardsWrapper,
		nvListWrapper,
		homeCardsWrapper,
		homeListWrapper,
	},
	data(){return {
		windowIsScrolling: false,
		recent_articles: [],
		categories: [],
	}},
	provide() {return {
		sliders: computed(()=>this.sliders),
		post: {},
	}},
	watch: {
		'$store.state.card_type'() {
			/*if (this.$store.state.card_type=='card') {
				document.querySelector('aside').style.maxHeight = "";
			} else {
				document.querySelector('aside').style.maxHeight = "";
			}*/
			setTimeout(()=>{
				this.reparseAsideMaxHeight();
			},600)
		},
		'$store.state.theme_settings.nv_site_name'() {
			document.title = `${this.$store.state.theme_settings.nv_site_name} - ${this.$store.state.theme_settings.nv_site_description}`;
		}
	},
	computed: {
		sliders() {
			// 随机抽取 5 个
			var shuffle = this.recent_articles.slice(0);
			shuffle.sort(() => Math.random() - 0.5);
			return shuffle.slice(0,5);
		}
	},
	mounted() {
		document.title = `${this.$store.state.theme_settings.nv_site_name} - ${this.$store.state.theme_settings.nv_site_description}`;
		this.requestData();
		window.addEventListener('scroll',this.handleWindowScroll);
	},
	methods:{
		reparseAsideMaxHeight() {
			var nodes = document.querySelector('.main-column').children;
			var allHeight = 0;
			for (var i = 0; i < nodes.length; i++) {
				allHeight += nodes[i].clientHeight
			}
			document.querySelector('aside').style.height = allHeight+"px";
		},
		requestData() {
			$fullLoading.start()
			this.$axios({
				method: 'post',
				url: this.$API + '/nirvana/home',
				responseType: 'json',
				// data: {},
			})
			.then(({data})=>{
				// 最新12篇文章
				this.recent_articles = data.recent_articles;
				this.categories = data.categories;
			})
			.catch((error)=>{
				
			})
			.finally(()=>{
				$fullLoading.end()
			})
		},
		handleWindowScroll() {
			this.windowIsScrolling = true;
			throttle(()=>{
				this.windowIsScrolling = false;
			},100,false)
		},
		showCatCard(index) {
			/*var width = this.$store.state.window.width;
			if (width >= 992 && width < 1510 || width < 576) {
				return index < 4;
			}
			else if (width >= 576 && width < 992) {
				return index < 3;
			}
			else {
				return true;
			}*/
			var width = this.$store.state.window.width;
			return this.$store.state.card_type == 'card'
					? 
						(width >= 992 && width < 1510) || width < 576
						? index < 4
						: width >= 576 && width < 992
							? index < 3
							: true
					
					: 
						width >= 1510 || (width <= 991 && width >= 768)
						? index < 4
						: (width >= 992 && width < 1510)
							? index <3
							: true
					
		}
	},
	beforeUnmount() {
		window.removeEventListener('scroll',this.handleWindowScroll)
	}
})
</script>
<style lang='less' scoped>
// 调整为公共样式，其他地方还会用
/*.menu-container {
	padding-left: 0;
	.menu-wrapper {
		margin: .5em 0;
		overflow: hidden;
		flex-grow: 1;
		.cat-menu {
			margin: 0 2em;
			@media (max-width: 991.5px) {
				margin: 0 1em;
			}
		}
	}
}
.cat-menu {
	box-sizing: content-box;
	padding: .875em .35em;
	height: 2.5em;
}*/
.content-wrapper {
	margin-top: -1.8em;
}
.read-all {
	height: 8em;
	background:
	linear-gradient(90deg,transparent,var(--gray-5),transparent) 0 0/100% 1px no-repeat,
	linear-gradient(90deg,transparent,var(--white-opacity-6),transparent) 0 1px/100% 1px no-repeat,
	radial-gradient(ellipse 50% 50% at 50% 0,var(--gray-6),rgba(202,209,219,0)) 0 2px no-repeat;
	position: relative;
	&:before {
		content: "";
		z-index: -1;
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		height: 4.5em;
		top: -4.5em;
		background: radial-gradient(ellipse 50% 50% at 50% bottom,var(--white-opacity-6),transparent);
	}
	.go {
		font-size: 13px;
		text-decoration: none;
		background: linear-gradient(var(--gray-6),var(--gray-4) 7px,var(--gray-4) 40%,var(--gray-5)) no-repeat;
		border: 1px solid var(--gray-4);
		border-top-color: var(--border-color-0);
		color: #fff;
		height: 2.7em;
		padding: 0 1em .5em;
		border-radius: 0 0 6px 6px;
		box-shadow: 0 -1px var(--white-opacity-3) inset,1px 0 var(--white-opacity-3) inset,-1px 0 var(--white-opacity-3) inset,0 3px 5px var(--gray-opacity-2);
		text-shadow: 0 -1px rgba(31,45,61,.35);
		transition: .3s;
		&:hover {
			height: 4em;
		}
	}
}

.category {
	> .container {
		padding: 0 1em;
		@media (min-width: 992px) {
			padding: 0 2em;
		}
	}
	&:nth-child(even) {
		background: var(--white-opacity-4);
	}
	border-top: 1px solid var(--border-color);
	box-shadow: 0 1px var(--white-opacity-8) inset;
	padding: 0 0 5.5em 0;
	.title {
		margin-top: calc(-2.7em + 4px);
		padding-bottom: 3em;
		color: var(--text-color-3);
		text-shadow: 0 1px var(--white-default);
		transition: .25s;
		// display: flex;
		// justify-content: space-between;
		// align-items: flex-end;
		span {
			height: 2em;
			font-size: 120%;
			position: relative;
			display: inline-block;
			padding-bottom: .7em;
			margin-left: .5em;
			&:after {
				content: "";
				position: absolute;
				left: 0;
				bottom: -2px;
				height: 3px;
				width: 2em;
				border-radius: 9px;
				background: linear-gradient(var(--analogous-color) 20%, var(--primary-color) 80%);
				box-shadow: 0 3px 4px var(--primary-opacity-5);
				transition: .35s;
			}
		}
	}
	&:hover {
		.title {
			color: var(--primary-color);
			text-shadow: 0 -1px var(--white-default),0 2px 2px var(--primary-opacity-4);
			span:after {
				left: -.5em;
				width: calc(100% + 1em);
			}
		}
	}
	.more {
		font-size: 13px;
		text-decoration: none;
		height: 28px;
		transform: translateY(13px);
		border-radius: 9em;
		padding: 0 12px;
		color: var(--text-color-4);
		background: linear-gradient(var(--white-default),var(--gray-8)) no-repeat;
		text-shadow: 0 1px var(--white-default);
		border: 1px solid var(--border-color);
		box-shadow: 0 3px 5px rgba(0,0,0,.07),0 0 0 1px var(--white-default) inset,25px 0 25px transparent inset;
		transition: .35s;
		&:hover {
			transform: translateY(13px) translateX(15px);
			color: #fff;
			text-shadow: 0 2px 2px var(--primary-color);
			background: var(--analogous-color);
			border-color: var(--primary-opacity-6);
			border-left-color: var(--primary-color);
			border-right-color: var(--primary-opacity-4);
			box-shadow: 0 5px 8px var(--primary-opacity-5),0 0 0 -9px transparent inset,25px 0 25px var(--primary-color) inset;
		}
	}
	/*.post-card {
		@media (min-width: 992px) and (max-width: 1509.5px) {
			&:nth-child(4)~.post-card {
				display: none;
			}
		}
		@media (min-width: 576px) and (max-width: 991.5px) {
			&:nth-child(3)~.post-card {
				display: none;
			}
		}
	}*/
}
</style>

<style lang='less'>
.menu-container {
	padding-right: 1em;
	@media (min-width: 992px) {
		padding-right: 2em;
	}
	.menu-wrapper {
		margin: .5em 0;
		overflow: hidden;
		flex-grow: 1;
		.cat-menu {
			margin: 0 2em;
			@media (max-width: 991.5px) {
				margin: 0 1em;
			}
		}
	}
}
.cat-menu {
	box-sizing: content-box;
	padding: .875em .35em;
	height: 2.5em;
}
</style>