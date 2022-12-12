<template>
  <div class="scottstudio-timeline" v-if="show">
    <div class="timeline-item" v-for="(item, index) in timeItems" :key="index">
      <div class="timeline-dot-wrapper">
        <div class="timeline-dot-line"></div>
        <div class="timeline-dot-content">
          <div class="dot"></div>
        </div>
      </div>
      <div class="timeline-content-wrapper">
        <div class="timeline-content">
          <div>
            <richText v-model:value="item.title" placeholder="请输入标题..." class="title" />
            <richText v-model:value="item.time" placeholder="请输入时间..." class="time" />
          </div>
          <innerBlocks v-model:value="item.content" class="content" />
        </div>
      </div>
      <div class="close" @click="handleRemoveItem(index)">
        <i class="fa-solid fa-xmark"></i>
      </div>
    </div>
    <div class="add-main" @click="handleAddItem">
      <div class="title"><i class="fa-solid fa-check" style="margin-right: 10px"></i>增加时间轴节点</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scottstudio-timeline-block',
  components: {
    richText: nv.components.richText,
    innerBlocks: nv.components.innerBlocks,
  },
  data() {
    return {
      timeItems: [],
      show: true,
    };
  },
  methods: {
    handleAddItem() {
      this.show = false;
      const newItem = [
        {
          time: '',
          title: '',
          content: {},
        },
      ];
      this.timeItems = newItem.concat(this.timeItems);
      this.$emit('forceUpdate');
      this.$nextTick(() => {
        this.show = true;
      });
    },
    handleRemoveItem(index) {
      this.timeItems.splice(index, 1);
    },
  },
  mounted() {
    nv.block.loadDefaultData.bind(this)();
  },
};
</script>

<style scoped>
.scottstudio-timeline .timeline-item {
  position: relative;
  color: rgb(29, 33, 41);
  font-size: 14px;
  min-height: 78px;
  padding-left: 6px;
}
.scottstudio-timeline .timeline-item:hover .close {
  opacity: 1;
}

.scottstudio-timeline .timeline-item .close {
  position: absolute;
  top: -13px;
  right: -13px;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  transition: 0.35s;
  cursor: pointer;
  opacity: 0;
}
.scottstudio-timeline .timeline-item .close i {
  font-size: 16px;
  font-style: normal;
  color: rgb(118, 124, 130);
}
.scottstudio-timeline .timeline-item .close:hover {
  background-color: #eff2f5;
}
.scottstudio-timeline .timeline-item .timeline-dot-wrapper {
  position: absolute;
  text-align: center;
  height: 100%;
  left: 0;
}
.scottstudio-timeline .timeline-item .timeline-dot-wrapper .timeline-dot-line {
  width: 1px;
  border: 1px solid rgb(229, 230, 235);
  left: 50%;
  transform: translateX(-50%);
  top: 18px;
  bottom: -4px;
  position: absolute;
  box-sizing: border-box;
}
.scottstudio-timeline .timeline-item:last-of-type .timeline-dot-line {
  display: none;
}
.scottstudio-timeline .timeline-item .timeline-dot-wrapper .timeline-dot-content {
  width: 6px;
  height: 22px;
  line-height: 22px;
  position: relative;
}

.scottstudio-timeline .timeline-dot-content .dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  box-sizing: border-box;
  color: rgb(22, 93, 255);
  margin-top: -50%;
  position: relative;
  top: 50%;
  background-color: rgb(22, 93, 255);
}

.scottstudio-timeline .timeline-content-wrapper {
  margin-left: 16px;
  position: relative;
}
.scottstudio-timeline .timeline-content-wrapper .timeline-content {
  display: flex;
  line-height: 1.5715;
  font-size: 14px;
  color: var(--text-color-2);
  margin-bottom: 4px;
}
.scottstudio-timeline .timeline-content-wrapper .timeline-content > div:first-child {
  min-width: 100px;
  margin-right: 40px;
}
.scottstudio-timeline .timeline-content-wrapper .timeline-content > div:last-child {
  flex: 1;
}
.scottstudio-timeline .timeline-content-wrapper .timeline-content .title {
  margin: 0;
  font-size: 20px;
  line-height: 28px;
  display: block;
  border: none;
  outline: none;
}
.scottstudio-timeline .timeline-content-wrapper .timeline-content .time {
  font-size: 12px;
  line-height: 20px;
  color: #86909c;
  margin: 0;
  display: block;
  border: none;
  outline: none;
}
.add-main {
  width: 150px;
  height: 40px;
  background-color: var(--divider-color);
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--text-color-3);
  position: relative;
  transition: 0.25s;
  cursor: pointer;
  margin-top: 20px;
}
.add-main .title {
  cursor: pointer;
  font-size: 14px;
  border: none;
  color: var(--text-color-3);
  text-shadow: 0 1px var(--white-default);
  background: transparent;
  transition: 0.25s;
  cursor: pointer;
}
.add-main .title:hover {
  color: #3196ff;
}
</style>
