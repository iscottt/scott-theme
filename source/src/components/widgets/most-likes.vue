<template>
  <div class="widget most-likes" v-if="$store.state.most_likes_posts.length">
    <widgetTitle>大家喜欢</widgetTitle>
    <div class="widget-post-list">
      <div class="post flex g-8" v-for="post in $store.state.most_likes_posts">
        <router-link :to="`/${post.slug}`" class="img flex-shrink-0" :style="{ backgroundImage: `url(${post.thumbnail})` }"></router-link>
        <div class="infos flex flex-col justify-center">
          <router-link :to="`/${post.slug}`" class="title">{{ post.title }}</router-link>
          <div class="metas">
            <span class="likes"><svg-icon name="heart" height="14" />{{ post.likes }}</span>
            <span class="comments"><svg-icon name="comment-dots" height="14" />{{ post.comments }}</span>
            <span class="views"><svg-icon name="eye" height="14" />{{ post.views }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import widgetTitle from './widget-title.vue';
export default defineComponent({
  name: 'most-likes',
  components: {
    widgetTitle,
  },
  props: {
    post: Object,
  },
  mounted() {
    if (!this.$store.state.most_likes_posts.length) {
      this.$nextTick(() => {
        this.requestData();
      });
    }
  },
  methods: {
    requestData() {
      this.$axios({
        method: 'post',
        url: this.$API + '/nirvana/most-likes',
      })
        .then(({ data }) => {
          this.$store.state.most_likes_posts = data;
        })
        .catch((error) => {})
        .finally(() => {});
    },
  },
});
</script>
<style lang="less">
.widget-post-list {
  &:hover {
    .post {
      .img {
        transform: scale(1.1);
      }
    }
  }
  .post {
    margin-top: 1em;
  }
  .img {
    width: 3.75rem;
    height: 3.75rem;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 9999px;
    // box-shadow: 0 8px 10px var(--gray-opacity-2);
    transition-duration: 0.25s;
    box-shadow: 0 0 0 0.125rem #fff, 0.442rem 0.442rem 0.625rem rgb(54 100 152 / 20%), -0.442rem -0.442rem 0.625rem hsl(0deg 0% 100% / 70%);
  }
  .title {
    text-decoration: none;
    color: #5a6f87;
    text-shadow: 0.12rem 0.12rem 0.2rem #bec9d5, -1px -1px 1px hsl(0deg 0% 100% / 80%);
    transition: 0.35s;
    &:hover {
      color: var(--primary-color);
      text-shadow: 0 -1px var(--white-default), 0 2px 2px var(--primary-opacity-4);
    }
  }
  .metas {
    font-size: 13px;
    text-shadow: 0 1px var(--white-default);
    span + span {
      margin-left: 0.75em;
    }
    .svg-icon {
      margin-right: 0.25em;
      path {
        filter: drop-shadow(0 90px 0 var(--white-opacity-6));
      }
    }
  }
  .likes {
    color: var(--error-color);
  }
  .comments {
    color: var(--primary-color);
  }
  .views {
    color: var(--success-color);
  }
}
</style>
