<template>
  <modalWrapper title="相关文章" v-if="posts.length">
    <div class="grid cols-4 g-8 xxs:cols-2 xs:cols-2 md:cols-2 sm:cols-2 lg:cols-3">
      <!-- <router-link
			:to="`/${post.slug}`"
			class="relate-post-item relative block"
			v-for="post in posts"
			:style="{backgroundImage: `url(${post.thumbnail})`}"
			>
				<span class="meta flex flex-col justify-center">
					<span class="title">{{post.title}}</span>
					<span class="date"><svg-icon name="clock" height="13" /> {{moment(post.modified_time).format(`${$store.state.theme_settings.nv_date_format || 'l'} ${$store.state.theme_settings.nv_time_format || 'LT'}`)}}</span>
				</span>
			</router-link> -->

      <div class="widget-post-list" v-for="post in posts" style="margin-top: 0">
        <div class="post flex g-8">
          <router-link :to="`/${post.slug}`" class="img flex-shrink-0" :style="{ backgroundImage: `url(${post.thumbnail})` }"></router-link>
          <div class="infos flex flex-col justify-between">
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
  </modalWrapper>
</template>

<script>
import { defineComponent, computed } from 'vue';
import moment from 'moment';

import modalWrapper from '/@/components/modalWrapper.vue';

export default defineComponent({
  name: 'relate-post',
  components: {
    modalWrapper,
  },
  props: ['post'],
  data() {
    return {
      moment,
      posts: [],
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.$axios({
        method: 'post',
        url: this.$API + '/nirvana/relate-post',
        responseType: 'json',
        data: {
          id: this.post.id,
          categoryIDs: this.post.taxonomies.category.map((term) => term.id),
          tagIDs: this.post.taxonomies.tag.map((term) => term.id),
        },
      })
        .then(({ data }) => {
          this.posts = data;
        })
        .catch((error) => {})
        .finally(() => {});
    },
  },
  unmounted() {},
});
</script>

<style lang="less">
.relate-post-item {
  padding-top: calc(89.45% - 0.67em);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  text-align: center;
  border-radius: 0.625em;
  color: #fff;
  text-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  box-shadow: 0 5px 8px var(--gray-opacity-1);
  transition: 0.35s;
  .meta {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1));
    opacity: 0;
    transition: 0.5s;
    .title,
    .date {
      transform: translateY(2em);
      opacity: 0;
      transition: 0.4s ease 0.1s;
    }
    .date {
      margin-top: 0.5em;
      font-size: 13px;
      transition: 0.4s;
    }
    .title {
      padding: 0 0.8em;
    }
  }
  &:hover {
    transform: translateY(0.5em);
    box-shadow: 0 2px 3px var(--gray-opacity-2);
    .meta {
      opacity: 1;
      .title,
      .date {
        transform: translateY(0);
        opacity: 1;
        transition: 0.4s;
      }
      .date {
        opacity: 0.65;
        transition: 0.4s ease 0.1s;
      }
    }
  }
}
</style>
