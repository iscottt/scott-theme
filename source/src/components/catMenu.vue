<template>
  <ul
    v-if="menu && !menu.every((item) => item.error)"
    :class="{
      menu: level == 0,
      submenu: level > 0,
      'is-dark-bg': level > 0,
    }"
    :data-level="level"
    :style="submenuStyle">
    <li
      class="anchor"
      ref="anchor"
      v-if="level == 0"
      :style="{
        //left: (targetLeft ? targetLeft : activeLeft) +'px',
        transform: `translateX(${targetLeft ? targetLeft : activeLeft}px)`,
        width: (targetWidth ? targetWidth : activeWidth) + 'px',
        opacity: targetWidth ? 1 : 0,
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
        <CatMenu :menu="item.children" :level="level + 1" v-if="item.children && !item.children.every((item) => item.error)" />
      </li>
    </template>
  </ul>
</template>

<script>
import { defineComponent } from 'vue';
import { throttle } from '/@/assets/throttle.js';
import aLink from '/@/components/aLink.vue';
export default defineComponent({
  name: 'cat-menu',
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
      submenuStyle: {},
    };
  },
  watch: {
    menu() {
      if (this.level == 0) {
        setTimeout(() => {
          this.parseActive();
        }, 500);
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
      setTimeout(() => {
        this.parseActive();
      }, 550);
    }
    if (this.level == 1) {
      this.$el.parentNode.addEventListener('mouseenter', this.parseSubmenuStyle);
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
        selfActive = cleanPath.includes(item.url);
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
    parseSubmenuStyle() {
      if (this.level !== 1) {
        return;
      }
      var submenu = this.$el;
      var liClientRect = submenu.parentNode.getBoundingClientRect();

      this.submenuStyle = {
        maxWidth: `${liClientRect.width}px`,
        left: `${liClientRect.x}px`,
        top: `${liClientRect.y + liClientRect.height + 3}px`,
      };
    },
  },
  beforeUnmount() {
    if (this.level == 0) {
      //取消拖拽窗口重新识别
      window.removeEventListener('resize', this.handleWindowResize);
    }
    if (this.level == 1) {
      this.$el.parentNode.removeEventListener('mouseenter', this.parseSubmenuStyle);
      window.removeEventListener('scroll', this.handleWindowScroll);
    }
  },
});
</script>

<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0;
  &[data-level='1'] {
    position: fixed;
  }
}
li {
  list-style: none;
  &:hover {
    > a {
      color: var(--primary-color);
      text-shadow: 0 1px 1px #fff;
      // text-shadow: 0 2px 2px var(--primary-opacity-5), 0 -1px var(--white-opacity-7);
    }
  }
  &.has-submenu {
    position: relative;
  }
  &.is-active {
    > a {
      color: #fff;
      text-shadow: 0 2px 2px var(--primary-color);
      font-weight: 500;
    }
  }
}
a {
  text-decoration: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  color: var(--text-color-2);
  text-shadow: 0 1px var(--white-opacity-7);
  padding: 0 20px;
  cursor: pointer;
  height: inherit;
  transition: 0.3s;
}

ul.menu {
  padding: 0 1px;
  display: grid;
  grid-gap: 0.25em;
  grid-auto-flow: column;
  justify-content: start;
  position: relative;
  height: inherit;
  > li {
    height: inherit;
    &.anchor {
      position: absolute;
      z-index: -1;
      top: 1px;
      transition: transform cubic-bezier(0.3, 1.6, 0.7, 1) 0.5s, width cubic-bezier(0.3, 1.6, 0.7, 1) 0.5s, opacity 0.5s, top 0.2s;
      &:before {
        content: '';
        display: block;
        width: 100%;
        height: inherit;
        border: 1px solid;
        box-sizing: border-box;
        border-radius: 9em;
        border-color: rgba(0, 125, 255, 0.4);
        background: radial-gradient(rgba(0, 125, 255, 0.1), rgba(0, 125, 255, 0));
      }
    }
  }
}

ul.submenu {
  padding: 4px;
  border-radius: 8px;
  background: linear-gradient(hsla(0, 0%, 100%, 0.95), hsla(213, 40%, 96%, 0.95)) no-repeat;
  box-shadow: 0 0 0 1px #fff inset, 0 6px 8px var(--gray-opacity-2);
  opacity: 0;
  visibility: hidden;
  transform-style: preserve-3d;
  transform-origin: top center;
  transform: translateZ(2px) translateY(-5px) scale(0.8);
  transition: opacity 0.25s, transform 0.25s, visibility 0.25s;
  z-index: 1;
  a {
    color: var(--text-color-3);
  }
  > li {
    &.is-active > a {
      color: var(--primary-color);
      text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
      font-weight: 500;
    }
    > a {
      padding: 7px 16px;
      border-radius: 5px;
    }
    &:hover {
      > a {
        color: var(--primary-color);
        // text-shadow: 0 1px var(--white-default);
        background: var(--primary-opacity-2);
        box-shadow: 0 0 0 1px var(--primary-opacity-3) inset;
      }
      > ul.submenu {
        transform: scale(1);
      }
    }
    ul.submenu {
      &:before {
        content: none;
      }
      position: absolute;
      top: -4px;
      left: calc(100% + 8px);
      transform: translateX(-50%) scale(1);
    }
  }
}

li:hover {
  > ul.submenu {
    opacity: 1;
    visibility: visible;
    transform: translateZ(2px);
  }
}

[data-level='0'] > li.is-active {
  border-radius: 9em;
  background: linear-gradient(90deg, var(--primary-color), var(--analogous-color));
  box-shadow: 0 5px 9px var(--primary-opacity-4);
}

.is-dark {
  a {
    color: rgba(255, 255, 255, 0.82);
    text-shadow: none;
    &:hover {
      text-shadow: none;
    }
  }
  .submenu {
    background: none;
  }
}
</style>
