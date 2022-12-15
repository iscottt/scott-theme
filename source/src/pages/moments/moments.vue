<template>
  <div>
    <MomentsWrapper />
    <contentWrapper type="transparent" ref="contentWrapper">
      <template v-slot:main>
        <div class="moments-wrapper">
          <!-- <blockParser is="article" :blocks="post.content.blocks" ref="article" /> -->
        </div>
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
import { defineComponent } from 'vue';
import contentWrapper from '/@/components/contentWrapper.vue';
import blockParser from '/@/components/block-parser/parser.vue';
import bloggerInfo from '/@/components/widgets/blogger-info.vue';
import mostLikes from '/@/components/widgets/most-likes.vue';
import mostComments from '/@/components/widgets/most-comments.vue';
import MomentsWrapper from '/@/components/moments/moments-wrapper.vue';

export default defineComponent({
  name: 'post',
  components: {
    contentWrapper,
    blockParser,
    bloggerInfo,
    mostLikes,
    mostComments,
    MomentsWrapper,
  },
  data() {
    return {};
  },
  mounted() {
    this.requestData();
    window.document.title = 'Scott的朋友圈';
  },
  methods: {
    requestData() {
      $fullLoading.start();
      this.$axios({
        method: 'post',
        url: this.$API + '/nirvana/moments-post',
        responseType: 'json',
      })
        .then(({ data }) => {
          if (data.error) {
            this.$router.replace({ name: 'nothing-is-here' });
            return;
          }
          console.log('data', data);
        })
        .catch((error) => {})
        .finally(() => {
          $fullLoading.end();
        });
    },
    goto_page(page) {
      this.$router.push(`/post/page/${page}`);
    },
  },
});
</script>
<style lang="less">
.article-wrapper {
  padding: 2em 3em;
  /*background: var(--white-opacity-8);*/
  background: #f0f6fc;
  border: 1px solid var(--white-default);
  border-radius: 0.8125em;
  box-shadow: 0 0.5rem 1rem rgb(54 100 152 / 15%), inset 0 0 0 1px #fff;
  margin: 1.5em 0;
  @media (max-width: 577px) {
    padding: 1em;
    margin: 0 -1em;
    border-radius: 0;
    box-shadow: none;
    border: none;
  }
}
</style>
