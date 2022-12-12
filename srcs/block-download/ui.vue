<template>
  <div
    class="scottstudio-download"
    :class="{
      'align-left': align == 'left',
      'align-center': align == 'center',
      'align-right': align == 'right',
    }">
    <div class="get-it">
      <div class="main">
        <i class="fa-solid fa-paperclip"></i>
        立即下载
      </div>
      <div class="more" v-if="links.length">
        <div class="more flex items-center"><i class="fa-solid fa-ellipsis-vertical"></i></div>
      </div>
    </div>
    <div v-show="false">{{ links }}{{ url }}{{ need_reply }}</div>
  </div>
</template>
<script>
export default {
  name: 'scottstudio-download-block',
  components: {
    NInput: nv.components.input,
    NButton: nv.components.button,
  },
  data() {
    return {
      need_reply: false,
      align: '',
      url: '',
      links: [],
    };
  },
  mounted() {
    // 加载默认数据
    nv.block.loadDefaultData.bind(this)();
  },
};
</script>
<style scoped>
.scottstudio-download {
  margin: 1em 0;
}
.scottstudio-download.align-left .get-it {
  margin-right: auto;
}
.scottstudio-download.align-center .get-it {
  margin-left: auto;
  margin-right: auto;
}
.scottstudio-download.align-right .get-it {
  margin-left: auto;
}
.arrow {
  margin-right: 8px;
  color: var(--primary-color);
  filter: drop-shadow(0 2px 1px var(--primary-opacity-3));
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
  box-shadow: -0.1768rem -0.1768rem 0.25rem hsla(0, 0%, 100%, 0.35), 0.1326rem 0.1326rem 0.3rem rgba(54, 100, 152, 0.15), inset 0 0 0 transparent,
    inset max(1px, 0.125rem) max(1px, 0.125rem) max(1px, 0.25rem) hsla(0, 0%, 100%, 0.6);
  color: var(--primary-color);
  text-shadow: 0 2px 2px var(--primary-opacity-3);
  transition: 0.25s;
}
.get-it .main i {
  font-size: 18px;
  margin-right: 5px;
}
.get-it .main:only-child {
  border-radius: 8px;
}
.get-it .main:hover {
  text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
  background-color: #e8f0fa;
  box-shadow: min(-1px, -0.0625rem) min(-1px, -0.0625rem) hsla(0, 0%, 100%, 0.6), max(1px, 0.0625rem) max(1px, 0.0625rem) rgba(54, 100, 152, 0.2),
    inset 0.1875rem 0.1875rem 0.1875rem rgba(54, 100, 152, 0.2), inset -0.125rem -0.125rem 0.1875rem hsla(0, 0%, 100%, 0.6);
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
</style>
