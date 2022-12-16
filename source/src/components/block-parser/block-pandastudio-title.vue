<template>
  <div class="scott-category" v-if="data.style == 1">
    <div>
      <component class="title" :is="data.tag" v-html="data.text" />
      <i class="fa-solid fa-jet-fighter"></i>
      <span class="cloud"></span>
      <span class="cloud two"></span>
    </div>
  </div>
  <div v-else class="pandastudio-title flex items-center justify-center" :data-tag="data.tag">
    <div class="wrapper">
      <i class="fa-regular fa-lemon"></i>
      <component class="title" :is="data.tag" v-html="data.text" />
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue';
export default defineComponent({
  name: 'block-pandastudio-title',
  props: {
    data: {
      type: Object,
    },
  },
});
</script>
<style scoped>
.pandastudio-title {
  margin-top: 1.2em;
  margin-bottom: 1.2em;
  color: var(--primary-color);
}
.pandastudio-title {
  text-shadow: 0 1px 1px var(--white-default);
  border-radius: 0.5em;
  padding: 0.5em 15px;
  text-align: center;
  position: relative;
  text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
}
.pandastudio-title i {
  margin-right: 0.5em;
  transition: 0.35s;
}
.pandastudio-title .title {
  font-size: 1em;
  transition: 0.35s;
  display: inline-block;
  border-bottom: 1.5px solid linear-gradient(var(--analogous-color) 20%, var(--primary-color) 80%);
}
.pandastudio-title .wrapper {
  background: #f0f6fc;
  z-index: 2;
  padding: 0 20px;
}
.pandastudio-title::after,
.pandastudio-title::before {
  content: '';
  display: block;
  border-top: 1px solid rgba(54, 100, 152, 0.15);
  box-shadow: 0 1px hsl(0deg 0% 100% / 80%);
  position: absolute;
  width: 50%;
}
.pandastudio-title::after {
  left: 0;
}
.pandastudio-title::before {
  right: 0;
}
.title {
  margin: 0;
  font-weight: normal;
}
</style>
