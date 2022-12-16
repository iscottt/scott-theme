<template>
  <div
    class="top-nav-wrapper"
    :class="{
      floated: floatIn,
    }">
    <div class="top-nav">
      <div class="container">
        <button
          class="menu-button"
          :class="{
            active: $store.state.is_menubar_open,
          }"
          @click="$store.dispatch('toggleMenubar')">
          <span v-for="i in 3"></span>
        </button>
        <div class="logo-wrapper">
          <NvLogo />
        </div>
        <nav
          class="menu-wrapper"
          :class="{
            'is-menubar-open': $store.state.is_menubar_open,
          }">
          <NvMenu :menu="$store.state.nav_menus.topNav" />
          <!-- <button>搜索</button> -->
          <NvLogin />
        </nav>
        <button
          class="sidebar-button"
          :class="{
            active: $store.state.is_sidebar_open,
          }"
          v-html="sidebarIcon"
          @click="$store.dispatch('toggleSidebar')"></button>
      </div>
    </div>
  </div>
</template>

<script>
import sidebarIcon from '/@/assets/images/sidebar.svg';
import { defineComponent, h } from 'vue';
import { useMessage, useNotification } from 'naive-ui';
import NvMenu from './nv-menu.vue';
import NvLogo from './nv-logo.vue';
import NvLogin from './nv-login.vue';
export default defineComponent({
  name: 'topNav',
  components: {
    NvMenu,
    NvLogo,
    NvLogin,
  },
  data() {
    return {
      sidebarIcon,
      floatIn: false,
      observer: null,
    };
  },
  mounted() {
    window.$message = useMessage();
    window.$notification = useNotification();
  },
  computed: {
    isBarOpen() {
      return this.$store.state.is_sidebar_open || this.$store.state.is_menubar_open;
    },
  },
  watch: {
    $route() {
      setTimeout(() => {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
      }, 500);
      setTimeout(() => {
        this.initObserver();
      }, 1000);
    },
  },
  methods: {
    initObserver() {
      var allSlides = document.querySelectorAll('.nv-top-slider');
      if (allSlides.length) {
        var slider = allSlides[allSlides.length - 1];
        if (slider) {
          this.observer = new IntersectionObserver(this.handleObserver, {
            threshold: [0, 0.01, 0.8, 1],
          });
          this.observer.observe(slider);
        }
      }
    },
    handleObserver([{ intersectionRatio }]) {
      if (intersectionRatio < 1) {
        this.floatIn = true;
        // this.floatIn = true;
        // console.log('显示')
      }

      if (intersectionRatio >= 1) {
        this.floatIn = false;
        this.float = false;
        // console.log('显示')
      }
    },
  },
});
</script>

<style lang="less" scoped>
.top-nav-wrapper {
  height: 0;
  position: sticky;
  top: 0;
  height: 56px;
  z-index: 999;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 1px;
    z-index: -1;
    background: linear-gradient(#f0f6fc 76%, #d3dfed);
    box-shadow: inset 0 -1px hsl(0deg 0% 100% / 30%), 0 1px rgb(164 181 201 / 50%), 0 4px 6px rgb(54 100 152 / 20%);
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
    transition: 0.35s;
  }
}

.top-nav-wrapper.floated {
  &::before {
    opacity: 1;
    transform: scaleY(1);
  }
}
@media (min-width: 992px) {
  .container,
  .menu-wrapper {
    height: inherit;
  }
  .top-nav,
  .logo-wrapper {
    height: 56px;
    max-height: 56px;
  }
  .container {
    display: flex;
    padding: 0 2em;
  }
  .menu-wrapper {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
  }
  .menu-button,
  .sidebar-button {
    display: none;
  }
}
@media (max-width: 991.5px) {
  .container,
  .menu-wrapper {
    height: inherit;
  }
  .top-nav,
  .logo-wrapper {
    height: 46px;
    max-height: 46px;
  }
  .container {
    display: flex;
    justify-content: center;
  }
  .logo-wrapper {
    flex-grow: 1;
  }
  .menu-wrapper {
    position: fixed;
    overflow: auto;
    top: 56px;
    left: 10px;
    height: calc(100vh - 66px);
    width: 280px;
    background: linear-gradient(hsla(0, 0%, 100%, 0.9), hsla(213, 40%, 96%, 0.9));
    // background: linear-gradient(rgba(255,255,255,.7),rgba(240,240,240,.7));
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.6) inset, 0 0 0 1px var(--gray-opacity-1), 0 5px 8px var(--gray-opacity-2);
    border-radius: 10px;
    transform-origin: left;
    transform: translateX(-50px) scale(0.9);
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
    &.is-menubar-open {
      visibility: visible;
      transform: none;
      opacity: 1;
      transition: 0.3s ease 0.25s;
    }
  }
  .menu-button,
  .sidebar-button {
    background: none;
    border: none;
    width: 50px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sidebar-button {
    color: var(--text-color-3);
    transition: 0.35s;
    &.active {
      color: #fff;
    }
  }
  .float-in,
  .is-bar-open {
    .sidebar-button {
      color: var(--text-color-3);
      &.active {
        color: var(--primary-color);
      }
    }
  }
  .menu-button {
    flex-direction: column;
    span {
      width: 20px;
      height: 1px;
      border-radius: 1em;
      background: #324057;
      margin: 2.5px 0;
      transition: 0.35s, margin 0.2s ease-out 0.2s, width 0.2s ease-in-out 0.1s, transform 0.3s;
      &:first-child,
      &:last-child {
        width: 13px;
      }
    }
    &.active {
      span {
        width: 20px;
        margin: -0.5px;
        background: #fff;
        transition: 0.35s, margin 0.2s, width 0.2s 0.2s, transform 0.3s ease-in-out 0.1s;
        &:first-child {
          transform: rotate(-45deg);
        }
        &:nth-child(2) {
          width: 0;
          opacity: 0;
        }
        &:last-child {
          transform: rotate(45deg);
        }
      }
    }
  }
  .float-in,
  .is-bar-open {
    .menu-button span {
      background: var(--text-color-3);
    }
    .menu-button.active span {
      background: var(--primary-color);
    }
  }
}
.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.top-nav {
  position: relative;
  // background: linear-gradient(#f0f6fc 76%, #d3dfed);
  // box-shadow: inset 0 -1px hsl(0deg 0% 100% / 30%), 0 1px rgb(164 181 201 / 50%), 0 4px 6px rgb(54 100 152 / 20%);
  animation: navDown 0.3s forwards;
}
@keyframes navDown {
  from {
    opacity: 0;
    transform: translateY(-56px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.logo-wrapper {
  color: rgba(255, 255, 255, 0.7);
  transition: 0.35s;
}
@media (max-width: 991.5px) {
  .top-nav.is-bar-open {
    position: fixed;
    visibility: hidden;
    top: -56px;
    opacity: 0;
    left: 0;
    right: 0;
    background-position: top left;
    box-shadow: 0 -1px rgba(255, 255, 255, 0.6) inset, 0 1px var(--gray-opacity-1), 0 5px 8px var(--gray-opacity-1);
    animation: none;
    transition: 0.25s;
  }
  .top-nav.is-bar-open {
    visibility: visible;
    top: 0;
    opacity: 1;
  }
}

.is-dark {
  .top-nav-wrapper {
    &:before {
      background: #202124;
      box-shadow: none;
    }
  }
}
</style>
