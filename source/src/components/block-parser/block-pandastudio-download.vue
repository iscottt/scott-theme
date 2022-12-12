<template>
  <div
    class="pandastudio-download"
    :class="{
      'align-left': data.align == 'left',
      'align-center': data.align == 'center',
      'align-right': data.align == 'right',
    }">
    <div class="get-it">
      <a class="main flex items-center justify-center" target="_blank" :href="data.url" @click="handleClick">
        <i class="fa-solid fa-paperclip"></i>
        立即下载
      </a>
      <n-popover v-if="data.links.length" raw class="nv-popover">
        <template #trigger>
          <div class="more flex items-center"><i class="fa-solid fa-ellipsis-vertical"></i></div>
        </template>
        <div class="title">更多链接</div>
        <div class="content">
          <div class="link-item" v-for="link in data.links">
            <a target="_blank" :href="link.url" @click="handleClick">{{ link.title || '未标题' }}</a>
          </div>
        </div>
      </n-popover>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { NPopover } from 'naive-ui';

export default defineComponent({
  name: 'block-download',
  components: { NPopover },
  props: {
    data: {
      type: Object,
    },
  },
  methods: {
    handleClick(event) {
      if (this.data.need_reply) {
        event.preventDefault();
        $notification.warning({
          title: '请认真评论后再下载',
          content: '评论时务必填写邮箱，审核通过后将邮件通知您。届时使用您的邮箱登录网站即可查看',
          duration: 20000,
        });
      }
    },
  },
});
</script>
<style lang="less" scoped>
.pandastudio-download {
  margin: 1em 0;
}
.pandastudio-download.align-left .get-it {
  margin-right: auto;
}
.pandastudio-download.align-center .get-it {
  margin-left: auto;
  margin-right: auto;
}
.pandastudio-download.align-right .get-it {
  margin-left: auto;
}
.arrow {
  margin-right: 8px;
  color: var(--primary-color);
  filter: drop-shadow(0 2px 1px var(--primary-opacity-3));
  animation: arrow-animation 0.5s infinite alternate;
}
@keyframes arrow-animation {
  0% {
    transform: translateY(-6px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.get-it {
  width: 120px;
  cursor: pointer;
  display: flex;
}
.get-it .main {
  flex-grow: 1;
  font-size: 14px;
  border: 1px solid var(--border-color);
  padding: 7px 0;
  border-radius: 8px 0 0 8px;
  text-align: center;
  // box-shadow: 0 2px var(--gray-opacity-1);
  box-shadow: -0.1768rem -0.1768rem 0.25rem hsla(0, 0%, 100%, 0.35), 0.1326rem 0.1326rem 0.3rem rgba(54, 100, 152, 0.15), inset 0 0 0 transparent,
    inset max(1px, 0.125rem) max(1px, 0.125rem) max(1px, 0.25rem) hsla(0, 0%, 100%, 0.6);
  color: var(--primary-color);
  text-shadow: 0 2px 2px var(--primary-opacity-3);
  transition: 0.25s;
}
.get-it .main i{
  font-size: 18px;
  margin-right: 5px;
}
.get-it .main:only-child {
  border-radius: 8px;
}
.get-it .main:hover {
  // border-color: var(--primary-color);
  text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
  background-color: #e8f0fa;
  box-shadow: min(-1px, -0.0625rem) min(-1px, -0.0625rem) hsla(0, 0%, 100%, 0.6), max(1px, 0.0625rem) max(1px, 0.0625rem) rgba(54, 100, 152, 0.2),
    inset 0.1875rem 0.1875rem 0.1875rem rgba(54, 100, 152, 0.2), inset -0.125rem -0.125rem 0.1875rem hsla(0, 0%, 100%, 0.6);
  // box-shadow: 0 2px var(--primary-opacity-3);
}
.get-it .main:hover .arrow {
  text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
}
.get-it .more {
  border: 1px solid var(--border-color);
  border-left: 0;
  padding: 7px;
  border-radius: 0 8px 8px 0;
  box-shadow: -0.1768rem -0.1768rem 0.25rem hsla(0, 0%, 100%, 0.35), 0.1326rem 0.1326rem 0.3rem rgba(54, 100, 152, 0.15), inset 0 0 0 transparent,
    inset max(1px, 0.125rem) max(1px, 0.125rem) max(1px, 0.25rem) hsla(0, 0%, 100%, 0.6);
  color: var(--text-color-3);
  transition: 0.35s;
}
.get-it .more i {
  font-size: 14px;
  color: var(--primary-color);
}
.get-it .more:hover {
  color: var(--primary-color);
  text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
  box-shadow: min(-1px, -0.0625rem) min(-1px, -0.0625rem) hsla(0, 0%, 100%, 0.6), max(1px, 0.0625rem) max(1px, 0.0625rem) rgba(54, 100, 152, 0.2),
    inset 0.1875rem 0.1875rem 0.1875rem rgba(54, 100, 152, 0.2), inset -0.125rem -0.125rem 0.1875rem hsla(0, 0%, 100%, 0.6);
  background-color: #e8f0fa;
}
svg path {
  fill: currentColor;
}
.link-item {
  font-size: 14px;
  border-radius: 5px;
  padding: 5px 7px;
  margin: 0 -7px;
  transition: 0.25s;
  &:hover {
    background-color: var(--primary-opacity-1);
  }
  a {
    color: var(--primary-color);
    text-decoration: none;
    text-shadow: 0 2px 2px var(--primary-opacity-3);
    display: block;
  }
}
</style>
