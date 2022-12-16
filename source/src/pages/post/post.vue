<template>
  <div>
    <SliderWrapper />
    <contentWrapper type="transparent" ref="contentWrapper">
      <template v-slot:main>
        <div class="article-wrapper">
          <blockParser is="article" :blocks="post.content.blocks" ref="article" />
        </div>
        <shareModal
          @likes-change="
            (e) => {
              post.metas.likes = e;
            }
          " />
        <reletePost v-if="post.post_type == 'article'" :post="post" />
        <commentModal v-if="post.id" :post="post" @public-comment-sent="requestData" />
      </template>
      <template v-slot:aside>
        <bloggerInfo />
        <postInfo :post="post" v-if="post.post_type == 'article'" />
        <postToc :post="post" :lastHidedHeaderId="lastHidedHeaderId" />
        <mostLikes />
        <mostComments />
      </template>
    </contentWrapper>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import SliderWrapper from '/@/components/slider/slider-wrapper.vue';
import contentWrapper from '/@/components/contentWrapper.vue';
import blockParser from '/@/components/block-parser/parser.vue';
import postInfo from '/@/components/widgets/post-info.vue';
import bloggerInfo from '/@/components/widgets/blogger-info.vue';
import postToc from '/@/components/widgets/toc.vue';
import mostLikes from '/@/components/widgets/most-likes.vue';
import mostComments from '/@/components/widgets/most-comments.vue';
import reletePost from './relate-post.vue';
import shareModal from './share-modal.vue';
import commentModal from './comment-modal.vue';

export default defineComponent({
  name: 'post',
  components: {
    SliderWrapper,
    contentWrapper,
    blockParser,
    postInfo,
    postToc,
    mostLikes,
    mostComments,
    bloggerInfo,
    reletePost,
    shareModal,
    commentModal,
  },
  data() {
    return {
      post: {
        id: 0,
        post_type: '',
        title: '',
        taxonomies: {
          category: [],
          tag: [],
        },
        metas: {},
        content: { blocks: [] },
      },
      password: '',
      lastHidedHeaderId: '',
    };
  },
  provide() {
    return {
      post: computed(() => this.post),
    };
  },
  watch: {
    '$store.state.theme_settings.nv_site_name'() {
      document.title = `${this.post.title} - ${this.$store.state.theme_settings.nv_site_name}`;
    },
    'post.title'() {
      document.title = `${this.post.title} - ${this.$store.state.theme_settings.nv_site_name}`;
    },
  },
  mounted() {
    this.requestData();
    addEventListener('scroll', this.getLastHidedHeaderId);

    setTimeout(() => {
      this.postView();
    }, 5000);
  },
  methods: {
    requestData() {
      $fullLoading.start();
      this.$axios({
        method: 'post',
        url: this.$API + '/nirvana/get-post',
        responseType: 'json',
        data: {
          slug: encodeURIComponent(decodeURIComponent(this.$store.state.post_slug)),
          password: this.password,
          // 用于判定用户是否评论过。已登录用户直接从nonce判定，未登录才需要传email
          email: this.$store.state.guest.email,
        },
      })
        .then(({ data }) => {
          if (data.error) {
            this.$router.replace({ name: 'nothing-is-here' });
            return;
          }
          this.post = data;
        })
        .catch((error) => {})
        .finally(() => {
          $fullLoading.end();
        });
    },
    goto_page(page) {
      this.$router.push(`/post/page/${page}`);
    },
    getLastHidedHeaderId() {
      var ids = [];
      var scrollTop = document.documentElement.scrollTop;
      // 滚动的时候查看有哪些 h2什么的标签被滚到顶部去了
      this.$refs.article.$el.querySelectorAll('h2,h3').forEach((header) => {
        if (header.offsetTop <= scrollTop + 56) {
          if (!header.getAttribute('data-block-id') && header.parentNode.parentNode.offsetTop <= scrollTop + 56) {
            ids.push(header.parentNode.parentNode.getAttribute('data-block-id'));
          } else {
            header.getAttribute('data-block-id') && ids.push(header.getAttribute('data-block-id'));
          }
        }
      });
      ids = ids.filter((v) => v && v.trim());
      this.lastHidedHeaderId = ids.length ? ids[ids.length - 1] : '';
    },
    postView() {
      this.$axios({
        method: 'post',
        url: this.$API + '/nirvana/post-view',
        responseType: 'json',
        data: {
          id: this.post.id,
        },
      })
        .then(({ data }) => {
          this.post.metas.views = data;
        })
        .catch((error) => {})
        .finally(() => {});
    },
  },
  unmounted() {
    removeEventListener('scroll', this.getLastHidedHeaderId);
  },
});
</script>
<style lang="less">
.article-wrapper {
  padding: 2em 3em;
  /*background: var(--white-opacity-8);*/
  background: var(--white-default);
  border: 1px solid var(--white-default);
  border-radius: 0.8125em;
  box-shadow: rgb(0 0 0 / 45%) 0px 25px 20px -20px;
  margin: 1.5em 0;
  @media (max-width: 577px) {
    padding: 1em;
    margin: 0 -1em;
    border-radius: 0;
    box-shadow: none;
    border: none;
  }
}

.is-dark {
  .article-wrapper {
    border: none;
    box-shadow: none;
  }
}
</style>
