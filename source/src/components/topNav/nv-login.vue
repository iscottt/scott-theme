<template>
  <div class="login flex items-center" v-if="$store.state.theme_settings.niRvana_fake_login || $store.state.theme_settings.comment_registration">
    <NPopover
      :show="fake_login_popover_state"
      raw
      class="nv-popover"
      v-if="!$store.state.guest.email && !$store.state.current_user.id"
      @clickoutside="handleCloseAllPopover"
      :disabled="$store.state.theme_settings.comment_registration">
      <template #trigger>
        <div class="user-avatar" @click="handleTogglePopover">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16">
            <path
              fill="currentColor"
              d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
          </svg>
        </div>
      </template>
      <div class="title">免密登录</div>
      <div class="content form grid g-5">
        <div class="flex g-5 items-center">
          <label><svg-icon name="user" width="16" /></label>
          <input v-model="name" placeholder="昵称 *" ref="input_name" />
        </div>
        <div class="flex g-5 items-center">
          <label><svg-icon name="envelope" width="16" /></label>
          <input v-model="email" placeholder="邮箱 *" ref="input_email" />
        </div>
        <div class="flex g-5 items-center">
          <label><svg-icon name="icon-link" width="16" /></label>
          <input v-model="url" placeholder="个人网站" />
        </div>
        <button class="confirm-button" @click="handleSaveGuestInfo">登入</button>
      </div>
    </NPopover>
    <NPopover :show="fake_logout_popover_state" raw class="nv-popover" v-else @clickoutside="handleCloseAllPopover">
      <template #trigger>
        <img class="user-avatar" :src="$store.state.current_user.avatar_url" />
        <!-- <div class="user-circle" @click="handleTogglePopover">
          {{ $store.state.guest.name[0] || $store.state.current_user.name[0] }}
        </div> -->
      </template>
      <div class="title">退出登录？</div>
      <div class="content flex g-1">
        <button
          class="text"
          @click="
            () => {
              fake_logout_popover_state = false;
            }
          ">
          取消
        </button>
        <button class="text primary" @click="handleLogout">退出</button>
      </div>
    </NPopover>
    <span class="name flex items-center" @click="handleTogglePopover">{{ $store.state.guest.name || $store.state.current_user.name || '登录' }}<i class="fa-solid fa-angle-down caret"></i></span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { NPopover } from 'naive-ui';
export default defineComponent({
  name: 'login',
  components: { NPopover },
  data() {
    return {
      name: '',
      email: '',
      url: '',
      fake_logout_popover_state: false,
      fake_login_popover_state: false,
    };
  },
  methods: {
    handleSaveGuestInfo() {
      if (!this.name) {
        $message.warning('请输入昵称');
        return;
      }
      if (!this.email) {
        $message.warning('请输入邮箱');
        return;
      }
      var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      if (!reg.test(this.email)) {
        $message.warning('请输入正确的邮箱格式！');
        return;
      }
      this.$localStorage('guest_info', {
        name: this.name,
        email: this.email,
        url: this.url,
      });
      location.reload();
    },
    handleLogout() {
      this.$localStorage('guest_info', '');
      this.$store.dispatch('logOut');
    },
    handleTogglePopover() {
      if (!this.$store.state.guest.email && !this.$store.state.current_user.id) {
        if (this.$store.state.theme_settings.comment_registration) {
          var href = window.location.href;
          var fullPath = this.$route.fullPath;
          var url = fullPath == '/' ? href : href.replace(fullPath, '') + '/';
          window.location = `${url}nv-admin/login?redirect={"url":"${href}"}`;
        } else {
          this.fake_login_popover_state = !this.fake_login_popover_state;
        }
      } else {
        this.fake_logout_popover_state = !this.fake_logout_popover_state;
      }
    },
    handleCloseAllPopover() {
      setTimeout(() => {
        this.fake_login_popover_state = false;
        this.fake_logout_popover_state = false;
      }, 16);
    },
  },
});
</script>

<style lang="less" scoped>
.user-circle {
  display: flex;
  width: 32px;
  height: 32px;
  background-image: linear-gradient(var(--gray-5), var(--gray-3));
  box-shadow: 0 2px 3px var(--gray-opacity-2);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}
.user-avatar {
  display: flex;
  background-image: linear-gradient(var(--gray-5), var(--gray-3));
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 0 0.1rem #fff, 0.442rem 0.442rem 0.625rem rgb(54 100 152 / 20%), -0.25rem -0.25rem 0.625rem hsl(0deg 0% 100% / 70%);
}
.login {
  height: 56px;
}
.confirm-button {
  background: linear-gradient(90deg, var(--primary-color), var(--analogous-color));
  color: #fff;
  text-shadow: 0 2px 2px var(--primary-color);
  padding: 0 1em;
  height: 2rem;
  border-radius: 9em !important;
  box-shadow: 0 5px 8px var(--primary-opacity-5);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
@media (max-width: 991.5px) {
  .login {
    padding: 0 1.3em;
  }
}
.name {
  margin-left: 5px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  .caret {
    font-size: 10px;
    margin-left: 4px;
    @media (max-width: 991.5px) {
      display: none;
    }
  }
}
</style>
<style lang="less">
@media (min-width: 992px) {
  .float-in .login .name {
    color: var(--text-color-3);
    text-shadow: 0 1px #fff;
  }
}
@media (max-width: 991.5px) {
  .login .name {
    color: var(--text-color-3);
    text-shadow: 0 1px #fff;
  }
}
</style>
