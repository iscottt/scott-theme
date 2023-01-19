import { createStore } from 'vuex';
import { $axios, $API } from './properties.js';
import { localStorage, cookies } from './functions.js';

export default createStore({
  state() {
    return {
      nonce: '',

      is_home: false,
      is_post: false,
      is_term: false,

      post_slug: '',
      taxonomy: '',
      term_slug: '',
      comment_page: 1,
      current_page: 1,
      // 这两个是发起query之后，后端传回来才有
      posts_per_page: 0,
      total: 0,

      is_sidebar_open: false,
      is_menubar_open: false,

      theme_settings: {},

      nav_menus: {
        topNav: [],
        catNav: [],
      },
      card_type: 'card',
      window: {
        width: 0,
      },
      current_user: {
        id: 0,
        name: '',
      },
      guest: {
        name: '',
        email: '',
        url: '',
      },

      most_likes_posts: [],
      most_comments_posts: [],
    };
  },
  mutations: {
    setState(state, [stateName, val]) {
      state[stateName] = val;
    },
    setRouteState(state, routeState) {
      Object.keys(routeState).map((key) => {
        state[key] = routeState[key];
      });
    },
    recordWindowWidth(state) {
      state.window.width = window.innerWidth;
      window.addEventListener('resize', () => {
        state.window.width = window.innerWidth;
      });
    },
  },
  actions: {
    closeBars(context) {
      context.state.is_sidebar_open = false;
      context.state.is_menubar_open = false;
    },
    openSidebar(context) {
      context.state.is_sidebar_open = true;
      context.state.is_menubar_open = false;
    },
    openMenubar(context) {
      context.state.is_menubar_open = true;
      context.state.is_sidebar_open = false;
    },
    toggleSidebar(context) {
      if (context.state.is_sidebar_open) {
        context.state.is_sidebar_open = false;
      } else {
        context.dispatch('openSidebar');
      }
    },
    toggleMenubar(context) {
      if (context.state.is_menubar_open) {
        context.state.is_menubar_open = false;
      } else {
        context.dispatch('openMenubar');
      }
    },
    handleRouterChange(context, to) {
      context.commit('setRouteState', {
        is_home: !!to.meta.is_home,
        is_post: !!to.meta.is_post,
        is_term: !!to.meta.is_term,

        post_slug: to.params.post_slug || '',
        taxonomy: to.params.taxonomy || '',
        term_slug: to.params.term_slug || '',
        comment_page: parseInt(to.params.comment_page) || 1,
        current_page: parseInt(to.params.current_page) || 1,

        // 总是重置为0，分页查询后再在组件里面更新它
        posts_per_page: 0,
        total: 0,
      });
    },
    checkNonce(context) {
      // 每次打开页面需要评论的时候都获取一次用户数据
      if (cookies('nvnonce') || localStorage('nvnonce') || context.state.nonce) {
        $axios({
          method: 'post',
          url: $API + '/nv/check-nonce',
          responseType: 'json',
        })
          .then(({ data }) => {
            if (data.error) {
              cookies('nvnonce', '');
              localStorage('nvnonce', '');
              context.commit('nonce', '');
            } else {
              context.commit('setState', ['current_user', data]);
            }
          })
          .catch((error) => {});
      }
    },
    logOut(context) {
      $axios({
        method: 'post',
        url: $API + '/nv/user-logout',
      }).finally(() => {
        localStorage('nvnonce', '');
        cookies('nvnonce', '');
        location.reload();
      });
    },
  },
  modules: {},
});
