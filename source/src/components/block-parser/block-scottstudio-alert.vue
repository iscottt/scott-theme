<template>
  <div
    class="scott-alert"
    :class="{
      error: data.type == 'error',
      warning: data.type == 'warning',
      success: data.type == 'success',
    }">
    <div class="icon">
      <i class="fa-solid fa-circle-exclamation" v-if="data.type == 'warning'"></i>
      <i class="fa-solid fa-circle-check" v-else-if="data.type == 'success'"></i>
      <i class="fa-solid fa-circle-xmark" v-else-if="data.type == 'error'"></i>
      <i class="fa-solid fa-circle-info" v-else></i>
    </div>
    <div class="content" v-html="data.title"></div>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue';
import blockParser from '/@/components/block-parser/parser.vue';
export default defineComponent({
  name: 'block-tip',
  props: {
    data: {
      type: Object,
    },
  },
  components: { blockParser },
});
</script>
<style lang="less" scoped>
.scott-alert {
  margin: 0;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  width: fit-content;
  position: relative;
  display: flex;
  align-items: center;
  word-wrap: break-word;
  border-radius: 8px;
  background: var(--primary-opacity-1);
  border: 1px solid;
  border-color: var(--primary-color);
  .icon {
    color: var(--primary-color);
    margin-inline-end: 8px;
    display: inline-flex;
    align-items: center;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  .content {
    flex: 1;
  }

  &.success {
    background: rgba(103, 194, 58, 0.1);
    border-color: var(--success-color);
    .icon {
      color: var(--success-color);
    }
    .content {
      color: #36661f;
    }
  }
  &.warning {
    background: rgba(230, 162, 60, 0.1);
    border-color: var(--warning-color);
    .icon {
      color: var(--warning-color);
    }
    .content {
      color: #66481b;
    }
  }
  &.error {
    background: rgba(245, 108, 108, 0.1);
    border-color: var(--error-color);
    .icon {
      color: var(--error-color);
    }
    .content {
      color: #662d2d;
    }
  }
}
</style>
<style lang="less">
.is-dark {
  .scott-alert {
    background-color: #111b26;
    border: 1px solid #153450;
    .content {
      color: #fff;
    }
  }
}
</style>
