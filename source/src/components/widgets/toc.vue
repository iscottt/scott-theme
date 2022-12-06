<template>
  <div class="widget toc" v-if="titles.length > 0">
    <widgetTitle>文章目录</widgetTitle>
    <ul>
      <template v-for="block in titles">
        <li :class="{ active: activeIds.includes(block.id), isTop: block.data.level <= 3 }" :data-header-level="block.data.level">
          <div class="toc_wrapper">
            <span
              ><a @click="handleTitleClick(block.id)">{{ block.data.text }}</a></span
            >
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import widgetTitle from './widget-title.vue';
export default defineComponent({
  name: 'toc',
  components: {
    widgetTitle,
  },
  props: {
    post: Object,
    lastHidedHeaderId: String,
  },
  computed: {
    titles() {
      return this.post.content.blocks.filter((item) => item.type == 'header' || item.type == 'pandastudio/title');
    },
    activeIds() {
      var last = this.lastHidedHeaderId;
      var result = [];
      var getPrevId = (currentId) => {
        if (currentId) {
          var currentLevel = 0;
          var currentBlock = this.titles.filter((block) => block.id == currentId);
          if (currentBlock.length) {
            currentLevel = currentBlock[0].data.level;
          }
          var lastLevel = currentLevel - 1;
          if (lastLevel > 0) {
            // 从当前的block反向找回去
            var cuttedTitles = this.titles.slice(0, this.titles.indexOf(currentBlock[0]));
            for (var i = cuttedTitles.length - 1; i >= 0; i--) {
              var block = cuttedTitles[i];
              if (block.data.level == lastLevel) {
                return block.id;
              }
            }
          }
        }
        return '';
      };

      while (last) {
        result.push(last);
        last = getPrevId(last);
      }
      return result;
    },
  },
  methods: {
    handleTitleClick(id) {
      window.scrollTo({
        top: document.querySelector(`[data-block-id="${id}"]`).offsetTop - 56,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
});
</script>
<style lang="less">
.toc > ul {
  padding: 0;
  margin-left: -1rem;
}
.toc > ul > li {
  display: block;
  list-style: none;
  padding-left: 2rem;
  padding-right: 1rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition-duration: 0.25s;
  text-shadow: 0 1px 1px #fff;
  border-left: 2px solid transparent;
  border-radius: 0 0.375rem 0.375rem 0;
  cursor: pointer;
}
.toc > ul > li.isTop {
  padding-left: 1rem;
}
.toc > ul > li.active {
  border-color: #007dff;
  background: rgba(0, 125, 255, 0.1);
}

.toc > ul > li.active a {
  color: #007dff;
  text-shadow: 0.1326rem 0.1326rem 0.1875rem rgb(0 125 255 / 50%), -1px -1px 1px hsl(0deg 0% 100% / 80%);
}
</style>
