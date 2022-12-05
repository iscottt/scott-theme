<template>
	<div class="term">
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
						<nvPostCard v-for="post in articles" :post="post" :key="post.id" />
					</component>
				</transition>
			</template>
			<template v-slot:aside>
				<bloggerInfo />
				<mostLikes />
				<mostComments />
			</template>
		</contentWrapper>
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
export default defineComponent({
	name: 'term',
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
	},
	data(){return {
		windowIsScrolling: false,
		articles: [],
		term_names:[],
	}},
	provide() {return {
		sliders: computed(()=>this.sliders.map(slider=>({
			...slider,
			categories: this.term_names.length ? this.term_names : slider.categories
		}))),
		post: {},
	}},
	watch: {
		'$store.state.theme_settings.nv_site_name'() {
			document.title = `${this.$store.state.theme_settings.nv_site_name} - ${this.term_names[0] || '全部文章'}`;
		},
		term_names() {
			document.title = `${this.$store.state.theme_settings.nv_site_name} - ${this.term_names[0] || '全部文章'}`;
		}
	},
	computed: {
		sliders() {
			// 随机抽取 5 个
			var shuffle = this.articles.slice(0);
			shuffle.sort(() => Math.random() - 0.5);
			return shuffle.slice(0,5);
		}
	},
	mounted() {
		this.requestData();
		window.addEventListener('scroll',this.handleWindowScroll);
	},
	methods:{
		requestData() {
			$fullLoading.start()
			this.$axios({
				method: 'post',
				url: this.$API + '/nirvana/post-list',
				responseType: 'json',
				data: {
					taxonomy: this.$store.state.taxonomy,
					term_slug: this.$store.state.term_slug,
					current_page: this.$store.state.current_page,
				},
			})
			.then(({data})=>{
				this.articles = data.articles;
				this.term_names = data.term_names;

				// 检查是不是没有获取到数据。total是0 || current_page大于总的可能分页数。返回没有相关数据页面
				var {total,posts_per_page,current_page} = data.pagination;
				if (!total || !posts_per_page || !current_page || (Math.ceil(total / posts_per_page) < current_page) ) {
					this.$router.replace({name:'nothing-is-here'})
				} else {
					this.$store.state.posts_per_page = posts_per_page;
					this.$store.state.total = total;
				}

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
		}
	},
	beforeUnmount() {
		window.removeEventListener('scroll',this.handleWindowScroll)
	}
})
</script>
<style scoped>
.content-wrapper {
	margin-top: -1.8em;
}
</style>
