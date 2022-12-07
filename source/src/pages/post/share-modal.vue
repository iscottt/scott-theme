<template>
  <div class="share-modal">
    <NTooltip v-if="liked">
      <template #trigger>
        <button class="likes" @click="handleDuplicateLikeClick"><i class="fa-solid fa-heart"></i> {{ post.metas.likes || 0 }}</button>
      </template>
      已点赞
    </NTooltip>
    <NTooltip v-else>
      <template #trigger>
        <button class="likes -o" @click.once="handleLikeClick"><i class="fa-regular fa-heart"></i> {{ post.metas.likes || 0 }}</button>
      </template>
      点赞
    </NTooltip>
    <NTooltip>
      <template #trigger>
        <button class="money" @click="showPay = true"><i class="fa-solid fa-sack-dollar"></i></button>
      </template>
      打赏
    </NTooltip>
    <NTooltip>
      <template #trigger>
        <button class="share"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>
      </template>
      分享
    </NTooltip>
  </div>

  <div class="scott-mask fixed" :class="{ fadeOut: showAni }" v-if="showPay" @click="closeModal"></div>
  <div class="scott-share fixed flex" :class="{ fadeOut: showAni }" v-show="showPay">
    <div class="share-main grid">
      <div class="content">
        <div class="title">请我喝杯咖啡~</div>
        <div class="code-main">
          <p>熬夜码字不易，请我喝杯咖啡吧~</p>
          <div class="tab">
            <div class="tab-header">
              <div class="tab-title" :class="{ active: curActive == 1 }" @click="tabChange(1)">
                <div class="title-text">支付宝</div>
              </div>
              <div class="tab-title" :class="{ active: curActive == 2 }" @click="tabChange(2)">
                <div class="title-text">微信</div>
              </div>
            </div>
            <div class="tab-panels">
              <div class="tab-panel" :class="{ active: curActive == 1 }">
                <img src="https://ethanwp.oss-cn-shenzhen.aliyuncs.com/blog/alipay.png" alt="" />
              </div>
              <div class="tab-panel" :class="{ active: curActive == 2 }">
                <img src="https://ethanwp.oss-cn-shenzhen.aliyuncs.com/blog/wechat.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="action">
          <button @click="closeModal">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { NTooltip } from 'naive-ui';
export default defineComponent({
  name: 'share-modal',
  inject: ['post'],
  components: {
    NTooltip,
  },
  data() {
    return {
      liked: false,
      curActive: 1,
      showPay: false,
      showAni: false,
    };
  },
  watch: {
    post() {
      this.parseLiked();
    },
  },
  methods: {
    closeModal() {
      this.showAni = true;
      setTimeout(() => {
        this.showPay = false;
        this.showAni = false;
      }, 350);
    },
    // tab切换
    tabChange(index) {
      console.log('index', index);
      this.curActive = index;
    },
    parseLiked() {
      var liked = this.getLikedPosts();
      if (liked.includes(this.post.id)) {
        this.liked = true;
      }
    },
    handleDuplicateLikeClick() {
      $message.warning('您已经点过赞了');
    },
    handleLikeClick() {
      if (!this.post.id) {
        return;
      }
      if (this.liked) {
        this.handleDuplicateLikeClick();
        return;
      }
      var message = $message.info('正在处理点赞...');
      this.$axios({
        method: 'post',
        url: this.$API + '/nirvana/post-like',
        responseType: 'json',
        data: {
          id: this.post.id,
        },
      })
        .then(({ data }) => {
          this.$emit('likes-change', data);
          $message.success('点赞成功！');
          this.liked = true;
          this.setLikedPosts();
        })
        .catch((error) => {
          $message.warning('点赞失败，请重试！');
        })
        .finally(() => {
          message.destroy();
        });
    },
    getLikedPosts() {
      var liked = this.$localStorage('liked');
      return Array.isArray(liked) ? liked : [];
    },
    setLikedPosts() {
      var liked = this.getLikedPosts();
      var current_post_id = this.post.id;
      if (!liked.includes(current_post_id)) {
        liked.push(current_post_id);
        this.$localStorage('liked', liked);
      }
    },
  },
});
</script>
<style lang="less">
.share-modal {
  height: 5em;
  margin: 1em -3em -2em -3em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3em;
  background: #e9eff9;
  @media (max-width: 577px) {
    padding: 0 1em;
    margin: 2em -1em -1em;
    border-radius: 0;
    box-shadow: 0 1px var(--white-opacity-8) inset, 0 -1px var(--gray-opacity-1) inset;
  }
  button {
    width: 4em;
    height: 3em;
    padding: 0;
    border-radius: 50%;
    border: none;
    margin-right: 0.75em;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: transparent;
    text-shadow: 0 1px 1px #fff;
    box-shadow: -0.1768rem -0.1768rem 0.25rem hsla(0, 0%, 100%, 0.35), 0.1326rem 0.1326rem 0.3rem rgba(54, 100, 152, 0.15), inset 0 0 0 transparent,
      inset max(1px, 0.125rem) max(1px, 0.125rem) max(1px, 0.25rem) hsla(0, 0%, 100%, 0.6);
    border-radius: 0.625rem;
    cursor: pointer;
    transition: 0.25s;
    border-color: rgba(54, 100, 152, 0.15);
    i {
      font-size: 18px;
    }
    &.likes {
      color: #f56c6c;
      text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(245 108 108 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
      &.-o {
        color: #73869a;
      }
    }

    &.share {
      width: 3em;
      height: 3em;
      color: #61be33;
      text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(97 190 51 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
    }
    &.money {
      width: 3em;
      height: 3em;
      color: #e6a23c;
      text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(230 162 60 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
    }
    &:hover {
      box-shadow: min(-1px, -0.0625rem) min(-1px, -0.0625rem) hsla(0, 0%, 100%, 0.6), max(1px, 0.0625rem) max(1px, 0.0625rem) rgba(54, 100, 152, 0.2),
        inset 0.1875rem 0.1875rem 0.1875rem rgba(54, 100, 152, 0.2), inset -0.125rem -0.125rem 0.1875rem hsla(0, 0%, 100%, 0.6);
    }
  }
}
.scott-share {
  padding-bottom: 20vh;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  z-index: 9000;
  animation: fadeIn 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  &.fadeOut {
    animation: fadeOut 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .share-main {
    padding-top: 2rem;
    padding-bottom: 2rem;
    .content {
      width: 18rem;
      margin: auto;
      transition-duration: 0.35s;
      background: linear-gradient(135deg, #f0f6fc, #dae5f2);
      box-shadow: inset 1px 1px #fff, 1px 1px rgb(54 100 152 / 20%), 0.75rem 0.75rem 1.75rem rgb(54 100 152 / 50%), 0 0 2rem rgb(54 100 152 / 20%);
      padding: 1.25rem;
      border-radius: 0.9375rem;
      text-align: center;
      .title {
        text-shadow: 0.12rem 0.12rem 0.2rem #bec9d5, -1px -1px 1px hsl(0deg 0% 100% / 80%);
        justify-content: space-between;
        display: flex;
        font-size: 1.125rem;
        line-height: 1.75rem;
        font-weight: 700;
      }
      .code-main {
        p {
          color: #73869a;
          font-size: 0.875rem;
          line-height: 1.25rem;
          text-align: left;
        }
        .tab-header {
          font-size: 0;
          display: flex;
          padding-bottom: 1px;
          position: relative;
          overflow: auto;
          &:after {
            display: inline-block;
            border-bottom: 1px solid rgba(54, 100, 152, 0.2);
            box-shadow: 0 1px hsl(0deg 0% 100% / 50%);
            content: '';
            flex-grow: 1;
          }
          .tab-title {
            color: #73869a;
            font-size: 1rem;
            cursor: pointer;
            padding: 0.5rem 0.75rem;
            transition: color 0.25s, text-shadow 0.25s;
            text-shadow: 0 1px 1px #fff;
            display: inline-block;
            border-bottom: 1px solid rgba(54, 100, 152, 0.2);
            box-shadow: 0 1px hsl(0deg 0% 100% / 50%);
            &.active {
              border-radius: 0.375rem 0.375rem 0 0;
              border: 1px solid rgba(54, 100, 152, 0.2);
              border-bottom: none;
              box-shadow: inset 1px 1px hsl(0deg 0% 100% / 80%), 1px 0 hsl(0deg 0% 100% / 50%);
              color: #007dff;
              text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
            }
          }
        }
        .tab-panels {
          .tab-panel {
            display: none;
            min-height: 248px;
            &.active {
              display: block;
            }
            img {
              max-width: 100%;
              margin-top: 1rem;
            }
          }
        }
      }
      .action {
        width: 100%;
        gap: 0.625rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        display: grid;
        button {
          width: 100%;
          grid-column-start: 1;
          grid-column-end: 3;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          transition-duration: 0.25s;
          color: #007dff;
          text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
          background: transparent;
          box-shadow: 0 0 0 transparent, max(1px, 0.0625rem) max(1px, 0.0625rem) max(1px, 0.0625rem) hsla(0, 0%, 100%, 0.7),
            inset max(1px, 0.0625rem) max(1px, 0.0625rem) max(1px, 0.0625rem) hsla(0, 0%, 100%, 0.9);
          border: 1px solid;
          border-color: rgba(54, 100, 152, 0.15);
          border-radius: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          cursor: pointer;
          &:hover {
            border-color: transparent;
            box-shadow: min(-1px, -0.0625rem) min(-1px, -0.0625rem) hsla(0, 0%, 100%, 0.6), max(1px, 0.0625rem) max(1px, 0.0625rem) rgba(54, 100, 152, 0.2),
              inset 0.1875rem 0.1875rem 0.1875rem rgba(54, 100, 152, 0.2), inset -0.125rem -0.125rem 0.1875rem hsla(0, 0%, 100%, 0.6);
          }
        }
      }
    }
  }
}
.scott-mask {
  background: radial-gradient(rgba(54, 100, 152, 0.4), rgba(19, 40, 77, 0.8));
  -webkit-backdrop-filter: blur(0.1rem);
  backdrop-filter: blur(0.1rem);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 8000;
  animation: fadeIn linear 0.35s;
  &.fadeOut {
    animation: fadeOut 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
