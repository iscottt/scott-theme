<template>
	<div class="nv-admin-page">
		<div class="page-title">
			<span>{{$route.meta.title}}</span>
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

				<template v-slot:frontpageCategories>
					<nvSettingTable add-label="添加分类" :columns="frontpageCategoriesColumns" v-model:data="formData.niRvana_frontpage_categories">
						<template v-slot:column-termId="row">
							<n-select
							size="medium"
							v-model:value="formData.niRvana_frontpage_categories[row.$index].termId"
							multiple
							:options="all_categories" />
						</template>
						<template v-slot:column-title="row">
							<n-input size="medium" v-model:value="formData.niRvana_frontpage_categories[row.$index].title" />
						</template>
					</nvSettingTable>
				</template>
			</pd-form>
		</div>
	</div>
</template>

<script>
export default {
	name: "niRvana-theme-settings",
	data(){return{
		formConfig: {
			form: {
				labelWidth: "7em",
				size: 'large',
				submitText: "保存设置",
			},
			items: [
			{
				label: "站点身份", type: "FormSubtitle",
			},{
				label: "站点徽标", type: "ThumbnailUploader", prop: "niRvana_logo_url",
				config: {
					clearable: true,
					width: 140,
					height: 60,
				},
				desc: "显示在页面顶部Logo位置",
			},{
				label: "收藏夹图标", type: "ThumbnailUploader", prop: "niRvana_favicon_32",
				config: {
					clearable: true,
					width: 140,
					height: 60,
				},
				desc: "显示在浏览器标签左上角，请上传32×32像素的png图片",
			},{
				label: "苹果设备图标", type: "ThumbnailUploader", prop: "niRvana_apple_touch_icon",
				config: {
					clearable: true,
					width: 140,
					height: 60,
				},
				desc: "显示在iOS、iPadOS主屏幕，请上传大于144×144像素的png图片",
			},{
				label: "页脚版权", type: "Input", prop: "niRvana_copyright",
				config: {
					placeholder: "请输入...",
					clearable: true,
				},
			},{
				label: "页脚链接", custom_type: "footerLinks", prop: "niRvana_footer_links",
			},{
				label: "博主信息", type: "FormSubtitle",
			},{
				label: "头像", type: "ThumbnailUploader", prop: "niRvana_blogger_avatar_url",
				config: {
					clearable: true,
					width: 140,
					height: 140,
				},
			},{
				label: "昵称", type: "Input", prop: "niRvana_blogger_nickname",
				config: {
					placeholder: "请输入...",
					clearable: true,
				},
			},{
				label: "描述", type: "Input", prop: "niRvana_blogger_description",
				config: {
					placeholder: "请输入...",
					clearable: true,
				},
			},{
				label: "首页设置", type: "FormSubtitle",
			},{
				label: "分类展示", custom_type: "frontpageCategories", prop: "niRvana_frontpage_categories",
			},{
				label: "其它", type: "FormSubtitle",
			},{
				label: "每页显示数量", type: "InputNumber", prop: "niRvana_posts_per_page",
				config: {
					min: 1,
					max: 999,
					step: 1,
					defaultValue: 12
				},
			},{
				label: "虚拟登录", type: "Switch", prop: "niRvana_fake_login",
				desc: "用户使用邮箱登录，可以查看曾经“评论后可见”的内容",
			},{
				label: "自定义head", type: "Input", prop: "niRvana_custom_head",
				desc: "",
				config: {
					type: "textarea",
					placeholder: "可使用style、script等标签实现自定义，如：\n<style>自定义样式<\/style>\n<script>alert(\"自定义脚本\")<\/script>\n\n【注意：务必注意格式，语法错误将导致前台页面显示异常！！】",
					rows: 6
				}
			}]
		},
		formData: {
			niRvana_footer_links: [],
			niRvana_frontpage_categories: []
		},
		footerLinksColumns: [
			{title: '图标', key: 'image'},
			{title: '文本', key: 'text'},
			{title: '链接地址', key: 'url'},
		],
		frontpageCategoriesColumns: [
			{title: '文章分类', key: 'termId'},
			{title: '分类标题', key: 'title'},
		],
		all_categories: [],
	}},
	mounted() {
		this.requestData();
		this.requestCategories();
	},
	methods:{
		requestCategories() {
			$fullLoading.start();
			this.$axios({
				method: 'post',
				url: this.$API + '/nv/query-terms',
				data: {
					taxonomy: 'category',
					hide_empty: false,
					terms_per_page: 999,
				}
			})
			.then(({data})=>{
				if (!this.$isSuccess(data)) {return;}
				this.all_categories = data.data.map(({name,id})=>({
					label: name,
					value: id,
				}))
			})
			.catch((error)=>{
				$message.warning('读取分类数据请求失败');
				console.log(error)
			})
			.finally(()=>{
				$fullLoading.end();
			})
		},
		requestData() {
			//从formConfig里面读出需要从后端得到的options数据
			var names = [];
			this.formConfig.items.forEach(item=>{
				var prop = item.prop;
				if (prop) {
					names.push(prop)
				}
			});
			$fullLoading.start();
			this.$axios({
				method: 'post',
				url: this.$API + '/nv/get-options',
				data: {
					names
				}
			})
			.then(({data})=>{
				if (!this.$isSuccess(data)) {return;}
				this.formData = data;
				this.$nextTick(()=>{
					this.formDataChanged = false;
				})
			})
			.catch((error)=>{
				$message.warning('读取设置请求失败');
				console.log(error)
			})
			.finally(()=>{
				$fullLoading.end();
			})
		},
		handleSubmit() {
			$fullLoading.start();
			this.$axios({
				method: 'post',
				url: this.$API + '/nv/set-options',
				data: this.formData
			})
			.then(({data})=>{
				if (!this.$isSuccess(data)) {return;}
				$message.success('保存成功')
				this.formDataChanged = false;
			})
			.catch((error)=>{
				$message.warning('保存设置请求失败');
				console.log(error)
			})
			.finally(()=>{
				$fullLoading.end();
			})
		}
	}
}
</script>

<style scoped>

</style>