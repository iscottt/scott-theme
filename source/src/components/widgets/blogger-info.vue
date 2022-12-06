<template>
  <div class="widget blogger-info">
    <img :src="$store.state.theme_settings.niRvana_blogger_avatar_url" />
    <div>
      <div class="nickname">{{ $store.state.theme_settings.niRvana_blogger_nickname }}</div>
      {{ $store.state.theme_settings.niRvana_blogger_description }}
    </div>
  </div>
  <div>
    <div class="my-tag">
      <a href="https://github.com/iscottt" target="_blank"> <i class="fa-brands fa-github"></i> Github </a>
    </div>
    <div class="my-tag">
      <a href="http://scott.ethan.pub/assets/wechat.014d1982.png"> <i class="fa-brands fa-weixin"></i> WeChat </a>
    </div>
    <div class="my-tag">
      <a href="mailto:iscottt@163.com"> <i class="fa-solid fa-at"></i> Email </a>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { NProgress } from 'naive-ui';
export default defineComponent({
  name: 'post-info',
  components: { NProgress },
  mounted() {
    console.log(this.$store.state);
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
  }
}
</style>
