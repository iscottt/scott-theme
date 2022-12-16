<template>
  <div class="home">
    <SliderWrapper />
    <div class="container menu-container flex gx-8">
      <div class="menu-wrapper">
        <pf-scroller :style="{ pointerEvents: windowIsScrolling ? 'none' : 'auto' }">
          <div class="cat-menu">
            <CatMenu :menu="$store.state.nav_menus.catNav" class="menu" />
          </div>
        </pf-scroller>
      </div>
      <!-- <div class="grid justify-center items-center">
        <CardType />
      </div> -->
    </div>
    <contentWrapper type="transparent" class="content-wrapper">
      <template v-slot:main>
        <transition name="posts-change" mode="out-in">
          <component :is="$store.state.card_type == 'card' ? 'nv-cards-wrapper' : 'nv-list-wrapper'">
            <nvPostCard v-for="post in recent_articles" :post="post" :key="post.id" />
          </component>
        </transition>
        <div class="read-all flex items-start justify-center">
          <router-link :to="`/articles`" class="go flex items-end">
            <span>全部文章<i class="fa-solid fa-plane-departure"></i></span>
          </router-link>
        </div>
        <div class="category" v-for="cat in categories">
          <div class="container" style="padding: 0">
            <widgetTitle>{{ cat.title }}</widgetTitle>
            <transition name="posts-change" mode="out-in">
              <component :is="$store.state.card_type == 'card' ? 'nv-cards-wrapper' : 'nv-list-wrapper'">
                <template v-for="(post, index) in cat.posts" :key="post.id">
                  <nvPostCard :post="post" v-if="showCatCard(index)" />
                </template>
              </component>
            </transition>
            <div class="read-all flex items-start justify-center" style="margin-top: 40px">
              <router-link :to="`/category/${cat.slug}`" class="go flex items-end">
                <span>阅读更多<i class="fa-solid fa-plane-departure"></i></span>
              </router-link>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:aside>
        <bloggerInfo />
        <microBlog />
        <mostLikes />
        <mostComments />
      </template>
    </contentWrapper>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { throttle } from '/@/assets/throttle.js';
import SliderWrapper from '/@/components/slider/slider-wrapper.vue';
import contentWrapper from '/@/components/contentWrapper.vue';
import nvPostCard from '/@/components/nv-post-card.vue';
import CatMenu from '/@/components/catMenu.vue';
import microBlog from '/@/components/widgets/micro-blog.vue';
import CardType from '/@/components/cardType.vue';
import bloggerInfo from '/@/components/widgets/blogger-info.vue';
import mostLikes from '/@/components/widgets/most-likes.vue';
import mostComments from '/@/components/widgets/most-comments.vue';
import nvCardsWrapper from '/@/components/nv-cards-wrapper.vue';
import nvListWrapper from '/@/components/nv-list-wrapper.vue';
import homeCardsWrapper from './home-cards-wrapper.vue';
import homeListWrapper from './home-list-wrapper.vue';
import widgetTitle from '/@/components/widgets/widget-title.vue';
export default defineComponent({
  name: 'home',
  components: {
    SliderWrapper,
    widgetTitle,
    microBlog,
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
  data() {
    return {
      windowIsScrolling: false,
      recent_articles: [],
      categories: [],
    };
  },
  provide() {
    return {
      sliders: computed(() => this.sliders),
      post: {},
    };
  },
  watch: {
    '$store.state.card_type'() {
      /*if (this.$store.state.card_type=='card') {
				document.querySelector('aside').style.maxHeight = "";
			} else {
				document.querySelector('aside').style.maxHeight = "";
			}*/
      setTimeout(() => {
        this.reparseAsideMaxHeight();
      }, 600);
    },
    '$store.state.theme_settings.nv_site_name'() {
      document.title = `${this.$store.state.theme_settings.nv_site_name} - ${this.$store.state.theme_settings.nv_site_description}`;
    },
  },
  computed: {
    sliders() {
      // 随机抽取 5 个
      var shuffle = this.recent_articles.slice(0);
      shuffle.sort(() => Math.random() - 0.5);
      return shuffle.slice(0, 5);
    },
  },
  mounted() {
    document.title = `${this.$store.state.theme_settings.nv_site_name} - ${this.$store.state.theme_settings.nv_site_description}`;
    this.requestData();
    window.addEventListener('scroll', this.handleWindowScroll);
  },
  methods: {
    reparseAsideMaxHeight() {
      var nodes = document.querySelector('.main-column').children;
      var allHeight = 0;
      for (var i = 0; i < nodes.length; i++) {
        allHeight += nodes[i].clientHeight;
      }
      document.querySelector('aside').style.height = allHeight + 'px';
    },
    requestData() {
      $fullLoading.start();
      this.$axios({
        method: 'post',
        url: this.$API + '/nirvana/home',
        responseType: 'json',
        // data: {},
      })
        .then(({ data }) => {
          // 最新12篇文章
          this.recent_articles = data.recent_articles;
          this.categories = data.categories;
        })
        .catch((error) => {})
        .finally(() => {
          $fullLoading.end();
        });
    },
    handleWindowScroll() {
      this.windowIsScrolling = true;
      throttle(
        () => {
          this.windowIsScrolling = false;
        },
        100,
        false
      );
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
        ? (width >= 992 && width < 1510) || width < 576
          ? index < 4
          : width >= 576 && width < 992
          ? index < 3
          : true
        : width >= 1510 || (width <= 991 && width >= 768)
        ? index < 4
        : width >= 992 && width < 1510
        ? index < 3
        : true;
    },
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
  },
});
</script>
<style lang="less" scoped>
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
  height: 5em;
  position: relative;
  .go {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    margin-left: 0.625rem;
    margin-right: 0.625rem;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    transition-duration: 0.35s;
    color: var(--text-color-4);
    text-shadow: 0 1px 1px #fff;
    border: 1px solid;
    border-color: rgba(54, 100, 152, 0.15);
    border-radius: 0.625rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-decoration: none;
    font-weight: 500;
    background-color: #fff;
    i {
      margin-left: 0.375rem;
      font-size: 0.75rem;
      line-height: 1rem;
      color: var(--text-color-4);
      text-shadow: 0 1px 1px #fff;
      font-size: 12px;
    }
    &:hover {
      color: #007dff;
      text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
      box-shadow: 0px 20px 15px -10px rgb(0 0 0 / 45%);
      i {
        color: #007dff;
        text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
      }
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
  .title {
    margin-top: calc(-2.7em + 4px);
    padding-bottom: 3em;
    color: var(--text-color-3);
    text-shadow: 0 1px var(--white-default);
    transition: 0.25s;
    // display: flex;
    // justify-content: space-between;
    // align-items: flex-end;
    span {
      height: 2em;
      font-size: 120%;
      position: relative;
      display: inline-block;
      padding-bottom: 0.7em;
      margin-left: 0.5em;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        height: 3px;
        width: 2em;
        border-radius: 9px;
        background: linear-gradient(var(--analogous-color) 20%, var(--primary-color) 80%);
        box-shadow: 0 3px 4px var(--primary-opacity-5);
        transition: 0.35s;
      }
    }
  }
  &:hover {
    .title {
      color: var(--primary-color);
      text-shadow: 0 -1px var(--white-default), 0 2px 2px var(--primary-opacity-4);
      span:after {
        left: -0.5em;
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
    background: linear-gradient(var(--white-default), var(--gray-8)) no-repeat;
    text-shadow: 0 1px var(--white-default);
    border: 1px solid var(--border-color);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.07), 0 0 0 1px var(--white-default) inset, 25px 0 25px transparent inset;
    transition: 0.35s;
    &:hover {
      transform: translateY(13px) translateX(15px);
      color: #fff;
      text-shadow: 0 2px 2px var(--primary-color);
      background: var(--analogous-color);
      border-color: var(--primary-opacity-6);
      border-left-color: var(--primary-color);
      border-right-color: var(--primary-opacity-4);
      box-shadow: 0 5px 8px var(--primary-opacity-5), 0 0 0 -9px transparent inset, 25px 0 25px var(--primary-color) inset;
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

<style lang="less">
.menu-container {
  padding-right: 1em;
  @media (min-width: 992px) {
    padding-right: 2em;
  }
  .menu-wrapper {
    margin: 0.5em 0;
    overflow: hidden;
    flex-grow: 1;
    .cat-menu {
      margin: 0;
      @media (max-width: 991.5px) {
        margin: 0;
      }
    }
  }
}
.cat-menu {
  box-sizing: content-box;
  padding: 0.875em 0.35em;
  height: 2.5em;
}

.is-dark {
  .read-all {
    .go {
      background: rgba(99, 226, 183, 0.16);
      text-shadow: none;
      color: #63e2b7;
      i {
        text-shadow: none;
        color: #63e2b7;
      }
      &:hover {
        background: var(--primary-color);
        text-shadow: none;
        color: #fff;
        i {
          text-shadow: none;
          color: #fff;
        }
      }
    }
  }
}
</style>
