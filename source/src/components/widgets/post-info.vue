<template>
  <div class="widget post-info">
    <widgetTitle>标签与分类</widgetTitle>
    <div class="tags">
      <router-link v-for="item in post.taxonomies.tag" :to="`/tag/${item.slug}`"> <i class="fa-solid fa-tags"></i> {{ item.name }} </router-link>
      <router-link v-for="item in post.taxonomies.category" :to="`/category/${item.slug}`"> <i class="fa-solid fa-graduation-cap"></i> {{ item.name }} </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import widgetTitle from './widget-title.vue';
export default defineComponent({
  name: 'post-info',
  components: {
    widgetTitle,
  },
  props: {
    post: Object,
  },
});
</script>
<style lang="less">
.post-info .tags {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 0.45em;
  margin-top: 0.8em;
  a {
    z-index: 0;
    text-decoration: none;
    border-radius: 0.375rem;
    font-size: 87.5%;
    color: #73869a;
    background-color: #fff;
    text-shadow: 0 1px var(--white-default);
    padding: 0.25em 0.9em 0.25em 0.6em;
    border-radius: 0.5em;
    box-shadow: -0.1768rem -0.1768rem 0.25rem hsla(0, 0%, 100%, 0.35), 0.1326rem 0.1326rem 0.3rem rgba(54, 100, 152, 0.15), inset 0 0 0 transparent,
      inset max(1px, 0.125rem) max(1px, 0.125rem) max(1px, 0.25rem) hsla(0, 0%, 100%, 0.6);
    transition: 0.25s;
    display: flex;
    align-items: center;
    grid-gap: 0.35em;
    &:hover {
      color: #007dff;
      text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
      box-shadow: 0px 10px 15px -10px rgb(0 0 0 / 45%);
    }
  }
}

.is-dark {
  .post-info .tags {
    a {
      background: rgba(99, 226, 183, 0.16);
      color: rgba(255, 255, 255, 0.52);
      box-shadow: none;
      text-shadow: none;
      &:hover{
        background: var(--primary-color);
        color: #fff;
      }
    }
  }
}
</style>
