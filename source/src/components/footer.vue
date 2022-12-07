<template>
  <footer>
    <transition :duration="500">
      <div class="main-pagination-wrapper flex justify-center" v-if="Math.ceil($store.state.total / $store.state.posts_per_page) > 1">
        <mainPagination />
      </div>
    </transition>
    <div class="container">
      <div class="copyright" v-html="$store.state.theme_settings.niRvana_copyright || `Copyright © 版权所有 All Rights Reserved.`"></div>
      <div class="links flex gx-8 justify-center" v-if="($store.state.theme_settings.niRvana_footer_links || []).length">
        <a class="flex gx-3 items-center" :href="item.url" v-for="item in $store.state.theme_settings.niRvana_footer_links || []">
          <img :src="item.image" v-if="item.image" /><span v-html="item.text"></span>
        </a>
      </div>
      <div class="info">©2022 Designed & Coded by Scott Studio</div>
    </div>
  </footer>
</template>
<script>
import mainPagination from './mainPagination.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { mainPagination },
});
</script>
<style lang="less" scoped>
.container {
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: 2em;
  padding-right: 2em;
  @media (max-width: 991.5px) {
    padding-left: 1em;
    padding-right: 1em;
  }
}
.copyright {
  padding: 1em 0 0;
  color: var(--text-color-3);
  text-shadow: 0.12rem 0.12rem 0.2rem #bec9d5, -1px -1px 1px hsl(0deg 0% 100% / 80%);
  color: #5a6f87;
  text-align: center;
  font-size: 14px;
  text-align: right;
}
.info {
  cursor: default;
  text-align: right;
  color: #8c9cae;
  font-size: 12px;
  transition: 0.35s;
  margin-top: 0.5em;
  text-shadow: 0 1px 1px #fff;
}
.links {
  font-size: 14px;
  padding-top: 0.5em;
  text-decoration: none;
 justify-content: flex-end;
  a {
    text-decoration: none;
    color: #8c9cae;
    text-shadow: 0 1px 1px #fff;
    img {
      width: 16px;
      height: 16px;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
<style lang="less">
footer {
  // background: var(--gray-opacity-1);
  background: #dae5f2;
  padding-bottom: env(safe-area-inset-bottom);
  transform-origin: bottom;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px var(--white-opacity-4) inset;
  transition: 0.35s;
}
.is-menubar-open,
.is-sidebar-open {
  & + footer {
    opacity: 0;
    transform: scaleY(0);
  }
}
.main-pagination-wrapper {
  margin-top: -21px;
}
</style>
