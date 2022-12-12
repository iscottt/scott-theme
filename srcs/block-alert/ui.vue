<template>
  <div
    class="scottstudio-alert"
    :class="{
      error: type == 'error',
      warning: type == 'warning',
      success: type == 'success',
    }">
    <div class="icon">
      <i class="fa-solid fa-circle-exclamation" v-if="type == 'warning'"></i>
      <i class="fa-solid fa-circle-check" v-else-if="type == 'success'"></i>
      <i class="fa-solid fa-circle-xmark" v-else-if="type == 'error'"></i>
      <i class="fa-solid fa-circle-info" v-else></i>
    </div>
    <richText class="title" v-model:value="title" />
  </div>
</template>
<script>
export default {
  name: 'pandastudio-alert-block',
  components: {
    richText: nv.components.richText,
    innerBlocks: nv.components.innerBlocks,
  },
  data() {
    return {
      type: '',
      title: '',
    };
  },
  mounted() {
    // 加载默认数据
    nv.block.loadDefaultData.bind(this)();
  },
};
</script>
<style scoped>
.scottstudio-alert {
  --solid-color: var(--primary-color);
  --opacity-color: var(--primary-opacity-1);
  --content-color: var(--text-color-2);
  background: var(--opacity-color);
  margin: 0;
  padding: 8px 12px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  width: fit-content;
  position: relative;
  display: flex;
  align-items: center;
  word-wrap: break-word;
  border-radius: 8px;
  /* background-color: #e6f4ff; */
  border: 1px solid;
  border-color: var(--solid-color);
}
.scottstudio-alert .icon {
  --content-color: var(--text-color-2);
  color: var(--solid-color);
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
.scottstudio-alert .icon i {
  font-style: normal;
}
.scottstudio-alert .content {
  flex: 1;
}
.scottstudio-alert.success {
  --solid-color: var(--success-color);
  --opacity-color: rgba(103, 194, 58, 0.1);
}

.scottstudio-alert.warning {
  --solid-color: var(--warning-color);
  --opacity-color: rgba(230, 162, 60, 0.1);
}
.scottstudio-alert.error {
  --solid-color: var(--error-color);
  --opacity-color: rgba(245, 108, 108, 0.1);
}
</style>

<style>
.is-dark .pandastudio-tip .content {
  color: var(--text-color-2) !important;
}
</style>
