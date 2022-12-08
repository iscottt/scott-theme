<template>
  <div class="nv-admin-page">
    <div class="page-title">
      <span>{{ $route.meta.title }}</span>
    </div>
    <div class="page-content flex-grow">
      <pd-form :config="formConfig" :data="formData" @submit="handleSubmit">
        <template v-slot:footerLinks>
          <nvSettingTable add-label="添加链接" :columns="footerLinksColumns" v-model:data="formData.niRvana_footer_links">
            <template v-slot:column-image="row">
              <nv-thumbnail-selector :height="40" v-model:value="formData.niRvana_footer_links[row.$index].image" />
            </template>
            <template v-slot:column-text="row">
              <n-input v-model:value="formData.niRvana_footer_links[row.$index].text" />
            </template>
            <template v-slot:column-url="row">
              <n-input placeholder="http(s)://" v-model:value="formData.niRvana_footer_links[row.$index].url" />
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
            label: '打赏设置',
            type: 'FormSubtitle',
          },
          {
            label: '打赏图片',
            custom_type: 'footerLinks',
            prop: 'niRvana_footer_links',
          },
        ],
      },
      formData: {
        niRvana_footer_links: [],
      },
      footerLinksColumns: [
        { title: '图片', key: 'image' },
        { title: '文本', key: 'text' },
      ],
    };
  },
  mounted() {
    this.requestData();
    this.requestCategories();
  },
  methods: {
    requestCategories() {
      $fullLoading.start();
      this.$axios({
        method: 'post',
        url: this.$API + '/nv/query-terms',
        data: {
          taxonomy: 'category',
          hide_empty: false,
          terms_per_page: 999,
        },
      })
        .then(({ data }) => {
          if (!this.$isSuccess(data)) {
            return;
          }
          this.all_categories = data.data.map(({ name, id }) => ({
            label: name,
            value: id,
          }));
        })
        .catch((error) => {
          $message.warning('读取分类数据请求失败');
          console.log(error);
        })
        .finally(() => {
          $fullLoading.end();
        });
    },
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
