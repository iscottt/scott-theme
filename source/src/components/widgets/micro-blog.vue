<template>
  <div class="micro-wrapper" v-if="posts.length > 0">
    <WidgetTitle>随笔</WidgetTitle>
    <ul class="micro-list">
      <li class="micro-item" v-for="post in posts" :key="post.id">
        <div class="flex">
          <img class="avatar" src="https://ethanwp.oss-cn-shenzhen.aliyuncs.com/blog/peeps-avatar%20%281%29.png" />
          <div class="content-wrapper">
            <div class="content">
              <div class="title-wrapper flex items-center justify-between">
                <p class="title">
                  #<a href="javascript:;">{{ post.title }}</a>
                </p>
                <p class="date">{{ formatTime(post.created_time) }}</p>
              </div>
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
      const timeStr = moment(time).fromNow();
      return timeStr.replace(/\s*/g, '');
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
    margin-top: 20px;
    .micro-item {
      margin-bottom: 1rem;
      list-style: none;
      .avatar {
        width: 2rem;
        height: 2rem;
        border: 1px solid #fff;
        border-radius: 6px;
      }
      .content-wrapper {
        margin-left: 0.75rem;
        flex-grow: 1;
        .content {
          background: var(--white-default);
          padding-top: 1px;
          padding-bottom: 1px;
          padding-left: 0.625rem;
          padding-right: 0.625rem;
          color: var(--text-color-3);
          transition-duration: 0.25s;
          text-shadow: 0 1px 1px #fff;
          border-radius: 0.625rem;
          border-top-left-radius: 0;
          position: relative;
          font-size: 0.875rem;
          line-height: 1.25rem;
          z-index: 2;
          .title,
          .date {
            margin: 5px 0 0 0;
            a {
              margin-left: 2px;
            }
          }
          .date {
            font-size: 12px;
          }
          .nv-blocks {
            p {
              margin-top: 5px;
              font-weight: 500;
            }
            img {
              border-radius: 8px !important;
              cursor: pointer;
            }
          }
          a {
            text-decoration: none;
            color: var(--primary-color);
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
          box-shadow: 0px 25px 20px -20px rgb(0 0 0 / 45%);
        }
      }
    }
  }
}

.is-dark {
  .micro-wrapper {
    .micro-list {
      .micro-item {
        .content-wrapper {
          .content {
            color: #fff;
            text-shadow: none;
            &::before {
              border-right: 0.3125rem solid #1e1e1e;
            }
          }
        }
      }
    }
  }
}
</style>
