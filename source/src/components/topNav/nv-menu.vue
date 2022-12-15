<template>
  <ul
    v-if="menu && !menu.every((item) => item.error)"
    :class="{
      menu: level == 0,
      submenu: level > 0,
      'is-dark-bg': level > 0,
    }"
    :data-level="level">
    <li
      class="anchor"
      ref="anchor"
      v-if="level == 0"
      :style="{
        //left: (targetLeft ? targetLeft : activeLeft) +'px',
        transform: `translateX(${targetLeft ? targetLeft : activeLeft}px)`,
        opacity: activeWidth || targetWidth ? 1 : 0,
      }"></li>
    <template v-for="item in menu">
      <li
        v-if="!item.error"
        :class="{
          'has-submenu': item.children && !item.children.every((item) => item.error),
          'is-active': isActiveItem(item),
        }"
        @mouseenter="
          (event) => {
            level == 0 && handleMouseenter(event);
          }
        "
        @mouseleave="
          (event) => {
            level == 0 && handleMouseleave(event);
          }
        ">
        <a-link :to="item.children && !item.children.every((item) => item.error) ? '' : item.url" :target="item.opennew ? '_blank' : '_self'" :label="item.label"></a-link>
        <NvMenu :menu="item.children" :level="level + 1" v-if="item.children && !item.children.every((item) => item.error)" />
      </li>
    </template>
  </ul>
</template>

<script>
import { defineComponent } from 'vue';
import { throttle } from '/@/assets/throttle.js';
import aLink from '/@/components/aLink.vue';
export default defineComponent({
  name: 'nv-menu',
  components: { aLink },
  props: {
    menu: {
      type: Array,
      default() {
        return [];
      },
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      activeLeft: 0,
      activeWidth: 0,
      targetLeft: 0,
      targetWidth: 0,
    };
  },
  watch: {
    menu() {
      if (this.level == 0) {
        this.$nextTick(() => {
          this.parseActive();
        });
      }
    },
    '$route.path'() {
      if (this.level == 0) {
        this.activeWidth = 0;
        this.$nextTick(() => {
          this.parseActive();
        });
      }
    },
  },
  mounted() {
    if (this.level == 0) {
      //添加拖拽窗口重新识别
      window.addEventListener('resize', this.handleWindowResize);
    }
  },
  methods: {
    handleWindowResize() {
      throttle(
        () => {
          this.parseActive();
        },
        300,
        false
      );
    },
    handleMouseenter(event) {
      var target = event.target;
      this.targetLeft = target.offsetLeft;
      this.targetWidth = target.clientWidth;
    },
    handleMouseleave(event) {
      if (this.activeWidth) {
        this.targetLeft = 0;
      }
      this.targetWidth = 0;
    },
    parseActive() {
      var children = this.$el.children;
      if (children) {
        for (var i = 0; i < children.length; i++) {
          var li = children[i];
          if (li.classList.contains('is-active')) {
            this.activeLeft = li.offsetLeft;
            this.activeWidth = li.clientWidth;
            break;
          }
        }
      }
    },
    isActiveItem(item) {
      var cleanPath = this.$route.path.replace(/\/\/+/g, '/');

      // 先判断自己是不是 active
      var selfActive = false;
      if (item.url == '') {
        selfActive = false;
      } else if (item.url == '/') {
        selfActive = cleanPath == '/';
      } else {
        selfActive = cleanPath.includes(item.url.replace(/\/$/, ''));
      }

      if (selfActive) {
        // 如果自己是active，那就不用判断children了
        return selfActive;
      } else {
        // 否则需要循环判断 children 是不是 active
        if (item.children && item.children.length > 0) {
          return item.children.some((subItem) => this.isActiveItem(subItem));
        } else {
          return false;
        }
      }
    },
  },
  beforeUnmount() {
    if (this.level == 0) {
      //取消拖拽窗口重新识别
      window.removeEventListener('resize', this.handleWindowResize);
    }
  },
});
</script>

<style lang="less" scoped>
@media (min-width: 992px) {
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
    &:hover {
      > a {
        color: var(--primary-color);
      }
    }
    &.has-submenu {
      position: relative;
    }
    &.is-active {
      > a {
        color: var(--primary-color);
        text-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
      }
    }
  }
  a {
    text-decoration: none;
    white-space: nowrap;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: var(--text-color);
    cursor: pointer;
    height: inherit;
    transition: 0.3s;
  }

  ul.menu {
    padding: 0 1px;
    display: grid;
    grid-auto-flow: column;
    justify-content: end;
    position: relative;
    height: inherit;
    > li {
      height: inherit;
      &.anchor {
        width: 90px;
        position: absolute;
        bottom: 6px;
        height: 3px;
        padding: 0 15px;
        left: 10px;
        transition: transform cubic-bezier(0.3, 1.6, 0.7, 1) 0.5s, width cubic-bezier(0.3, 1.6, 0.7, 1) 0.5s, opacity 0.5s, top 0.2s;
        &:before {
          content: '';
          display: block;
          width: 40%;
          height: inherit;
          border-radius: 1em;
          background: linear-gradient(var(--analogous-color) 20%, var(--primary-color) 80%);
          box-shadow: 0 3px 4px var(--primary-opacity-6);
          float: left;
          margin-left: 8px;
        }
        &:after {
          content: '';
          display: block;
          width: 3px;
          height: inherit;
          border-radius: 1em;
          background: linear-gradient(var(--analogous-color) 20%, var(--primary-color) 80%);
          box-shadow: 0 3px 4px var(--primary-opacity-6);
          transform: scale(1.3);
        }
      }
    }
  }

  ul.submenu {
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    padding: 4px;
    border-radius: 8px;
    left: 50%;
    min-width: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform-origin: top center;
    transform: translateX(-50%) translateY(-5px) scale(0.8);
    transition: 0.3s;
    &:before {
      content: '';
      display: block;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid rgba(0, 0, 0, 0.6);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -5px;
    }
    > li {
      > a {
        padding: 7px 16px;
        border-radius: 5px;
      }
      &:hover {
        > a {
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }
        > ul.submenu {
          transform: scale(1);
        }
      }
      ul.submenu {
        &:before {
          content: none;
        }
        top: -4px;
        left: calc(100% + 8px);
        transform: translateX(-50%) scale(1);
      }
    }
  }
  li:hover {
    > ul.submenu {
      transform: translateX(-50%) translateY(-5px) scale(1);
      opacity: 1;
      visibility: visible;
    }
  }

  .float-in {
    li {
      &:hover {
        > a {
          color: var(--primary-color);
        }
      }
      &.has-submenu {
        position: relative;
      }
      &.is-active {
        > a {
          color: var(--primary-color);
          text-shadow: 0 -1px #fff, 0 2px 2px var(--primary-opacity-4);
        }
      }
    }
    a {
      color: var(--text-color-3);
      text-shadow: 0 1px #fff;
    }
    ul.menu > li.anchor {
      // top: 54px;
      // top: unset;
      bottom: -1px;
    }
    ul.submenu {
      // background: linear-gradient(rgba(255,255,255,.9),rgba(255,255,255,.6)) no-repeat;
      background: linear-gradient(hsla(0, 0%, 100%, 0.95), hsla(213, 40%, 96%, 0.95)) no-repeat;
      box-shadow: 0 0 0 1px #fff inset, 0 6px 8px var(--gray-opacity-2);
      transform: translateX(-50%) translateY(5px) scale(0.8);
      &:before {
        content: none;
      }
      > li {
        &:hover {
          > a {
            background: var(--primary-opacity-2);
            box-shadow: 0 0 0 1px var(--primary-opacity-3) inset;
          }
        }
      }
    }
    li:hover {
      > ul.submenu {
        transform: translateX(-50%) translateY(5px) scale(1);
        opacity: 1;
        visibility: visible;
      }
    }
  }
}
@media (max-width: 991.5px) {
  .anchor {
    display: none;
  }
  ul {
    padding: 0;
    margin: 0;
    color: var(--text-color-3);
  }
  li {
    list-style: none;
    a {
      display: inline-block;
      white-space: nowrap;
      color: inherit;
      cursor: pointer;
      text-decoration: none;
      text-shadow: 0 1px var(--white-default);
      transition: color 0.25s;
    }
    &:hover {
      > a {
        color: var(--primary-color);
      }
      > .submenu {
        visibility: visible;
        opacity: 1;
        transform: translateX(1em);
      }
    }
    &.is-active {
      color: var(--primary-color);
      > a {
        text-shadow: 0 -1px #fff, 0 2px 2px var(--primary-opacity-4);
      }
    }
  }
  .menu {
    padding: 0 1.3em;
  }
  .menu > li {
    padding: 0.8em 0.2em;
    border-bottom: 1px solid var(--border-color-2);
    box-shadow: 0 1px var(--text-shadow);
  }
  .submenu {
    position: absolute;
    // background: var(--gray-8);
    background: linear-gradient(hsla(0, 0%, 100%, 0.9), hsla(213, 40%, 96%, 0.9));
    -webkit-backdrop-filter: blur(0.25em);
    backdrop-filter: blur(0.25em);
    box-shadow: 0 0 0 1px var(--text-shadow) inset, 0 0 0 1px var(--gray-opacity-1), 0 8px 10px var(--gray-opacity-2);
    border-radius: 0.5em;
    display: inline-block;
    visibility: hidden;
    padding: 0.25em;
    opacity: 0;
    transition: 0.25s;
    li {
      padding: 0.5em 1.2em;
      border-radius: 0.3em;
      &:hover {
        background: var(--primary-opacity-2);
        box-shadow: 0 0 0 1px var(--primary-opacity-3) inset;
        color: var(--primary-color);
      }
    }
  }
  li.has-submenu {
    > a {
      margin-right: -0.5em;
      padding-right: 1em;
      position: relative;
      &:before,
      &:after {
        content: '';
        width: 5px;
        height: 1px;
        display: block;
        // background: var(--text-color-3);
        background: currentColor;
        position: absolute;
        right: 0;
        top: calc(50% - 0.5px);
        transform-origin: calc(100% - 0.5px) center;
        transform: rotate(-45deg);
        border-radius: 1px;
      }
      &:after {
        transform: rotate(45deg);
      }
    }
  }
}
</style>
