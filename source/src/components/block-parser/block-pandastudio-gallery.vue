<template>
  <NConfigProvider :locale="zhCN">
    <div
      class="pandastudio-gallery"
      :class="{
        'align-left': data.align == 'left',
        'align-center': data.align == 'center',
        'align-right': data.align == 'right',
      }">
      <NImageGroup show-toolbar-tooltip>
        <NImage class="image" :height="140" :width="140" v-for="image in data.images" :src="image.thumbnail || image.original" />
      </NImageGroup>
    </div>
  </NConfigProvider>
</template>
<script>
import { defineComponent, computed } from 'vue';
import createLightbox from './create-lightbox.js';
import { NImage, NImageGroup, NConfigProvider } from 'naive-ui';
import { zhCN } from 'naive-ui';
export default defineComponent({
  name: 'block-gallery',
  components: { NImage, NImageGroup, NConfigProvider },
  props: ['data'],
  data() {
    return {
      zhCN,
    };
  },
  methods: {
    handleClick(src) {
      createLightbox(src);
    },
  },
});
</script>
<style scoped>
.pandastudio-gallery {
  margin: 1em 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.pandastudio-gallery.align-left {
  justify-content: flex-start;
}
.pandastudio-gallery.align-center {
  justify-content: center;
}
.pandastudio-gallery.align-right {
  justify-content: flex-end;
}
.image {
  width: 140px;
  height: 140px;
  background-color: var(--divider-color);
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.25s;
}
.image:hover {
  background-color: var(--primary-opacity-1);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 1px var(--primary-color), 0 0 0 3px var(--primary-opacity-2);
  color: var(--primary-color);
}
</style>
