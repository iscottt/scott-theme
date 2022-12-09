<template>
  <div class="tune-buttons"></div>
</template>
<script>
export default {
  name: 'pandastudio-collapse-settings',
  data() {
    return {};
  },
  mounted() {
    // 加载默认数据
    nv.block.loadDefaultData.bind(this)();
  },
  methods: {},
};
</script>
