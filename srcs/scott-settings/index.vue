<template>
  <div class="nv-admin-page">
    <div class="page-title">
      <span>{{ $route.meta.title }}</span>
    </div>
    <div class="page-content flex-grow">
      <pd-form :config="formConfig" :data="formData" @submit="handleSubmit">
        <template v-slot:rewardLinks>
          <nvSettingTable add-label="添加图片" :columns="rewardLinksColumns" v-model:data="formData.scott_reward_links">
            <template v-slot:column-image="row">
              <nv-thumbnail-selector :height="40" v-model:value="formData.scott_reward_links[row.$index].image" />
            </template>
            <template v-slot:column-text="row">
              <n-input v-model:value="formData.scott_reward_links[row.$index].text" />
            </template>
            <template v-slot:column-url="row">
              <n-input placeholder="http(s)://" v-model:value="formData.scott_reward_links[row.$index].url" />
            </template>
          </nvSettingTable>
        </template>
        <template v-slot:personalLinks>
          <nvSettingTable add-label="添加链接" :columns="personalLinksColumns" v-model:data="formData.scott_personal_links">
            <template v-slot:column-image="row">
              <nv-thumbnail-selector :height="40" v-model:value="formData.scott_personal_links[row.$index].image" />
            </template>
            <template v-slot:column-text="row">
              <n-input v-model:value="formData.scott_personal_links[row.$index].text" />
            </template>
            <template v-slot:column-url="row">
              <n-input placeholder="http(s)://" v-model:value="formData.scott_personal_links[row.$index].url" />
            </template>
          </nvSettingTable>
        </template>
      </pd-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'niRvana-theme-settings',
  data() {
    return {
      formConfig: {
        form: {
          labelWidth: '7em',
          size: 'large',
          submitText: '保存设置',
        },
        items: [
          {
            label: '打赏图片设置',
            type: 'FormSubtitle',
          },
          {
            custom_type: 'rewardLinks',
            prop: 'scott_reward_links',
          },
          {
            label: '个人外链设置',
            type: 'FormSubtitle',
          },
          {
            custom_type: 'personalLinks',
            prop: 'scott_personal_links',
          },
          {
            label: '卡片样式设置',
            type: 'Select',
            prop: 'scott_card_theme',
            config: {
              clearable: true,
              style: 'width: 200px',
              defaultValue: 1,
              options: [
                { value: 1, label: '样式一' },
                { value: 2, label: '样式二' },
              ],
            },
          },
        ],
      },
      formData: {
        scott_reward_links: [],
        scott_personal_links: [],
      },
      rewardLinksColumns: [
        { title: '图片', key: 'image' },
        { title: '文本', key: 'text' },
        { title: '链接地址', key: 'url' },
      ],
      personalLinksColumns: [
        { title: '文本', key: 'text' },
        { title: '链接地址', key: 'url' },
      ],
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      //从formConfig里面读出需要从后端得到的options数据
      var names = [];
      this.formConfig.items.forEach((item) => {
        var prop = item.prop;
        if (prop) {
          names.push(prop);
        }
      });
      $fullLoading.start();
      this.$axios({
        method: 'post',
        url: this.$API + '/nv/get-options',
        data: {
          names,
        },
      })
        .then(({ data }) => {
          if (!this.$isSuccess(data)) {
            return;
          }
          this.formData = data;
          this.$nextTick(() => {
            this.formDataChanged = false;
          });
        })
        .catch((error) => {
          $message.warning('读取设置请求失败');
          console.log(error);
        })
        .finally(() => {
          $fullLoading.end();
        });
    },
    handleSubmit() {
      $fullLoading.start();
      this.$axios({
        method: 'post',
        url: this.$API + '/nv/set-options',
        data: this.formData,
      })
        .then(({ data }) => {
          if (!this.$isSuccess(data)) {
            return;
          }
          $message.success('保存成功');
          this.formDataChanged = false;
        })
        .catch((error) => {
          $message.warning('保存设置请求失败');
          console.log(error);
        })
        .finally(() => {
          $fullLoading.end();
        });
    },
  },
};
</script>

<style scoped></style>
