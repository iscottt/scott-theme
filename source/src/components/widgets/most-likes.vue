<template>
  <div class="widget most-likes" v-if="$store.state.most_likes_posts.length">
    <widgetTitle>大家喜欢</widgetTitle>
    <div class="widget-post-list">
      <div class="post flex g-8" v-for="post in $store.state.most_likes_posts">
        <router-link :to="`/${post.slug}`" class="img flex-shrink-0" :style="{ backgroundImage: `url(${post.thumbnail})` }"></router-link>
        <div class="infos flex flex-col justify-between">
          <router-link :to="`/${post.slug}`" class="title">{{ post.title }}</router-link>
          <div class="metas">
            <span class="likes"><svg-icon name="heart" height="14" />{{ post.likes }}</span>
            <span class="comments"><i class="fa-regular fa-clock"></i> {{ formatTime(post.modified_time) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import widgetTitle from './widget-title.vue';
import moment from 'moment';
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
    formatTime(time) {
      return moment(time).format('L');
    },
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
  margin-top: 40px;
  .post {
    margin-top: 1em;
    &:hover {
      .img {
        transform: scale(1.1);
      }
    }
  }
  .img {
    width: 3.75rem;
    height: 3.75rem;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 0.5rem;
    // box-shadow: 0 8px 10px var(--gray-opacity-2);
    transition-duration: 0.25s;
    box-shadow: 0 0 0 0.125rem #fff, 0.442rem 0.442rem 0.625rem rgb(54 100 152 / 20%), -0.442rem -0.442rem 0.625rem hsl(0deg 0% 100% / 70%);
  }
  .title {
    text-decoration: none;
    color: #415973;
    text-shadow: 0.12rem 0.12rem 0.2rem #bec9d5, -1px -1px 1px hsl(0deg 0% 100% / 80%);
    transition: 0.35s;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    &:hover {
      color: var(--primary-color);
      text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
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
    color: #8c9cae;
  }
  .views {
    color: var(--success-color);
  }
  .other {
    color: var(--primary-color);
  }
}
</style>
