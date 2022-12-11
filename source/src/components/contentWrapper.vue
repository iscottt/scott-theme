<template>
  <div class="container grid" :data-type="type">
    <div class="main-column">
      <slot name="main">main</slot>
    </div>
    <teleport to="#app" :disabled="$store.state.window.width >= 992">
      <pf-scroller is="aside" :class="{ 'is-sidebar-open': $store.state.is_sidebar_open }">
        <slot name="aside">aside</slot>
      </pf-scroller>
    </teleport>
  </div>
</template>
<script>
import { NBackTop } from 'naive-ui';
export default {
  components: {
    NBackTop,
  },
  props: {
    type: {
      type: String,
      validator: (val) => ['line', 'transparent'].includes(val),
      default: 'line',
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  padding: 0 1em;
  grid-template-columns: 100% 0;
  /*@media (min-width: 992px) {
		grid-template-columns: calc(100% - 20em) 20em;
		padding: 0 2em;
		grid-gap: 1em;
	}*/
  @media (min-width: 992px) {
    grid-template-columns: 75% 25%;
    padding: 0 2em;
    grid-gap: 1em;
  }
  @media (min-width: 1510px) {
    grid-template-columns: 80% 20%;
  }
}
aside {
  padding-left: 1em;
  margin-top: 10px;
  border-left: 1px solid rgba(54, 100, 152, 0.15);
  box-shadow: inset 1px 0 hsl(0deg 0% 100% / 80%);
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
@media (max-width: 991.5px) {
  aside {
    position: fixed;
    top: 46px;
    right: 0;
    width: 20em;
    height: calc(100vh - 46px) !important;
    transform: translateX(20em);
    transition: 0.5s;
    &.is-sidebar-open {
      transform: translateX(0);
    }
  }
}
@media (min-width: 992px) {
  aside {
    position: sticky;
    top: 56px;
    max-height: calc(100vh - 56px);
    overflow: auto;
    mask-image: linear-gradient(transparent, #000 1.5em, #000 calc(100% - 2em), transparent), linear-gradient(90deg, transparent calc(100% - 0.5em), #000 0%);
    transition: height 0.5s;
  }
  [data-type='line'] aside {
    border-left: 1px solid var(--border-color);
    box-shadow: 1px 0 var(--white-opacity-7) inset;
  }
}
.main-column {
  max-width: 1140px;
}
</style>
