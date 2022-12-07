<template>
  <div class="modal-wrapper">
    <widgetTitle>
      {{ title }}
    </widgetTitle>
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import widgetTitle from '/@/components/widgets/widget-title.vue';

export default defineComponent({
  components: {
    widgetTitle,
  },
  name: 'modal-wrapper',
  props: {
    title: {
      type: String,
      default: '未标题',
    },
    icon: {
      type: String,
      default: 'star-o',
    },
  },
});
</script>

<style lang="less">
.modal-wrapper {
  padding: 1.2em 3em 2em;
  // background: var(--white-opacity-9);
  // border: 1px solid var(--white-default);
  // border-radius: .8125em;
  // box-shadow: 0 0 0 1px rgba(0,0,0,.05),0 10px 15px var(--gray-opacity-1);
  // box-shadow: 0 0 0 1px rgba(0,0,0,.08),0 10px 15px var(--gray-opacity-1);
  margin: 1.5em 0;
  > .title {
    border-bottom: 1px solid var(--border-color-2);
    box-shadow: 0 1px var(--white-default);
    margin: 0 -3em 1em;
    padding: 0 3em;
    color: var(--text-color-4);
    text-shadow: 0 1px var(--white-default);
    transition: 0.25s;
    .svg-icon {
      margin-right: 0.5em;
    }
    span {
      font-size: 120%;
      position: relative;
      display: inline-block;
      padding-bottom: 0.7em;
      &:after {
        content: '';
        position: absolute;
        left: calc(0.4em + 20px);
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
  &:hover {
    > .title {
      color: var(--primary-color);
      text-shadow: 0 2px 2px var(--primary-opacity-3), 0 -1px var(--white-default);
      span:after {
        width: calc(100% - 0.4em - 20px);
      }
    }
  }
}
@media (max-width: 577px) {
  .modal-wrapper {
    padding: 1em;
    margin: 0.5em -1em 0;
    border-radius: 0;
    box-shadow: none;
    border: none;
    > .title {
      margin: 0 -1em 1em;
      padding: 0 1em;
      span {
        font-size: 110%;
      }
    }
  }
}
</style>
