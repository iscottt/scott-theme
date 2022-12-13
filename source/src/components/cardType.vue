<template>
  <ul class="card-type">
    <li
      class="anchor"
      ref="anchor"
      :style="{
        transform: `translateX(${$store.state.card_type == 'card' ? 1 : 41}px)`,
      }"></li>
    <n-tooltip>
      <template #trigger>
        <li
          class="flex items-center justify-center"
          :class="{
            'is-active': $store.state.card_type == 'card',
          }"
          @click="$store.state.card_type = 'card'">
          <svg-icon name="grip" />
        </li>
      </template>
      卡片
    </n-tooltip>
    <n-tooltip>
      <template #trigger>
        <li
          class="flex items-center justify-center"
          :class="{
            'is-active': $store.state.card_type == 'list',
          }"
          @click="$store.state.card_type = 'list'">
          <svg-icon name="list" />
        </li>
      </template>
      列表
    </n-tooltip>
  </ul>
</template>

<script>
import { NTooltip } from 'naive-ui';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'card-type',
  components: {
    NTooltip,
  },
});
</script>

<style lang="less" scoped>
ul {
  margin: 0;
  padding: 1px;
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
  position: relative;
  background: rgba(31, 45, 61, 0.04);
  // box-shadow: -10px -10px 15px rgba(255, 255, 255, 0.5), 10px 10px 15px rgba(70, 70, 70, 0.12), inset -10px -10px 15px rgba(255, 255, 255, 0.5), inset 10px 10px 15px rgba(70, 70, 70, 0.12);

  box-shadow: min(-1px, -0.0625rem) min(-1px, -0.0625rem) hsla(0, 0%, 100%, 0.6), max(1px, 0.0625rem) max(1px, 0.0625rem) rgba(54, 100, 152, 0.2),
    inset 0.1875rem 0.1875rem 0.1875rem rgba(54, 100, 152, 0.2), inset -0.125rem -0.125rem 0.1875rem hsla(0, 0%, 100%, 0.6);
  border-radius: 9em;
  overflow: hidden;
}
li {
  list-style: none;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  color: var(--gray-4);
  position: relative;
  transition: color 0.3s;
  &.anchor {
    position: absolute;
    box-shadow: 0 6px 6px #0000000d, 0 10px 10px #00000026, 0 -1px 2px var(--white-default) inset;
    background: rgb(255, 255, 255);
    transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
    z-index: 0;
  }
  &.is-active {
    color: var(--primary-color);
  }
  &:not(.anchor):after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: radial-gradient(closest-side at center, rgba(255, 255, 255, 0.55), transparent);
    opacity: 0;
    transform: scale(0.4);
    z-index: -2;
    transition: 0.25s;
  }
}
</style>
<style lang="less">
.card-type {
  .svg-icon path {
    filter: drop-shadow(0 33px 0 var(--white-opacity-6));
  }
}

@media (max-width: 768px) {
  .card-type {
    width: 80px;
  }
}
</style>
