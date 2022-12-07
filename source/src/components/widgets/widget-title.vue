<template>
  <div class="scott-title">
    <div class="title-con">
      <span class="outer"><span class="inner"></span></span>
      <slot />
    </div>
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
    font-weight: 500;
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

.scott-title {
  text-shadow: 0.12rem 0.12rem 0.2rem #bec9d5, -1px -1px 1px hsl(0deg 0% 100% / 80%);
  grid-template-columns: auto 1fr;
  margin-bottom: 1.25rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  align-items: center;
  display: grid;
  &:after {
    content: '';
    display: block;
    border-top: 1px solid rgba(54, 100, 152, 0.15);
    box-shadow: 0 1px hsl(0deg 0% 100% / 80%);
  }
  .title-con {
    margin-right: 1rem;
    align-items: center;
    display: inline-flex;
    .outer {
      position: relative;
      height: 0.5rem;
      padding-left: 1.25rem;
      margin-right: 0.25rem;
      &::before,
      &::after {
        content: '';
        display: block;
        width: 0.25rem;
        height: 0.25rem;
        background: #00c6ff;
        box-shadow: inset -0.0625rem -0.0625rem 0.0625rem #007dff, -0.0884rem -0.0884rem 0.125rem hsl(0deg 0% 100% / 50%), 0.0884rem 0.0884rem 0.125rem rgb(0 125 255 / 50%);
        border-radius: 0.0625rem;
        left: 0;
        top: 0;
        position: absolute;
      }
      &:after {
        left: 0.375rem;
      }
      .inner {
        &::before,
        &::after {
          content: '';
          display: block;
          width: 0.25rem;
          height: 0.25rem;
          background: #00c6ff;
          box-shadow: inset -0.0625rem -0.0625rem 0.0625rem #007dff, -0.0884rem -0.0884rem 0.125rem hsl(0deg 0% 100% / 50%), 0.0884rem 0.0884rem 0.125rem rgb(0 125 255 / 50%);
          border-radius: 0.0625rem;
          left: 0;
          top: 0;
          position: absolute;
        }
        &:before {
          top: 0.375rem;
        }
        &:after {
          top: 0.375rem;
          left: 0.375rem;
        }
      }
    }
  }
}
</style>
