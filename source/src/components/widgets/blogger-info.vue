<template>
  <div class="widget blogger-info">
    <img :src="$store.state.theme_settings.niRvana_blogger_avatar_url" />
    <div>
      <div class="nickname">{{ $store.state.theme_settings.niRvana_blogger_nickname }}</div>
      {{ $store.state.theme_settings.niRvana_blogger_description }}
    </div>
  </div>
  <div class="flex flex-wrap" style="font-size: 14px">
    <!-- 调用网站底部链接前两个，需要注意后台设置 -->
    <template v-for="(item, index) in footerLinks">
      <div class="my-tag">
        <a :href="item.url" target="_blank" v-html="item.text"></a>
      </div>
    </template>
    <div class="my-tag">
      <a :href="`mailto:${$store.state.current_user.email}`"> <i class="fa-solid fa-at"></i> Email </a>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { NProgress } from 'naive-ui';
export default defineComponent({
  name: 'post-info',
  components: { NProgress },
  computed: {
    footerLinks() {
      return this.$store.state.theme_settings.scott_personal_links || [];
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
    // padding: 0.125rem;
    border: 1px solid #fff;
    // box-shadow: -0.44rem -0.44rem 0.625rem hsl(0deg 0% 100% / 80%), 0.44rem 0.44rem 0.625rem rgb(54 100 152 / 10%), inset 0 0 0 transparent, inset 0 0 0 transparent;
  }
  .nickname {
    font-size: 120%;
    color: var(--text-color);
    text-shadow: 0 -1px var(--white-default), 0 2px 2px var(--gray-opacity-3);
  }
}

.my-tag {
  background: #fff;
  display: flex;
  color: #73869a;
  border-radius: 0.375rem;
  padding: 0.25em 0.6em 0.25em 0.6em;
  margin-right: 5px;
  margin-bottom: 5px;
  transition-duration: 0.25s;
  position: relative;
  z-index: 0;
  a {
    color: #73869a;
    text-decoration: none;
    transition: 0.35s;
  }
  &:hover {
    color: #007dff;
    box-shadow: 0px 10px 15px -10px rgb(0 0 0 / 45%);
    a {
      text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
      color: #007dff;
    }
  }
}
</style>
