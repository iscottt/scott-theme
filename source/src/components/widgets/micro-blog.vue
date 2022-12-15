<template>
  <div class="micro-wrapper">
    <WidgetTitle>随笔</WidgetTitle>
    <ul class="micro-list">
      <li class="micro-item" v-for="post in posts" :key="post.id">
        <div class="flex">
          <img class="avatar" src="https://ethanwp.oss-cn-shenzhen.aliyuncs.com/blog/peeps-avatar%20%281%29.png" />
          <div class="content-wrapper">
            <div class="date">{{ formatTime(post.modify_time) }}</div>
            <div class="content">
              <p class="title">
                #<a href="javascript:;">{{ post.title }}</a>
              </p>
              <blockParser is="article" :blocks="post.content.blocks" ref="article" />
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import WidgetTitle from './widget-title.vue';
import blockParser from '/@/components/block-parser/parser.vue';
import moment from 'moment';
export default defineComponent({
  name: 'micro-blog',
  components: { WidgetTitle, blockParser },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    formatTime(time) {
      return moment(time).format('YYYY-MM-DD A HH:mm');
    },
    requestData() {
      $fullLoading.start();
      this.$axios({
        method: 'post',
        url: this.$API + '/nirvana/micro-post',
        responseType: 'json',
        // data: {},
      })
        .then(({ data }) => {
          console.log('data', data);
          this.posts = data;
        })
        .catch((error) => {})
        .finally(() => {
          $fullLoading.end();
        });
    },
  },
});
</script>

<style lang="less">
.micro-wrapper {
  padding: 1px 0;
  margin: 1.25rem 0;
  .micro-list {
    margin: 0;
    padding: 0;
    .micro-item {
      margin-bottom: 1rem;
      list-style: none;
      .avatar {
        width: 2rem;
        height: 2rem;
        box-shadow: -0.1326rem -0.1326rem 0.1875rem hsl(0deg 0% 100% / 80%), 0.1326rem 0.1326rem 0.25rem rgb(54 100 152 / 10%), inset 0 0 0 transparent, inset 0 0 0 transparent;
        border-radius: 9999px;
      }
      .content-wrapper {
        margin-left: 0.75rem;
        flex-grow: 1;
        .date {
          opacity: 0;
          height: 0.75rem;
          padding-left: 0.125rem;
          transition-duration: 0.25s;
          color: #007dff;
          font-weight: 500;
          text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
          font-size: 0.8125rem;
          line-height: 1rem;
        }
        .content {
          background: linear-gradient(#f9fafc, #e8f0fa 0.75rem, #e8f0fa calc(100% - 0.75rem), #dae5f2) no-repeat;
          border-color: #fff;
          box-shadow: 0 0.5rem 0.625rem rgb(54 100 152 / 20%);
          padding-top: 1px;
          padding-bottom: 1px;
          padding-left: 0.625rem;
          padding-right: 0.625rem;
          color: #73869a;
          transition-duration: 0.25s;
          text-shadow: 0 1px 1px #fff;
          border: 1px solid;
          border-radius: 0.625rem;
          border-top-left-radius: 0;
          position: relative;
          font-size: 0.875rem;
          line-height: 1.25rem;
          border-color: #fff;
          z-index: 2;
          .title {
            margin: 5px 0 0 0;
          }
          .nv-blocks {
            p {
              margin-top: 5px;
              font-weight: 500;
            }
            img {
              border-radius: 8px !important;
              box-shadow: 0 13px 15px rgb(31 45 62 / 20%);
              cursor: pointer;
            }
          }
          a {
            text-decoration: none;
          }
          &::before {
            content: '';
            border-bottom: 0.375rem solid transparent;
            border-right: 0.3125rem solid #fff;
            display: block;
            position: absolute;
            top: -1px;
            left: -5px;
          }
        }
      }
      &:hover {
        .date {
          opacity: 1;
        }
        .content {
          text-shadow: 0.12rem 0.12rem 0.2rem #bec9d5, -1px -1px 1px hsl(0deg 0% 100% / 80%);
          color: #415973;
          transform: translateY(0.5rem);
        }
      }
    }
  }
}
</style>
