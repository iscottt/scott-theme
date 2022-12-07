<template>
  <div
    class="pandastudio-gallery"
    :class="{
      'align-left': align == 'left',
      'align-center': align == 'center',
      'align-right': align == 'right',
    }"
    v-if="show">
    <div class="image" :style="{ backgroundImage: `url(${image.thumbnail || image.original})` }" v-for="(image, index) in images">
      <div class="remove" @click="handleRemove(index)"><i class="el-icon-close"></i></div>
    </div>
    <!-- <div class="image add_image">
      <i class="el-icon-plus add_icon"></i>
    </div> -->
    <div class="upload-main">
      <div class="title" @click="handleSelectImages">
        <i class="fa-regular fa-image"></i>
        从媒体库选择或上传
      </div>
      <div class="input">
        <input v-model="inputSrc" :style="{ width: '50%' }" placeholder="图片URL链接..." />
        <button @click="inputImgSrc"><i class="fa-solid fa-check"></i></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pandastudio-gallery-block',
  data() {
    return {
      images: [],
      style: 1,
      align: '',
      show: true,
      inputSrc: '',
    };
  },
  mounted() {
    // 加载默认数据
    nv.block.loadDefaultData.bind(this)();
  },
  methods: {
    inputImgSrc() {
      if (this.inputSrc) {
        this.show = false;
        this.images.push({
          thumbnail: this.inputSrc,
          original: this.inputSrc,
        });
        this.inputSrc = '';
        this.$emit('forceUpdate');
        this.$nextTick(() => {
          this.show = true;
        });
      }
    },
    handleSelectImages() {
      nv.block.mediaSelector({
        multiple: true,
        callback: (images) => {
          this.show = false;
          var results = [];
          images.forEach((image) => {
            if (image.isImage) {
              results.push({
                thumbnail: image.urls.thumbnail,
                original: image.urls.original,
              });
            }
          });
          this.images = this.images.concat(results);
          // 需要调用一次保存，否则在inner-blocks里面异步的数据会丢失
          this.$emit('forceUpdate');

          this.$nextTick(() => {
            this.show = true;
          });
        },
      });
    },
    handleRemove(index) {
      this.images.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.upload-main {
  width: 200px;
  height: 140px;
  background-color: var(--divider-color);
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--text-color-3);
  position: relative;
  transition: 0.25s;
  cursor: pointer;
}
.upload-main .title {
  cursor: pointer;
  font-size: 14px;
  border: none;
  color: var(--text-color-3);
  text-shadow: 0 1px var(--white-default);
  background: transparent;
  transition: 0.25s;
  cursor: pointer;
}
.upload-main .title:hover {
  color: #3196ff;
}
.upload-main .input {
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: center;
}
.upload-main input {
  background: #fff;
  border: 1px solid rgb(224, 224, 230);
  outline: none;
  padding: 0 7px;
  height: 34px;
  color: rgb(51, 54, 57);
  border-radius: 5px 0 0 5px;
  transition: 0.25s;
  font-size: 14px;
}

.upload-main input:focus {
  position: relative;
  z-index: 1;
  border-color: #007dff;
  box-shadow: 0 0 0 2px rgba(0, 125, 255, 0.2);
}
.upload-main button:hover {
  box-shadow: 4px 4px 6px rgba(31, 45, 61, 0.4);
}
.upload-main button {
  font-family: inherit;
  transition: 0.25s;
  background: radial-gradient(at 18px top, #c0ccda, #8492a6);
  border: 0;
  color: #fff;
  padding: 0 18px;
  height: 34px;
  min-width: 60px;
  border-radius: 0 99px 99px 0;
  font-size: 14px;
  box-shadow: 4px 4px 6px rgba(31, 45, 61, 0.2);
}
.pandastudio-gallery {
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
i {
  font-style: normal !important;
}
i.add_icon {
  font-size: 32px;
}
.image {
  width: 140px;
  height: 140px;
  background-color: var(--divider-color);
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--text-color-3);
  position: relative;
  transition: 0.25s;
}
.image.add_image {
  box-shadow: 0 0 0 1px var(--border-color);
  cursor: pointer;
}
.image:hover {
  background-color: var(--primary-opacity-1);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 1px var(--primary-color), 0 0 0 3px var(--primary-opacity-2);
  color: var(--primary-color);
}
.remove {
  position: absolute;
  z-index: 1;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background: radial-gradient(at top left, #ffcb88, #ff4949);
  box-shadow: 4px 4px 4px #ff505066;
  border-radius: 50%;
  color: #fff;
  opacity: 0;
  transform: scale(0.75);
  cursor: pointer;
  transition: 0.25s;
}
.image:hover .remove {
  opacity: 1;
  transform: scale(1.2);
}
.image:hover .remove:hover {
  transform: scale(1.5);
}
</style>
