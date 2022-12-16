<template>
  <div class="code" :data-lang="data.language">
    <n-tooltip>
      <template #trigger>
        <button @click="copyToClip(data.pre.split('\n'))">
          <svg-icon name="copy" />
        </button>
      </template>
      复制代码
    </n-tooltip>
    <div class="tools"></div>
    <pre><code class="hljs" v-html="hightlighjs()" :data-language="data.language"></code></pre>
  </div>
</template>
<script>
import { useMessage, NTooltip } from 'naive-ui';
import { defineComponent } from 'vue';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js/lib/common';
export default defineComponent({
  name: 'block-code',
  props: {
    data: {
      type: Object,
    },
  },
  components: {
    NTooltip,
  },
  data() {
    return {
      message: useMessage(),
    };
  },
  methods: {
    copyToClip(contentArray) {
      var contents = '';
      for (var i = 0; i < contentArray.length; i++) {
        contents += contentArray[i] + '\n';
      }
      const textarea = document.createElement('textarea');
      textarea.value = contents;
      document.body.appendChild(textarea);
      textarea.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
      }
      document.body.removeChild(textarea);
      this.message.info('复制成功！');
    },
    hightlighjs() {
      var result = this.data.language ? hljs.highlight(this.data.pre, { language: this.data.language }).value : hljs.highlightAuto(this.data.pre).value;
      return result;
    },
  },
});
</script>
<style scoped lang="less">
div {
  position: relative;
  margin: 1em 0;
}
button {
  font-size: 14px;
  padding: 0;
  width: 2.2em;
  height: 2.2em;
  border-radius: 50%;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(-30%) translateY(-50%);
  color: #fff;
  background: linear-gradient(var(--analogous-color), var(--primary-color));
  box-shadow: 0 3px 4px var(--primary-opacity-3);
  transition: 0.35s;
  z-index: 3;
  &:hover {
    transform: translateX(-30%) translateY(-50%) scale(1.4);
    transition: cubic-bezier(0.5, 3, 0.65, 1) 0.5s;
  }
}
.tools {
  width: 100%;
  background: #282c34;
  height: 30px;
  position: absolute;
  top: 0;
  margin: 0;
  border-radius: 0.5em;
}
.tools:before {
  content: ' ';
  position: absolute;
  top: 50%;
  margin-top: -6px;
  left: 12px;
  height: 12px;
  width: 12px;
  background: #fc625d;
  border-radius: 50%;
  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
}
.code pre {
  max-height: 300px;
  margin: 0;
  padding: 2em 1.2em;
  overflow: auto;
  background: #282c34;
  border-radius: 0.5em;
}
.code pre::-webkit-scrollbar {
  display: none;
}
.code pre code {
  overflow: visible;
  font-family: Menlo, Monaco, Consolas, Courier New, monospace;
  font-size: 85%;
  padding: 0;
  background: transparent;
}
</style>
