<template>
  <modalWrapper
    :title="total == null ? '评论加载中...' : `${total} 条回应`"
    icon="message-o"
    v-if="!((!post.comment_status || !$store.state.theme_settings.enable_comment) && !comment_list.length)"
    id="comment">
    <teleport :to="reply2 ? `#comment-item-${reply2} .body` : null" :disabled="!reply2">
      <div v-if="$store.state.theme_settings.comment_registration && !$store.state.current_user.id">
        <div class="login-tip">请您<a :href="get_login_url()">登录</a>后再发表评论或回复。或<a href="/nv-admin/register">注册</a>为会员。</div>
      </div>

      <template v-else>
        <div class="form" v-if="post.comment_status && $store.state.theme_settings.enable_comment" action="">
          <textarea v-model="content" placeholder="请输入..." class="has-emoji" ref="textarea"></textarea>
          <div class="flex justify-between">
            <div class="funcs flex-grow">
              <n-popover raw class="nv-popover" trigger="click" ref="user_popover">
                <template #trigger>
                  <button>
                    <span><svg-icon name="user" height="15" /> {{ $store.state.current_user.name || name || '昵称' }}</span>
                  </button>
                </template>
                <div v-if="$store.state.current_user.id">
                  <div class="title">退出登录？</div>
                  <div class="content flex g-1">
                    <button class="text" @click="$refs.user_popover.setShow(false)">取消</button>
                    <button class="text primary" @click="$store.dispatch('logOut')">退出</button>
                  </div>
                </div>
                <div v-else>
                  <div class="title">
                    {{ $store.state.theme_settings.require_name_email ? '昵称和邮箱必填' : '访客信息' }}
                  </div>
                  <div class="content form grid g-5">
                    <div class="flex g-5 items-center">
                      <label><svg-icon name="user" width="16" /></label>
                      <input v-model="name" :placeholder="`昵称${$store.state.theme_settings.require_name_email ? ' *' : ''}`" ref="input_name" />
                    </div>
                    <div class="flex g-5 items-center">
                      <label><svg-icon name="envelope" width="16" /></label>
                      <input v-model="email" :placeholder="`邮箱${$store.state.theme_settings.require_name_email ? ' *' : ''}`" ref="input_email" />
                    </div>
                    <div class="flex g-5 items-center">
                      <label><svg-icon name="icon-link" width="16" /></label>
                      <input v-model="url" placeholder="个人网站" />
                    </div>
                  </div>
                </div>
              </n-popover>

              <n-popover raw class="nv-popover" trigger="click" ref="emoji_popover" v-if="emojis.length">
                <template #trigger
                  ><button class="lite"><svg-icon name="face-smile-wink" /></button
                ></template>
                <div class="title">表情</div>
                <div class="content emoji-wrapper grid cols-6">
                  <div v-for="emoji in emojis" class="emoji flex items-center justify-center" @click="handleEmojiClick(emoji)">{{ emoji }}</div>
                </div>
              </n-popover>
            </div>
            <div class="actions">
              <button class="cancel-button" v-show="reply2" @click="reply2 = 0"><svg-icon name="ban" height="14" class="svg-icon" />取消<span class="lite">回复</span></button>
              <button class="submit-button" @click="handleSubmit">
                <svg-icon name="paper-plane" height="14" class="svg-icon" />
                <template v-if="reply2">
                  回复<span class="lite">给 {{ comment_list_raw.filter((r) => r.id == reply2)[0].name || '匿名' }}</span>
                </template>
                <template v-else>发布</template>
              </button>
            </div>
          </div>
        </div>
      </template>
    </teleport>
    <commentList
      class="comment-list"
      :data="comment_list"
      :reply2="reply2"
      @reply="
        (id) => {
          reply2 = id;
        }
      "
      :post="post" />
    <commentPagination :comments_per_page="comments_per_page" :total="total" :current_page="current_page" v-if="total" @page-changed="handlePageChanged" />
  </modalWrapper>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { NPopover } from 'naive-ui';

import modalWrapper from '/@/components/modalWrapper.vue';
import commentList from './comment-list.vue';
import commentPagination from './comment-pagination.vue';

export default defineComponent({
  name: 'comment',
  components: {
    modalWrapper,
    commentList,
    commentPagination,
    NPopover,
  },
  props: ['post'],
  data() {
    return {
      name: this.$store.state.guest.name || '',
      email: this.$store.state.guest.email || '',
      url: this.$store.state.guest.url || '',

      comment_list_raw: [],
      current_page: parseInt(this.$route.params.comment_page || 1),
      total: null,
      comments_per_page: 10,
      reply2: 0,
      emojis: (window.__niRvana_config__ || {}).emojis || [],

      content: '',
    };
  },
  computed: {
    comment_list() {
      return this.$array_to_tree(this.comment_list_raw);
    },
  },
  mounted() {
    this.requestData();
    this.$store.dispatch('checkNonce');
  },
  methods: {
    requestData(callback) {
      this.reply2 = 0;
      $fullLoading.start();
      this.$axios({
        method: 'post',
        url: this.$API + '/nv/front-stage/get-comment-list',
        responseType: 'json',
        data: {
          post: this.post.id,
          current_page: this.current_page,
          // comments_per_page: this.comments_per_page,
        },
      })
        .then(({ data }) => {
          this.comment_list_raw = data.data;
          this.total = data.pagination.total;
          this.comments_per_page = data.pagination.comments_per_page;
          this.$nextTick(() => {
            if (callback) {
              callback();
            }
          });
        })
        .catch((error) => {})
        .finally(() => {
          $fullLoading.end();
        });
    },
    handleEmojiClick(emoji) {
      this.content += emoji;
      this.$refs.emoji_popover.setShow(false);
      this.$refs.textarea.focus();
    },
    handleSubmit() {
      var required = this.$store.state.theme_settings.require_name_email;
      var name = this.name;
      var email = this.email;
      var name_dom = this.$refs.input_name;
      var email_dom = this.$refs.input_email;
      var current_user_id = this.$store.state.current_user.id;
      if (required && !name && !current_user_id) {
        this.$refs.user_popover.setShow(true);
        setTimeout(() => {
          name_dom.focus();
        });
        $message.warning('昵称和邮箱必填！');
        return;
      }
      if (required && !email && !current_user_id) {
        this.$refs.user_popover.setShow(true);
        setTimeout(() => {
          email_dom.focus();
        });
        $message.warning('昵称和邮箱必填！');
        return;
      }
      if (email && !current_user_id) {
        var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (!reg.test(email)) {
          $message.warning('请输入正确的邮箱格式！');
          this.$refs.user_popover.setShow(true);
          setTimeout(() => {
            email_dom.focus();
          });
          return;
        }
      }
      if (!this.content) {
        $message.warning('请填写评论内容！');
        this.$refs.textarea.focus();
        return;
      }

      // 存储用户数据
      this.$store.state.guest.name = name;
      this.$store.state.guest.email = email;
      this.$store.state.guest.url = this.url;

      $fullLoading.start();
      this.$axios({
        method: 'post',
        url: this.$API + '/nv/add-comment',
        responseType: 'json',
        data: {
          post_id: this.post.id,
          name: this.name,
          email: this.email,
          url: this.url,
          content: this.content,
          parent: this.reply2,
        },
      })
        .then(({ data }) => {
          if (!this.$isSuccess(data)) {
            return;
          }
          this.content = '';
          if (data.public) {
            if (!this.reply2) {
              this.current_page = 1;
            }
            $message.success('评论发表成功');
            this.requestData();
            this.$emit('public-comment-sent');
          } else {
            $message.warning('您的评论正在等待管理员审核，审核通过后将显示');
          }
        })
        .catch((error) => {
          console.log(error);
          $message.error('网络异常，评论发送失败');
        })
        .finally(() => {
          $fullLoading.end();
        });
    },
    handlePageChanged(page) {
      this.current_page = page;
      this.requestData(() => {
        window.scrollTo({
          top: document.querySelector(`.comment-list`).offsetTop - 56,
          left: 0,
          behavior: 'smooth',
        });
      });
    },
    get_login_url() {
      var href = window.location.href;
      var fullPath = this.$route.fullPath;
      return `${href.replace(fullPath, '')}/nv-admin/login?redirect={"url":"${href}"}`;
    },
  },
  unmounted() {},
});
</script>
<style lang="less">
#comment {
  .form {
    margin: 0.5em 0;
    textarea {
      text-shadow: 0.12rem 0.12rem 0.2rem #bec9d5, -1px -1px 1px hsl(0deg 0% 100% / 80%);
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 0.625rem;
      padding-bottom: 0.625rem;
      color: #73869a;
      box-shadow: min(-1px, -0.0625rem) min(-1px, -0.0625rem) hsla(0, 0%, 100%, 0.6), max(1px, 0.0625rem) max(1px, 0.0625rem) rgba(54, 100, 152, 0.2),
        inset 0.25rem 0.25rem 0.35rem rgba(54, 100, 152, 0.2), inset -0.2rem -0.2rem 0.35rem hsla(0, 0%, 100%, 0.6);
    }
  }
  .login-tip {
    margin: 0.5em 0;
    padding: 0.5em 1.25em;
    background-color: #dae5f2;
    border-radius: 0.5em;
    text-align: center;
    color: #5a6f87;
    a {
      font-weight: 500;
      margin: 0 0.25em;
      text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
      color: #007dff;
      text-decoration: none;
    }
  }
  textarea {
    outline: none;
    -webkit-appearance: none;
    width: 100%;
    resize: none;
    font-family: inherit;
    padding: 0.75em 1em;
    background: var(--bg-color);
    border: 1px solid var(--bg-color);
    border-radius: 0.5em;
    height: 8em;
    margin-bottom: 0.25em;
    transition: 0.25s;
    &:focus {
      background-color: #dae5f2;
      color: #415973;
    }
  }
  .cancel-button {
    font-size: 14px;
    border: none;
    background: transparent;
    color: var(--primary-color);
    margin-right: 1em;
    height: 2rem;
    .svg-icon {
      margin-right: 0.25em;
    }
  }
  .submit-button {
    font-size: 14px;
    background: transparent;
    color: #007dff;
    text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
    padding: 0 1em;
    height: 2rem;
    border-radius: 0.5em;
    border: 1px solid;
    box-shadow: -0.1768rem -0.1768rem 0.25rem hsla(0, 0%, 100%, 0.35), 0.1326rem 0.1326rem 0.3rem rgba(54, 100, 152, 0.15), inset 0 0 0 transparent,
      inset max(1px, 0.125rem) max(1px, 0.125rem) max(1px, 0.25rem) hsla(0, 0%, 100%, 0.6);
    border-color: rgba(54, 100, 152, 0.15);
    white-space: nowrap;
    max-width: 10em;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 500;
    transition: 0.35s;
    &:hover {
      text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
      border-color: transparent;
      box-shadow: min(-1px, -0.0625rem) min(-1px, -0.0625rem) hsla(0, 0%, 100%, 0.6), max(1px, 0.0625rem) max(1px, 0.0625rem) rgba(54, 100, 152, 0.2),
        inset 0.1875rem 0.1875rem 0.1875rem rgba(54, 100, 152, 0.2), inset -0.125rem -0.125rem 0.1875rem hsla(0, 0%, 100%, 0.6);
      // box-shadow: -10px -10px 15px rgba(255, 255, 255, 0.5), 10px 10px 15px rgba(70, 70, 70, 0.12), inset -10px -10px 15px rgba(255, 255, 255, 0.5), inset 10px 10px 15px rgba(70, 70, 70, 0.12);
    }
    .svg-icon {
      margin-right: 0.375em;
    }
  }
  .funcs {
    button {
      max-width: 10em;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: var(--text-color-3);
      font-size: 14px;
      height: 2rem;
      border: 1px solid;
      box-shadow: -0.1768rem -0.1768rem 0.25rem hsla(0, 0%, 100%, 0.35), 0.1326rem 0.1326rem 0.3rem rgba(54, 100, 152, 0.15), inset 0 0 0 transparent,
        inset max(1px, 0.125rem) max(1px, 0.125rem) max(1px, 0.25rem) hsla(0, 0%, 100%, 0.6);
      border-color: rgba(54, 100, 152, 0.15);
      background: transparent;
      border-radius: 0.5em;
      padding: 0 0.65em;
      transition: 0.35s;
      font-weight: 500;
      & + button {
        margin-left: 0.75em;
      }
      span {
        padding: 0 0.2em;
      }
      &:hover {
        color: var(--primary-color);
        text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
        border-color: transparent;
        box-shadow: min(-1px, -0.0625rem) min(-1px, -0.0625rem) hsla(0, 0%, 100%, 0.6), max(1px, 0.0625rem) max(1px, 0.0625rem) rgba(54, 100, 152, 0.2),
          inset 0.1875rem 0.1875rem 0.1875rem rgba(54, 100, 152, 0.2), inset -0.125rem -0.125rem 0.1875rem hsla(0, 0%, 100%, 0.6);
        // box-shadow: -10px -10px 15px rgba(255, 255, 255, 0.5), 10px 10px 15px rgba(70, 70, 70, 0.12), inset -10px -10px 15px rgba(255, 255, 255, 0.5), inset 10px 10px 15px rgba(70, 70, 70, 0.12);
      }
    }
  }
  @media (max-width: 575px) {
    .lite {
      display: none;
    }
  }
}
.has-emoji {
  font-family: 'Play', '微软雅黑', 'Microsoft YaHei UI', 'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif', 'apple color emoji', 'segoe ui emoji',
    'noto color emoji', 'android emoji', 'emojisymbols', 'emojione mozilla', 'twemoji mozilla', 'segoe ui symbol';
}
.nv-popover {
  background: var(--n-color);
  border-radius: 0.5em;
  box-shadow: 0 0 0 1px var(--gray-opacity-1), 0 5px 10px var(--gray-opacity-2);
  .title {
    border-radius: 0.5em 0.5em 0 0;
    padding: 0.375rem 1rem;
    border: 1px solid var(--white-default);
    border-bottom-color: var(--border-color-2);
    background: var(--gray-9);
    color: var(--text-color-2);
  }
  .content {
    padding: 0.75rem 1rem;
  }
  .emoji-wrapper {
    padding: 0.5em;
  }
  .emoji {
    font-size: 24px;
    text-align: center;
    cursor: pointer;
    width: 2.75rem;
    height: 2.75rem;
    text-shadow: 0 3px 3px var(--gray-opacity-1);
    border-radius: 0.25em;
    transition: 0.35s;
    &:hover {
      background: var(--primary-opacity-2);
      text-shadow: 0 4px 6px var(--gray-opacity-2);
      transition: 0.1s;
    }
  }
  button {
    font-size: 14px;
    padding: 3px 7px;
    border: none;
    border-radius: 4px;
    transition: 0.25s;
  }
  button.primary {
    background: var(--primary-color);
    color: #fff;
  }
  button.text {
    background: transparent;
    color: var(--text-color-3);
    &:hover {
      color: var(--primary-color);
    }
  }
  button.text.primary {
    color: var(--primary-color);
    &:hover {
      background: var(--primary-opacity-1);
    }
  }
  .form {
    label {
      color: var(--text-color-3);
    }
    input {
      outline: none;
      -webkit-appearance: none;
      width: 100%;
      resize: none;
      font-family: inherit;
      padding: 0.5em 1em;
      border: 1px solid var(--border-color);
      color: var(--text-color-3);
      border-radius: 0.5em;
      margin-bottom: 0.25em;
      transition: 0.25s;
      &:focus {
        background: var(--white-default);
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px var(--primary-opacity-2);
        color: var(--text-color);
      }
    }
  }
}
.is-dark {
  #comment .login-tip {
    background-color: rgba(99, 226, 183, 0.16);
    a {
      text-shadow: none;
    }
  }
  #comment {
    .funcs,
    .actions {
      button {
        background-color: rgba(99, 226, 183, 0.16);
        box-shadow: none;
        color: rgba(255, 255, 255, 0.52);
        text-shadow: none;
        &:hover {
          background: var(--primary-color);
          text-shadow: none;
          color: #fff;
        }
      }
    }
    .form {
      textarea {
        box-shadow: none;
        text-shadow: none;
        color: #fff;
        border-color: transparent;
        background: rgba(99, 226, 183, 0.16);
        &:focus {
          background: rgba(99, 226, 183, 0.26);
        }
      }
    }
  }
}
</style>
