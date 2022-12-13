<template>
  <!-- 样式二 -->
  <div v-if="$store.state.card_type == 'card' && $store.state.theme_settings.scott_card_theme == 2" class="post-item card flex flex-col items-center">
    <div class="relative" style="width: 100%">
      <div class="inner">
        <div class="absolute info">
          <div class="likes">{{ post.likes }}<i class="fa-regular fa-heart"></i></div>
          <div class="comments">{{ post.comments }}<i class="fa-regular fa-comments"></i></div>
          <div class="views">{{ post.views }}<i class="fa-solid fa-eye"></i></div>
          <div class="detail">
            <router-link :to="`/${post.slug}`">阅读全文<i class="fa-solid fa-arrow-right"></i></router-link>
          </div>
        </div>
      </div>
      <router-link :to="`/${post.slug}`" class="cover" :style="{ backgroundImage: `url(${post.thumbnail})` }"> </router-link>
    </div>
    <div class="title">{{ post.title }}</div>
    <div class="tags">
      <router-link v-for="(tag, idx) in post.tags" :to="`/tag/${tag}`">{{ idx < post.tags.length - 1 ? `${tag} · ` : tag }}</router-link>
      <span v-if="!post.tags.length" class="color-0">无标签</span>
    </div>
  </div>
  <!-- 样式一 -->
  <div v-if="$store.state.card_type == 'card' && $store.state.theme_settings.scott_card_theme == 1" class="scott-post-item flex flex-col items-center">
    <div class="cover-wrapper">
      <router-link :to="`/${post.slug}`" class="cover" :style="{ backgroundImage: `url(${post.thumbnail})` }"> </router-link>
    </div>
    <div class="tags">
      <router-link v-for="(tag, idx) in post.tags" :to="`/tag/${tag}`" v-show="idx < 3">{{ tag }}</router-link>
      <span v-if="!post.tags.length" class="color-0">无标签</span>
    </div>
    <div class="title">{{ post.title }}</div>
    <div class="info-wrapper">
      <div class="metas">
        <div class="likes"><i class="fa-regular fa-heart"></i>{{ post.likes }}</div>
        <div class="comments"><i class="fa-regular fa-comment-dots"></i>{{ post.comments }}</div>
        <div class="views"><i class="fa-solid fa-eye"></i>{{ post.views }}</div>
      </div>
      <div class="time"><i class="fa-regular fa-clock"></i> {{ moment(post.modified_time).format('L') }}</div>
    </div>
  </div>
  <div v-if="$store.state.card_type == 'list'" class="post-item list flex g-10">
    <router-link :to="`/${post.slug}`" class="cover" :style="{ backgroundImage: `url(${post.thumbnail})` }"> </router-link>
    <div class="infos flex flex-col justify-center">
      <div class="title">
        <router-link :to="`/${post.slug}`">{{ post.title }}</router-link>
      </div>
      <div class="tags">
        <router-link v-for="(tag, idx) in post.tags" :to="`/tag/${tag}`">{{ idx < post.tags.length - 1 ? `${tag} · ` : tag }}</router-link>
        <span v-if="!post.tags.length" class="color-0">无标签</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { pdColor } from '/@/assets/pandaChromatology';
import moment from 'moment';
import md5 from 'blueimp-md5';
export default defineComponent({
  props: {
    post: {
      type: Object,
      /*default(){return {
				"id": 0,
				"title": "",
				"slug": "",
				"modified_time": 0,
				"views": 0,
				"likes": 0,
				"comments": 0,
				"thumbnail": "",
				"categories": ""
			}}*/
    },
  },
  data() {
    return {
      moment,
      darkerColor: 'transparent',
      lighterColor: 'transparent',
      shadowColor: 'transparent',
    };
  },
  mounted() {
    this.$get_img_color(this.post.thumbnail)
      .then((data) => {
        var darkerColor = new pdColor(data).mappingL([20, 70]);
        this.darkerColor = darkerColor.getString();
        this.shadowColor = darkerColor.setA(0.5).getString('rgba');
        this.lighterColor = new pdColor(data).mappingL([45, 90]).getString();
        // background: linear-gradient(90deg,v-bind(darkerColor),v-bind(lighterColor));
      })
      .catch(() => {});
  },
  methods: {
    random(str) {
      var char = md5(str)[0];
      if (['1', '5', '9', 'c'].includes(char)) {
        return 1;
      }
      if (['2', '6', '0', 'd'].includes(char)) {
        return 2;
      }
      if (['3', '7', 'a', 'e'].includes(char)) {
        return 3;
      }
      if (['4', '8', 'b', 'f'].includes(char)) {
        return 4;
      }
    },
  },
});
</script>

<style lang="less">
// 样式二
.post-item {
  .tags {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    margin-top: 0.375rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: left;
    span,
    a {
      color: #8c9cae;
      transition: 0.35s;
      text-decoration: none;
      &:hover {
        color: #007dff;
      }
    }
  }
  &.card {
    .inner {
      box-shadow: -0.44rem -0.44rem 0.625rem hsl(0deg 0% 100% / 80%), 0.44rem 0.44rem 0.625rem rgb(54 100 152 / 10%), inset 0 0 0 transparent, inset 0 0 0 transparent;
      border-radius: 0.9375rem;
      padding-bottom: 89.45313%;
      .info {
        opacity: 0;
        transform: translateX(-2rem);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition-duration: 0.5s;
        text-shadow: 0 1px 1px #fff;
        place-items: end;
        align-content: center;
        display: grid;
        .likes,
        .comments,
        .views,
        .detail {
          font-size: 0.8125rem;
          line-height: 1rem;
          margin-right: -1rem;
          i {
            height: 2rem;
            transform: scale(0);
            font-style: normal;
            transition: 0.35s;
            width: 2rem;
            margin-left: 0.375rem;
            box-shadow: inset 0.3536rem 0.3536rem 0.625rem hsl(0deg 0% 100% / 80%), inset -0.1326rem -0.1326rem 0.25rem hsl(0deg 0% 100% / 30%),
              inset -0.3536rem -0.3536rem 0.625rem rgb(54 100 152 / 10%), 0.4419rem 0.4419rem 1rem rgb(54 100 152 / 30%);
            background-color: #dae5f2;
            border-radius: 9999px;
            justify-content: center;
            -webkit-font-smoothing: antialiased;
            align-items: center;
            display: inline-grid;
            cursor: pointer;
          }
        }
        .likes {
          color: var(--error-color);
        }
        .comments {
          color: var(--primary-color);
          margin-top: 0.5rem;
        }
        .views {
          color: var(--success-color);
          margin-top: 0.5rem;
        }
        .detail {
          margin-top: 0.5rem;
          margin-right: -1.25rem;
          i {
            height: 2.5rem;
            width: 2.5rem;
            font-size: 1.125rem;
            margin-left: 0.375rem;
            color: #007dff;
          }
          a {
            text-decoration: none;
            color: #007dff;
            font-size: 0.9rem;
            font-weight: 500;
            &:hover i {
              transform: scale(1.2) !important;
              transition: 0.25s;
            }
          }
        }
      }
    }
    .cover {
      border: 0.125rem solid #e8f0fa;
      transform-origin: left;
      transform: perspective(59rem) rotateY(0);
      transition: 0.35s;
      flex-shrink: 0;
      flex-grow: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 0.9375rem;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: cover;
      display: block;
      position: absolute;
    }

    .title {
      padding: 0 0.5em;
      margin-top: 0.625rem;
      text-align: left;
      max-width: 100%;
      width: 100%;
      text-shadow: 0.12rem 0.12rem 0.2rem #bec9d5, -1px -1px 1px hsl(0deg 0% 100% / 80%);
      transition: 0.25s;
      color: #5a6f87;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-weight: 500;
      @media (max-width: 768px) {
        font-size: 14px;
      }
      @media (min-width: 768px) {
        font-size: 17px;
      }
    }
    .tags {
      width: 100%;
      transform-origin: right;
      padding: 0 0.5em;
    }
  }
  &.list {
    grid-template-columns: auto calc(100% - 5.5rem);
    align-items: center;
    gap: 1rem;
    display: grid;
    .cover {
      width: 4.75rem;
      height: 4.25rem;
      box-shadow: 0 0 0 0.125rem #e8f0fa, 0.442rem 0.442rem 0.625rem rgb(54 100 152 / 20%), -0.442rem -0.442rem 0.625rem hsl(0deg 0% 100% / 70%);
      transition-duration: 0.25s;
      border-radius: 0.5rem;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: cover;
    }

    &:hover {
      .cover {
        transform: scale(1.1);
      }
    }

    .title {
      margin: 0;
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 500;
      text-align: left;
      a {
        max-width: 100%;
        text-shadow: 0.12rem 0.12rem 0.2rem #bec9d5, -1px -1px 1px hsl(0deg 0% 100% / 80%);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        flex-shrink: 0;
        flex-grow: 0;
        transition-duration: 0.35s;
        transition: 0.25s;
        color: #5a6f87;
        text-decoration: none;
        &:hover {
          color: #007dff;
          text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
        }
      }
      @media (max-width: 768px) {
        font-size: 14px;
      }
      @media (min-width: 768px) {
        font-size: 17px;
      }
    }
    .tags {
      margin-top: 0.375rem;
      color: #8c9cae;
      font-size: 0.875rem;
      line-height: 1.25rem;
      padding-left: 0;
    }
  }
}
// 样式一
.scott-post-item {
  background: #fff;
  border-radius: 0.75rem;
  padding: 8px;
  transition: 0.35s;
  &:hover {
    transform: translateY(-10px);
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  }
  .cover-wrapper {
    position: relative;
    width: 100%;
    height: 200px;
    .cover {
      max-width: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 0.75rem;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: cover;
      display: block;
      transition: 0.35s;
    }
    .like {
      position: absolute;
      right: 0.5em;
      border: 2px solid #fff;
      bottom: -1em;
      width: 2em;
      height: 2em;
      border-radius: 9999px;
      background: linear-gradient(90deg, v-bind(darkerColor), v-bind(lighterColor));
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
      transition: 0.35s;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
          rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
      }
    }
  }
  .tags {
    width: 100%;
    color: #8c9cae;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0 0.5em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 1rem;
    a {
      text-decoration: none;
      font-size: 12px;
      display: inline;
      margin-right: 0.5em;
      margin-bottom: 0.5em;
      padding: 0.2em 0.5em;
      border-radius: 9em;
      color: #837adc;
      background: rgba(131, 122, 220, 0.15);
      transition: 0.35s;
      &:hover {
        color: var(--primary-color);
        text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
      }
    }
    .color-4 {
      color: #837adc;
      background: rgba(131, 122, 220, 0.15);
    }
  }
  .title {
    padding: 0 0.5em;
    margin-top: 0.2rem;
    text-align: left;
    max-width: 100%;
    width: 100%;
    text-shadow: 0.12rem 0.12rem 0.2rem #bec9d5, -1px -1px 1px hsl(0deg 0% 100% / 80%);
    transition: 0.25s;
    color: #5a6f87;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 500;
    @media (max-width: 768px) {
      font-size: 14px;
    }
    @media (min-width: 768px) {
      font-size: 17px;
    }
  }
  .info-wrapper {
    width: 100%;
    transition-duration: 0.5s;
    text-shadow: 0 1px 1px #fff;
    align-items: center;
    justify-content: space-between;
    display: flex;
    padding: 0 0.5em;
    margin-top: 0.2rem;
    .metas {
      display: flex;
      column-gap: 0.5em;
      justify-content: flex-start;
      font-size: 14px;
      .likes,
      .comments,
      .views {
        display: flex;
        column-gap: 0.25em;
        justify-content: center;
        align-items: center;
      }
      .likes {
        color: var(--error-color);
      }
      .comments {
        color: var(--primary-color);
      }
      .views {
        color: var(--success-color);
      }
    }
    .time {
      font-size: 0.8125rem;
      line-height: 1rem;
      color: #8c9cae;
    }
  }
}

@media (min-width: 768px) and (max-width: 991px), (min-width: 992px) and (max-width: 1199px), (min-width: 1200px) and (max-width: 1509px), (min-width: 1510px) {
  .post-item.card {
    &:hover {
      i {
        transform: scale(1) !important;
      }
      .inner {
        box-shadow: -0.44rem -0.44rem 0.625rem hsl(0deg 0% 100% / 80%), 0.44rem 0.44rem 0.625rem rgb(54 100 152 / 10%), inset 0 0 0 transparent, inset 0 0 0 transparent;
        border-radius: 0.9375rem;
        .info {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .cover {
        transform: perspective(59rem) rotateY(-59deg);
        box-shadow: 2.5rem 2rem 3rem rgb(54 100 152 / 30%);
        transition: 0.5s cubic-bezier(0.5, 1.5, 0.6, 1);
      }
    }
  }
}
</style>
