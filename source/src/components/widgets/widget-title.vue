<template>
  <div class="widget-title">
    <span><slot /></span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'widget-title',
});
</script>

<style lang="less">
.widget-title {
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 1px var(--white-opacity-7);
  color: #5a6f87;
  span {
    display: inline-block;
    position: relative;
    padding-bottom: 0.4em;
    transition: 0.35s;
    text-shadow: 0.12rem 0.12rem 0.2rem #bec9d5, -1px -1px 1px hsl(0deg 0% 100% / 80%);
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      height: 3px;
      width: 2em;
      border-radius: 9px;
      background: linear-gradient(var(--analogous-color) 20%, var(--primary-color) 80%);
      box-shadow: 0 3px 4px var(--primary-opacity-5);
      transition: 0.35s;
    }
  }
}
.widget:hover .widget-title span {
  color: var(--primary-color);
  text-shadow: 0 2px 2px var(--primary-opacity-4), 0 -1px var(--white-default);
  &:after {
    width: 100%;
  }
}
</style>
