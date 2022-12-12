<template>
  <div class="scottstudio-download-settings">
    <div class="tune-buttons">
      <nvTooltip>
        <template #trigger>
          <button class="cdx-settings-button" :class="{ 'cdx-settings-button--active': align == 'left' }" @click="handleToggleAlign('left')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 14px">
              <path
                d="M256 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H256C273.7 32 288 46.33 288 64C288 81.67 273.7 96 256 96zM256 352H32C14.33 352 0 337.7 0 320C0 302.3 14.33 288 32 288H256C273.7 288 288 302.3 288 320C288 337.7 273.7 352 256 352zM0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224H32C14.33 224 0 209.7 0 192zM416 480H32C14.33 480 0 465.7 0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480z" />
            </svg>
          </button>
        </template>
        左对齐
      </nvTooltip>
      <nvTooltip>
        <template #trigger>
          <button class="cdx-settings-button" :class="{ 'cdx-settings-button--active': align == 'center' }" @click="handleToggleAlign('center')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 14px">
              <path
                d="M320 96H128C110.3 96 96 81.67 96 64C96 46.33 110.3 32 128 32H320C337.7 32 352 46.33 352 64C352 81.67 337.7 96 320 96zM416 224H32C14.33 224 0 209.7 0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224zM0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480H32C14.33 480 0 465.7 0 448zM320 352H128C110.3 352 96 337.7 96 320C96 302.3 110.3 288 128 288H320C337.7 288 352 302.3 352 320C352 337.7 337.7 352 320 352z" />
            </svg>
          </button>
        </template>
        居中
      </nvTooltip>
      <nvTooltip>
        <template #trigger>
          <button class="cdx-settings-button" :class="{ 'cdx-settings-button--active': align == 'right' }" @click="handleToggleAlign('right')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 14px">
              <path
                d="M416 96H192C174.3 96 160 81.67 160 64C160 46.33 174.3 32 192 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96zM416 352H192C174.3 352 160 337.7 160 320C160 302.3 174.3 288 192 288H416C433.7 288 448 302.3 448 320C448 337.7 433.7 352 416 352zM0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224H32C14.33 224 0 209.7 0 192zM416 480H32C14.33 480 0 465.7 0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480z" />
            </svg>
          </button>
        </template>
        右对齐
      </nvTooltip>
    </div>
    <div class="links tune-box border-top border-bottom">
      <div class="tune-box">
        <div class="title flex justify-between need_reply">
          需评论下载
          <n-switch v-model:value="need_reply" />
        </div>
        <div class="title">链接</div>
        <input class="nv-input mb-3" v-model="url" placeholder="http://" />
        <div class="title flex justify-between">
          更多链接
          <NButton text type="primary" @click="handleAddLink"><i class="el-icon-plus mr-2"></i>添加</NButton>
        </div>
        <div v-for="(link, index) in links" :key="link">
          <input class="nv-input mb-3" v-model="link.title" placeholder="标题" />
          <input class="nv-input" v-model="link.url" placeholder="http://" />
          <div class="mb-3 text-right">
            <NButton text type="error" @click="handleRemove(index)"><i class="el-icon-delete mr-2"></i>删除</NButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'scottstudio-download-settings',
  components: {
    nvTooltip: nv.components.tooltip,
    NButton: nv.components.button,
    NSwitch: nv.components.switch,
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
  methods: {
    handleToggleAlign(position) {
      this.align = this.align == position ? '' : position;
    },
    handleAddLink() {
      this.links.unshift({
        title: '',
        url: '',
      });
    },
    handleRemove(index) {
      this.links.splice(index, 1);
    },
    handleToggleNeedReply() {
      this.need_reply = !this.need_reply;
    },
  },
};
</script>
<style scoped>
.links {
  max-height: 260px;
  overflow: auto;
  padding: 0;
}
</style>
<style>
.nv-inner-blocks .scottstudio-download-settings .need_reply {
  display: none;
}
</style>
