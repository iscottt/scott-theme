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
        <button class="share" @click="showShare = true"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>
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

  <div class="scott-share-mask fixed" :class="{ fadeOut: showAni }" v-if="showShare"></div>
  <div class="scott-poster fixed flex justify-start" :class="{ fadeOut: showAni }" v-if="showShare">
    <div class="poster-main">
      <div class="share-top">
        <img @click="test" src="https://www.homaton.com/wp-content/uploads/2022/11/category_mesh@2x.png" alt="" />
        <div class="date">
          <div class="day">18</div>
          <div class="year-month">2022-11</div>
        </div>
      </div>
      <div class="share-title">
        <div class="info">
          <div class="title">Neumorphism新拟物WP主题</div>
          <div class="desc">
            这是一款从2021年中旬开始开发的一款WordPress新拟物主题（当前博客正在使用）。新拟物是2020年开始流行的，它尝试在纯色界面中使用阴影和高光来凸显元素的凸起和凹陷感。虽然有很多人已经做出了完美的新拟物设计，然而市面上却很难有这样的产品出现，很多开发人员没办法将它落地实现。
          </div>
        </div>
        <div class="code">
          <img src="https://www.homaton.com/wp-content/uploads/2022/11/category_mesh@2x.png" alt="" />
        </div>
      </div>
      <div class="share-action grid items-center justify-center">
        <NTooltip placement="top-start">
          <template #trigger>
            <div class="share-button items-center justify-center flex" @click="shareWb">
              <i class="fa-brands fa-weibo"></i>
            </div>
          </template>
          分享到微博
        </NTooltip>
        <NTooltip placement="top-start">
          <template #trigger>
            <div class="share-button items-center justify-center flex" @click="shareQq">
              <i class="fa-brands fa-qq"></i>
            </div>
          </template>
          分享到QQ
        </NTooltip>
        <NTooltip placement="top-start">
          <template #trigger>
            <div class="share-button items-center justify-center flex" @click="shareQzone">
              <i class="fa-solid fa-star"></i>
            </div>
          </template>
          分享到QQ空间
        </NTooltip>
        <NTooltip placement="top-start">
          <template #trigger>
            <div class="share-button items-center justify-center flex" @click="save">
              <i class="fa-solid fa-image"></i>
            </div>
          </template>
          保存海报
        </NTooltip>
        <p v-if="isCreating">正在生成海报...</p>
      </div>
      <div @click="closeModal" class="close flex items-center absolute justify-center">
        <i class="fa-solid fa-close"></i>
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
      showShare: false,
      isCreating: false,
    };
  },
  watch: {
    post() {
      this.parseLiked();
    },
  },
  methods: {
    shareWb() {
      window.open(
        'https://service.weibo.com/share/share.php?title=用域名访问Nas · 阿里云DDNS解决方案&url=https://www.homaton.com/project/nas-ddns-synology.html&searchPic=true&display=0&retcode=6102#_loginLayer_1670423435716'
      );
    },
    shareQq() {
      window.open(
        'https://connect.qq.com/widget/shareqq/index.html?url=https://www.homaton.com/project/nas-ddns-synology.html&sharesource=qzone&title=用域名访问Nas · 阿里云DDNS解决方案&pics=https://www.homaton.com/wp-content/uploads/2022/09/category_nas_ddns.png&summary=背景前不久在一个QQ群里面和一个开发大佬（Panda-Stud...'
      );
    },
    shareQzone() {
      window.open(
        'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https://www.homaton.com/project/nas-ddns-synology.html&sharesource=qzone&title=用域名访问Nas · 阿里云DDNS解决方案&pics=https://www.homaton.com/wp-content/uploads/2022/09/category_nas_ddns.png&summary=背景前不久在一个QQ群里面和一个开发大佬（Panda-Stud...'
      );
    },
    save() {},
    closeModal() {
      this.showAni = true;
      setTimeout(() => {
        this.showPay = false;
        this.showShare = false;
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
  z-index: 1001;
  animation: fadeInZoom 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  &.fadeOut {
    animation: fadeOutZoom 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
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
.scott-poster {
  padding-bottom: 20vh;
  top: 24px;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  z-index: 1001;
  animation: fadeInZoom 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  &.fadeOut {
    animation: fadeOutZoom 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .poster-main {
    width: 25rem;
    margin: auto;
    border-radius: 0.625rem;
    overflow: hidden;
    transition-duration: 0.35s;
    background: #fff;
    box-shadow: 0 1rem 2rem rgb(0 0 0 / 20%), 0 1rem 1rem rgb(54 100 152 / 50%);
    .share-top {
      position: relative;
      img {
        max-width: 100%;
      }
      .date {
        position: absolute;
        left: 1.25rem;
        bottom: 1.25rem;
        font-size: 1.125rem;
        line-height: 1.75rem;
        color: #fff;
        text-shadow: 0 0.3rem 0.5rem rgb(0 0 0 / 50%);
        opacity: 0.8;
        font-family: Play;
        .day {
          font-size: 3rem;
          line-height: 1;
        }
        .year-month {
          border-top: 1px solid hsla(0, 0%, 100%, 0.5);
        }
      }
    }
    .share-title {
      padding: 1.25rem;
      grid-template-columns: 1fr 110px;
      display: grid;
      .title {
        color: #517db2;
        padding-bottom: 1.25rem;
        font-weight: 700;
      }
      .desc {
        color: #73869a;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .code {
        justify-content: end;
        align-content: center;
        display: grid;
        img {
          max-width: 100%;
        }
      }
    }
    .share-action {
      border-top: 1px dashed rgba(54, 100, 152, 0.25);
      height: 4.25rem;
      background-color: #e8f0fa;
      gap: 1rem;
      grid-auto-flow: column;
      p {
        color: var(--primary-color);
        text-shadow: 0 2px 2px var(--primary-opacity-3), 0 -1px var(--white-default);
      }
      .share-button {
        height: 2.25rem;
        width: 2.25rem;
        border-radius: 9999px;
        cursor: pointer;
        font-size: 1rem;
        line-height: 1.5rem;
        text-shadow: 0 1px 1px #fff;
        box-shadow: inset 0.3536rem 0.3536rem 0.625rem hsl(0deg 0% 100% / 80%), inset -0.1326rem -0.1326rem 0.25rem hsl(0deg 0% 100% / 30%), inset -0.3536rem -0.3536rem 0.625rem rgb(54 100 152 / 10%),
          0.4419rem 0.4419rem 1rem rgb(54 100 152 / 30%);
        background-color: #dae5f2;
        &:nth-of-type(1) {
          color: #f56c6c;
        }
        &:nth-of-type(2) {
          color: #409eff;
        }
        &:nth-of-type(3) {
          color: #e6a23c;
        }
        &:nth-of-type(4) {
          color: #61be33;
        }
      }
    }
  }
  .close {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    left: 50%;
    margin-left: -1.25rem;
    width: 2.5rem;
    border-radius: 9999px;
    background: #fff;
    cursor: pointer;
    height: 2.5rem;
    font-size: 18px;
    line-height: 1;
    color: var(--member-light-color, var(--theme-light-color));
    opacity: 0.8;
  }
}
.scott-mask,
.scott-share-mask {
  background: radial-gradient(rgba(54, 100, 152, 0.4), rgba(19, 40, 77, 0.8));
  -webkit-backdrop-filter: blur(0.1rem);
  backdrop-filter: blur(0.1rem);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
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
@keyframes fadeInZoom {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
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
@keyframes fadeOutZoom {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
