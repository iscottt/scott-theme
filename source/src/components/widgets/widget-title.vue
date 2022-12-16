<template>
  <div class="scott-category">
    <div>
      <slot />
      <i class="fa-solid fa-jet-fighter"></i>
      <span class="cloud"></span>
      <span class="cloud two"></span>
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

.scott-category {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  h2 {
    font-size: 18px;
  }
  &:after {
    content: '';
    display: block;
    border-top: 1px solid rgba(54, 100, 152, 0.15);
    box-shadow: 0 1px hsl(0deg 0% 100% / 80%);
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    color: #007dff;
    font-size: 0.952rem;
    line-height: 1.75rem;
    font-weight: 500;
    text-shadow: 0 2px 2px var(--primary-opacity-3), 0 -1px var(--white-default);
    border-radius: 0.375rem;
    margin-right: 1em;
    transition: 0.35s;
    .title {
      display: inline-block;
    }
    i {
      font-size: 0.9rem;
      color: #5a6f87;
      color: #007dff;
      line-height: 1.75rem;
      display: block;
      transition: color 0.35s;
      margin-left: 6px;
    }
    &:hover {
      transform: translateX(5px);
      i {
        animation: arrow-animation 0.5s infinite alternate;
      }
      .cloud {
        animation: clouds2 3s linear infinite var(--cd, 0s);
      }
    }
    .cloud {
      width: 12px;
      height: 4px;
      border-radius: 2px;
      background: #fff;
      position: absolute;
      top: var(--ct, 8px);
      left: 100%;
      opacity: 0.9;
      transition: opacity 0.3s;
      display: block;
      &:after,
      &::before {
        content: '';
        position: absolute;
        transform: translateX(var(--cx, 0));
        border-radius: 50%;
        width: var(--cs, 5px);
        height: var(--cs, 5px);
        background: #fff;
        bottom: 1px;
        left: 1px;
      }
      &:after {
        --cs: 6px;
        --cx: 4px;
      }
      &.two {
        --ct: 20px;
        --cd: 1s;
        opacity: 0.8;
      }
    }
  }
}

.is-dark {
  .scott-category {
    &:after {
      box-shadow: none;
      border-color: #484849;
    }
    div {
      color: var(--primary-color);
      text-shadow: none;
      i {
        color: var(--primary-color);
      }
    }
  }
}
</style>
