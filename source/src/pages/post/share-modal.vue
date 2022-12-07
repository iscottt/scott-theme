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
        <button class="money"><i class="fa-solid fa-sack-dollar"></i></button>
      </template>
      打赏
    </NTooltip>
    <NTooltip>
      <template #trigger>
        <button class="share"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>
      </template>
      分享
    </NTooltip>
    <!-- <i class="fa-solid fa-up-right-from-square"></i> -->
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
    };
  },
  watch: {
    post() {
      this.parseLiked();
    },
  },
  methods: {
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
</style>
