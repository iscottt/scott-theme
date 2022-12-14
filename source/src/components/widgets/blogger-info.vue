<template>
  <div class="widget blogger-info">
    <img :src="$store.state.theme_settings.niRvana_blogger_avatar_url" />
    <div>
      <div class="nickname">{{ $store.state.theme_settings.niRvana_blogger_nickname }}</div>
      {{ $store.state.theme_settings.niRvana_blogger_description }}
    </div>
  </div>
  <div>
    <!-- 调用网站底部链接前两个，需要注意后台设置 -->
    <template v-for="(item, index) in footerLinks">
      <div class="my-tag">
        <a :href="item.url" target="_blank"> <span v-html="item.text"></span> </a>
      </div>
    </template>
    <div class="my-tag">
      <a :href="`mailto:${$store.state.current_user.email}`"> <i class="fa-solid fa-at"></i> Email </a>
    </div>
  </div>
  <blockParser v-if="post.content" is="article" :blocks="post.content.blocks" ref="article" />
</template>

<script>
import { defineComponent, computed } from 'vue';
import { NProgress } from 'naive-ui';
import blockParser from '/@/components/block-parser/parser.vue';
export default defineComponent({
  name: 'post-info',
  components: { NProgress, blockParser },
  data() {
    return {
      post: {},
    };
  },
  computed: {
    footerLinks() {
      return this.$store.state.theme_settings.scott_personal_links || [];
    },
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      $fullLoading.start();
      this.$axios({
        method: 'post',
        url: this.$API + '/nirvana/micro-post',
        responseType: 'json',
        // data: {},
      })
        .then(({ data }) => {
          console.log('data', data);
          this.post = data[0];
        })
        .catch((error) => {})
        .finally(() => {
          $fullLoading.end();
        });
    },
  },
});
</script>
<style lang="less">
.blogger-info {
  display: flex;
  column-gap: 1em;
  align-items: center;
  color: var(--text-color-3);
  text-shadow: 0 1px var(--white-default);
  img {
    width: 4.5em;
    height: 4.5em;
    object-fit: cover;
    border-radius: 0.8em;
    padding: 0.125rem;
    box-shadow: -0.44rem -0.44rem 0.625rem hsl(0deg 0% 100% / 80%), 0.44rem 0.44rem 0.625rem rgb(54 100 152 / 10%), inset 0 0 0 transparent, inset 0 0 0 transparent;
  }
  .nickname {
    font-size: 120%;
    color: var(--text-color);
    text-shadow: 0 -1px var(--white-default), 0 2px 2px var(--gray-opacity-3);
  }
}

.my-tag {
  background: linear-gradient(#f9fafc, #e8f0fa 0.75rem, #e8f0fa calc(100% - 0.75rem), #dae5f2) no-repeat;
  box-shadow: 0 0.5rem 0.625rem rgb(54 100 152 / 20%);
  display: inline-block;
  transition-duration: 0.25s;
  color: #73869a;
  border: 1px solid;
  border-color: #fff;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-shadow: 0 1px 1px #fff;
  padding: 0.25em 0.6em 0.25em 0.6em;
  margin-right: 5px;
  margin-bottom: 5px;
  &:hover {
    a {
      text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
      color: #007dff;
    }
    color: #007dff;
    border-color: transparent;
    box-shadow: min(-1px, -0.0625rem) min(-1px, -0.0625rem) hsla(0, 0%, 100%, 0.6), max(1px, 0.0625rem) max(1px, 0.0625rem) rgba(54, 100, 152, 0.2),
      inset 0.1875rem 0.1875rem 0.1875rem rgba(54, 100, 152, 0.2), inset -0.125rem -0.125rem 0.1875rem hsla(0, 0%, 100%, 0.6);
  }
  a {
    color: #73869a;
    text-decoration: none;
    transition: 0.35s;
  }
}
</style>
