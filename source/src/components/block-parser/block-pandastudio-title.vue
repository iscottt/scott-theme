<template>
  <div class="pandastudio-title" :data-tag="data.tag" :data-style="data.style">
    <component class="title" :is="data.tag" v-html="data.text" />
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
.pandastudio-title[data-style='1'] {
  --inset: 3em;
  margin-left: calc(0px - var(--inset));
  margin-right: calc(0px - var(--inset));
  border-bottom: 1px solid var(--border-color);
  padding-left: var(--inset);
  padding-right: var(--inset);
  padding-bottom: 5px;
  position: relative;
  text-shadow: 0 1px 1px var(--white-default);
}
.pandastudio-title[data-style='1'] .title {
  font-size: 1.25em;
}
.pandastudio-title[data-style='1']:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: var(--inset);
  height: 3px;
  border-radius: 3px;
  width: 2em;
  background: linear-gradient(#33bbff, #1f8bff);
  box-shadow: 0 3px 4px var(--primary-opacity-5);
  transition: 0.25s;
}
.pandastudio-title[data-style='1']:hover:after {
  width: 4em;
}
@media (max-width: 650.5px) {
  .pandastudio-title[data-style='1'] {
    --inset: 1em;
  }
}
.pandastudio-title[data-style='2'] {
  border-left: 3px solid var(--primary-color);
  background: var(--primary-opacity-1);
  text-shadow: 0 1px 1px var(--white-default);
  border-radius: 0 8px 8px 0;
  padding: 0.5em 15px;
}
.pandastudio-title[data-style='2'] .title {
  font-size: 1.1875em;
  transition: 0.35s;
}
.pandastudio-title[data-style='2'] .title:hover {
  text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
}

.title {
  margin: 0;
  font-weight: normal;
}
</style>
