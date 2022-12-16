<template>
  <ul class="comment-list">
    <li v-for="item in data" :id="`comment-item-${item.id}`">
      <div class="wrapper flex">
        <div class="avatar flex-shrink-0" :style="{ backgroundImage: `url(${item.avatar_url ? item.avatar_url : getAvatar(item)})` }"></div>
        <div class="body flex-grow">
          <div class="flex items-start">
            <div class="flex-grow flex items-center justify-between info">
              <div class="name" :class="{ 'has-url': item.url }">
                <a v-if="item.url" :href="getUrl(item.url)" target="_blank">{{ item.name || '匿名' }}</a>
                <span v-else>{{ item.name || '匿名' }}</span>
              </div>
              <div class="date">{{ moment(item.date).format(`${$store.state.theme_settings.nv_date_format || 'l'} ${$store.state.theme_settings.nv_time_format || 'LT'}`) }}</div>
            </div>
            <NTooltip v-if="post.comment_status && $store.state.theme_settings.enable_comment">
              <template #trigger>
                <div class="flex-shrink-0 reply flex items-center" @click="$emit('reply', item.id)">
                  <svg-icon name="reply" height="12" />
                </div>
              </template>
              回复
            </NTooltip>
          </div>
          <div class="content has-emoji">
            <span v-if="item.parent_name" class="parent-info">回复 {{ item.parent_name }}：</span>
            {{ item.content }}
          </div>
        </div>
      </div>

      <comment-list
        :post="post"
        :data="item.children"
        :reply2="reply2"
        v-if="item.children"
        class="sub-list"
        @reply="
          (id) => {
            $emit('reply', id);
          }
        " />
    </li>
  </ul>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { NTooltip } from 'naive-ui';
import moment from 'moment';

export default defineComponent({
  name: 'comment-list',
  props: ['data', 'reply2', 'post'],
  components: {
    NTooltip,
  },
  data() {
    return {
      moment,
    };
  },
  mounted() {},
  methods: {
    getAvatar(item) {
      var avatars = (window.__niRvana_config__ || {}).avatars || [];
      var result = avatars[Math.floor(Math.random() * avatars.length)];
      return result;
    },
    getUrl(url) {
      if (!(url.substr(0, 7) == 'http://' || url.substr(0, 8) == 'https://' || url.substr(0, 2) == '//')) {
        return `http://${url}`;
      }
      return url;
    },
  },
  unmounted() {},
});
</script>
<style lang="less">
.comment-list {
  color: var(--text-color-3);
  padding: 0;
  margin: 0;
  li {
    list-style: none;
    margin: 0;
  }
  .wrapper {
    padding: 0.5em 0;
  }
  .avatar {
    width: 3em;
    height: 3em;
    background-position: center;
    background-size: cover;
    border-radius: 9999px;
    padding: 0.25rem;
    margin-right: 1em;
  }
  .info {
    border-bottom: 1px solid var(--border-color-2);
    line-height: 1.5em;
    .name {
      font-weight: bold;
      box-shadow: 0 1px var(--gray-4);
      color: var(--text-color-2);
      &.has-url {
        box-shadow: 0 1px var(--primary-color);
      }
      a {
        text-decoration: none;
        color: var(--primary-color);
        text-shadow: 0 -1px var(--white-default), 0 2px 2px var(--primary-opacity-4);
      }
    }
    .date {
      font-size: 14px;
      color: var(--gray-5);
      margin-right: 1em;
    }
  }
  .content {
    padding: 0.25em 2em 0.25em 0;
  }
  .reply {
    cursor: pointer;
    transform: translateY(0.75em);
    color: var(--gray-5);
    border-radius: 9em;
    background-color: #fff;
    text-shadow: 0 1px var(--white-default);
    height: 1.5em;
    padding: 0 0.625em;
    // box-shadow: 0 4px 6px var(--gray-opacity-1),0 0 0 1px var(--white-default) inset,.75em 0 .75em transparent inset;
    transition: 0.35s;
    &:hover {
      color: #007dff;
      text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
      box-shadow: 0 10px 5px -10px rgba(0, 0, 0, 0.45);
    }
  }
  .sub-list {
    padding-left: 1.5em;
    @media (min-width: 575px) {
      padding-left: 4em;
    }
    .parent-info {
      display: none;
    }
    .sub-list {
      padding-left: 0;
      .parent-info {
        display: inline;
      }
    }
  }
}

.is-dark {
  .comment-list {
    .info {
      border-color: #484849;
    }
    .content {
      color: rgba(255, 255, 255, 0.9);
    }
    .reply {
      background: rgba(99, 226, 183, 0.16);
      color: rgba(255, 255, 255, 0.52);
    }
  }
}
</style>
