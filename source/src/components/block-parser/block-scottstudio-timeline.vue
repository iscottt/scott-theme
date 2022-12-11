<template>
  <div class="scottstudio-timeline">
    <div class="timeline-item" v-for="item in data.timeItems" :key="item.title">
      <div class="timeline-dot-wrapper">
        <div class="timeline-dot-line"></div>
        <div class="timeline-dot-content">
          <div class="dot"></div>
        </div>
      </div>
      <div class="timeline-content-wrapper">
        <div class="timeline-content">
          <div>
            <h2 v-html="item.title"></h2>
            <p class="date" v-html="item.time"></p>
          </div>
          <blockParser class="content" :blocks="item.content.blocks" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import blockParser from '/@/components/block-parser/parser.vue';
export default defineComponent({
  name: 'block-timeline',
  props: {
    data: {
      type: Object,
    },
  },
  components: { blockParser },
});
</script>

<style scoped lang="less">
.scottstudio-timeline {
  margin-top: 40px;
  .timeline-item {
    position: relative;
    font-size: 14px;
    min-height: 78px;
    padding-left: 6px;
    .timeline-dot-wrapper {
      position: absolute;
      text-align: center;
      height: 100%;
      left: 0;
      .timeline-dot-line {
        width: 1px;
        left: 50%;
        transform: translateX(-50%);
        top: 18px;
        bottom: -4px;
        position: absolute;
        box-sizing: border-box;
        border: 1px solid rgb(229, 230, 235);
      }
      .timeline-dot-content {
        width: 6px;
        height: 22.001px;
        line-height: 22.001px;
        position: relative;
        .dot {
          width: 6px;
          height: 6px;
          box-sizing: border-box;
          color: rgb(22, 93, 255);
          border-radius: 9999px;
          margin-top: -50%;
          position: relative;
          top: 50%;
          background-color: rgb(22, 93, 255);
        }
      }
    }
    &:last-of-type {
      .timeline-dot-line {
        display: none;
      }
    }
    .timeline-content-wrapper {
      margin-left: 16px;
      position: relative;
      .timeline-content {
        padding-bottom: 40px;
        display: flex;
        line-height: 1.5715;
        font-size: 14px;
        margin-bottom: 4px;
        & > div:first-child {
          min-width: 100px;
        }
        .date {
          font-size: 12px;
          line-height: 20px;
          color: #86909c;
          margin: 0;
        }
        h2 {
          margin: 0;
          font-size: 20px;
          line-height: 28px;
          font-weight: 500;
          color: rgb(29, 33, 41);
        }
        ::v-deep(.content p) {
          margin: 0 !important;
        }
        ::v-deep(.content li) {
          margin-bottom: 2px;
        }
      }
    }
  }
}
</style>
