<template>
  <n-notification-provider placement="bottom-right">
    <n-message-provider placement="bottom-right">
      <transition name="fade">
        <div class="fullScreenLoading" :class="{ info: fullLoadingIsClicked }" v-show="fullScreenLoadingStack.length > 0" @click="fullLoadingIsClicked = true">
          <div class="bar"></div>
          <div class="info">
            <n-spin size="small" /><span class="info-text">{{ loadingText }}</span>
          </div>
        </div>
      </transition>
      <topNav />
      <main
        :class="{
          'is-leaving': isLeaving,
          'is-menubar-open': $store.state.is_menubar_open,
          'is-sidebar-open': $store.state.is_sidebar_open,
        }"
        @click="$store.dispatch('closeBars')">
        <router-view v-slot="{ Component }">
          <transition name="router-change" :duration="500" @before-leave="handleBeforeLeave" @after-leave="handleAfterLeave" @after-enter="handleAfterEnter">
            <component :is="Component" :key="[$store.state.post_slug, $store.state.taxonomy, $store.state.term_slug, $store.state.current_page].toString()" />
          </transition>
        </router-view>
      </main>
      <nvFooter />
    </n-message-provider>
  </n-notification-provider>
  <NBackTop :listen-to="target">
    <i class="fa-solid fa-circle-up"></i>
  </NBackTop>
</template>

<script>
import * as ua_check from '/@/assets/ua_check.js';
['is_mac', 'is_touchable', 'is_firefox', 'is_iPad', 'is_iPhone', 'is_safari', 'is_mobile'].forEach((el) => {
  if (ua_check[el]()) {
    document.documentElement.classList.add(el.replace(/_/g, '-'));
  }
});

import topNav from '/@/components/topNav/topNav.vue';
import nvFooter from '/@/components/footer.vue';

import circleMagic from '/@/assets/circleMagic-top-to-down.js';

import { NMessageProvider, NNotificationProvider, NSpin, NBackTop } from 'naive-ui';

export default {
  name: 'App',
  components: {
    topNav,
    nvFooter,
    NBackTop,
    NMessageProvider,
    NNotificationProvider,
    NSpin,
  },
  props: {},
  watch: {},
  data() {
    return {
      fullScreenLoadingStack: [],
      fullLoadingIsClicked: false,
      loadingText: '正在加载...',
      isLeaving: false,
      target: () => document.documentElement,
    };
  },
  mounted() {
    this.$store.dispatch('checkNonce');

    window.$fullLoading = {
      start: this.startLoading,
      end: this.endLoading,
      stop: this.endLoading,
      finish: this.endLoading,
    };

    this.get_theme_settings();
    this.get_nav_menus();

    circleMagic({
      el: document.body,
      height: 400,
      className: 'circle-magic',
      radius: 15,
      densety: 0.1,
      clearOffset: 0.2,
      color: 'randomOpacity',
    });

    this.$store.commit('recordWindowWidth');

    this.read_guest_info();
  },
  methods: {
    read_guest_info() {
      var guest_info = this.$localStorage('guest_info');
      if (guest_info) {
        this.$store.state.guest.name = guest_info.name;
        this.$store.state.guest.email = guest_info.email;
        this.$store.state.guest.url = guest_info.url;
      }
    },
    handleBeforeLeave() {
      this.isLeaving = true;
      // console.log('handleBeforeLeave')
      window.scrollTo({
        top: 50,
        behavior: 'smooth',
      });
    },
    handleAfterLeave() {
      this.isLeaving = false;
      // console.log('handleAfterLeave')
    },
    handleAfterEnter() {
      // 消失时滚动在router配置里面
      window.scrollBy({
        top: -1000,
        behavior: 'smooth',
      });
    },
    startLoading(loadingText) {
      this.loadingText = loadingText || '正在加载...';
      this.fullScreenLoadingStack.push(null);
      if (loadingText) {
        this.fullLoadingIsClicked = true;
      }
    },
    endLoading() {
      setTimeout(() => {
        this.fullScreenLoadingStack.pop();
        if (!this.fullScreenLoadingStack.length) {
          this.fullLoadingIsClicked = false;
        }
      }, 16);
    },
    get_theme_settings() {
      this.$axios({
        method: 'post',
        url: this.$API + '/niRvana/site-metas',
        responseType: 'json',
      })
        .then(({ data }) => {
          this.$store.state.theme_settings = data;
          if (data.niRvana_favicon_32) {
            var favicon = document.createElement('link');
            favicon.setAttribute('rel', 'shortcut icon');
            favicon.setAttribute('sizes', '32x32');
            favicon.setAttribute('href', data.niRvana_favicon_32);
            document.head.append(favicon);
          }
          if (data.niRvana_apple_touch_icon) {
            var appleTouchIcon = document.createElement('link');
            appleTouchIcon.setAttribute('rel', 'apple-touch-icon');
            appleTouchIcon.setAttribute('href', data.niRvana_apple_touch_icon);
            document.head.append(appleTouchIcon);
          }
        })
        .catch((error) => {})
        .finally(() => {});
    },
    get_nav_menus() {
      this.$axios({
        method: 'post',
        url: this.$API + '/nv/get_nav_menu',
        responseType: 'json',
      })
        .then(({ data }) => {
          this.$store.state.nav_menus = data;
        })
        .catch((error) => {})
        .finally(() => {
          $fullLoading.end();
        });
    },
  },
};
</script>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fullScreenLoading {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: transparent;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  .bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 2px;
    right: 0;
    transform-origin: left;
    transform: scaleX(0.8);
    background: linear-gradient(var(--analogous-color), var(--primary-color));
    border-radius: 5px;
    box-shadow: 0 2px 3px var(--primary-opacity-4);
    transition: 4s;
  }
  .info {
    background: var(--white-default);
    box-shadow: 0 0 0 1px var(--gray-opacity-1), 0 5px 8px var(--gray-opacity-1);
    padding: 4px 14px;
    border-radius: 6px;
    opacity: 0;
    transform: scale(0.8);
    transition: transform 0.35s;
    .info-loading {
      width: 16px;
      vertical-align: middle;
    }
    .info-text {
      display: inline-block;
      line-height: 28px;
      vertical-align: middle;
      margin-left: 8px;
      font-size: 14px;
      color: var(--text-color-3);
    }
  }
  &.info {
    background: rgba(211, 222, 235, 0.6);
    transition: 0.5s;
    .info {
      opacity: 1;
      transform: scale(1);
    }
  }
}
.fade-enter-from {
  &.fullScreenLoading .bar {
    transform: scaleX(0);
    transition: transform 0s;
  }
}

.fade-leave-to {
  &.fullScreenLoading .bar {
    transform: scaleX(1);
    transition: transform 0.2s;
  }
}

/*.router-change-enter-active,
.router-change-leave-active {
	will-change: transform;
	transition: all .3s;
}
.router-change-enter-active {
	transition-delay: .3s;
}
.router-change-enter-from {
	opacity: 0;
	transform: translate3d(0, 20px, 0);
}
.router-change-leave-active {
	height: 0;
}
.router-change-leave-to {
	opacity: 0;
	transform: translate3d(0, -20px, 0);
}*/

main {
  flex-grow: 1;
  transition: opacity 0.3s, transform 0.5s;
}
main.is-leaving {
  opacity: 0;
}
@media (max-width: 991.5px) {
  main.is-menubar-open {
    transform: translateX(300px);
  }
  main.is-sidebar-open {
    transform: translateX(-20em);
  }
}

.router-change-enter-from,
.router-change-enter-active {
  display: none;
}
</style>
<style lang="less">
.circle-magic {
  position: absolute;
  top: 66px;
  left: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.n-image-preview-toolbar .n-base-icon {
  box-sizing: initial;
}

.n-back-top {
  width: 2.3rem;
  border-radius: 5px;
  padding: 0;
  min-width: auto;
  color: #73869a;
  text-shadow: 0 1px 1px #fff;
  background-color: #fff;
  height: 2.3rem;
  font-size: 1.3rem;
  line-height: 1.25rem;
  transition: 0.35s;
  i {
    transition: 0.35s;
  }
  &:hover {
    color: var(--primary-color);
    text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
  }
}
@keyframes clouds2 {
  97% {
    transform: translateX(-130px);
    opacity: 1;
  }

  98%,
  100% {
    opacity: 0;
  }

  99% {
    transform: translateX(-130px);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes arrow-animation {
  0% {
    transform: translateX(-4px);
    opacity: 0.5;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
