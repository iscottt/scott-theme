<template>
  <div class="container flex items-center xxs:flex-col-reverse xs:flex-col-reverse xxs:justify-center xs:justify-center">
    <div class="metas">
      <div class="categories">{{ post.taxonomies.category.length ? post.taxonomies.category.map((cat) => cat.name).join(' · ') : '未分类' }}</div>
      <div class="title">{{ post.title }}</div>
      <div class="info">
        <span><svgIcon name="heart" height="13" />{{ post.metas.likes || 0 }}</span>
        <span><svgIcon name="comment-dots" height="13" />{{ post.comment_count || 0 }}</span>
        <span><svgIcon name="eye" height="13" />{{ post.metas.views || 0 }}</span>
        <span
          ><svgIcon name="clock" height="13" />{{
            moment(post.modified_time).format(`${$store.state.theme_settings.nv_date_format || 'l'} ${$store.state.theme_settings.nv_time_format || 'LT'}`)
          }}</span
        >
      </div>
    </div>
    <div class="coverflow">
      <span class="cover" :style="{ backgroundImage: `url(${post.metas._nv_thumbnail})` }"></span>
    </div>
    <div class="cover-blur">
      <div class="cover-blur-img-wrapper"><img :src="post.metas._nv_thumbnail" /></div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue';
import moment from 'moment';
import svgIcon from '/@/components/icons/svg-icon.vue';

export default defineComponent({
  name: 'nv-slider-article',
  components: {
    svgIcon,
  },
  watch: {},
  data() {
    return {
      moment,
    };
  },
  inject: ['post'],
  mounted() {},
  methods: {},
  beforeUnmount() {},
});
</script>

<style scoped lang="less">
.container {
  height: 400px;
  @media (max-width: 991.5px) {
    height: 300px;
  }
  @media (max-width: 767.5px) {
    height: 370px;
  }
}
.metas {
  flex-grow: 1;
  padding-left: 3em;
  padding-right: 110px;
  color: #fff;
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  .categories {
    opacity: 0.5;
    &:after {
      content: '';
      width: 2em;
      height: 1px;
      display: block;
      background: #fff;
      margin-top: 0.5em;
      margin-bottom: 1em;
    }
  }
  .title {
    font-size: 32px;
    font-weight: normal;
    margin: 0;
  }
  .info {
    margin-top: 3em;
    display: flex;
    column-gap: 1em;
    font-size: 14px;
    opacity: 0.5;
    > span {
      display: flex;
      column-gap: 0.3em;
      align-items: center;
    }
  }
  @media (max-width: 991.5px) {
    padding-right: 90px;
    .title {
      font-size: 24px;
    }
    .info {
      margin-top: 2em;
    }
  }
  @media (max-width: 767.5px) {
    padding-right: 0;
    padding-left: 0;
    flex-grow: 0;
    text-align: center;
    margin: 1em 0;
    .categories {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .title {
      font-size: 18px;
    }
    .info {
      margin-top: 0.8em;
    }
  }
}

.coverflow {
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    width: 330px;
  }
}
.cover {
  border-radius: 0.7em;
  width: 256px;
  height: 229px;
  display: block;
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2) inset, 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 8em rgba(0, 0, 0, 0) inset;
  z-index: 1;
  @media (max-width: 991.5px) {
    width: 200px;
    height: 178px;
  }
}
.cover-blur {
  position: absolute;
  z-index: -999;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s;
  .cover-blur-img-wrapper {
    width: 100%;
    height: 100%;
    border-radius: 1em;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(#000 20%, rgba(0, 0, 0, 0.6) 456px, rgba(0, 0, 0, 0.13) 456px, rgba(0, 0, 0, 0));
    mask-image: linear-gradient(#000 20%, rgba(0, 0, 0, 0.6) 456px, rgba(0, 0, 0, 0.13) 456px, rgba(0, 0, 0, 0));
    @media (max-width: 991.5px) {
      -webkit-mask-image: linear-gradient(#000 20%, rgba(0, 0, 0, 0.6) 346px, rgba(0, 0, 0, 0.13) 346px, rgba(0, 0, 0, 0));
      mask-image: linear-gradient(#000 20%, rgba(0, 0, 0, 0.6) 346px, rgba(0, 0, 0, 0.13) 346px, rgba(0, 0, 0, 0));
    }
    @media (max-width: 767.5px) {
      -webkit-mask-image: linear-gradient(#000 20%, rgba(0, 0, 0, 0.6) 416px, rgba(0, 0, 0, 0.13) 416px, rgba(0, 0, 0, 0));
      mask-image: linear-gradient(#000 20%, rgba(0, 0, 0, 0.6) 416px, rgba(0, 0, 0, 0.13) 416px, rgba(0, 0, 0, 0));
    }
  }
  img {
    margin-left: -1.5em;
    width: calc(100% + 3em);
    height: 100%;
    object-fit: cover;
    filter: saturate(1.5) blur(0.8em);
  }
}
</style>
