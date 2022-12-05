<template>
	<div
	class="pandastudio-gallery"
	:class="{
		'align-left':align=='left',
		'align-center':align=='center',
		'align-right':align=='right',
	}"
	v-if='show'
	>
		<div class="image" :style="{backgroundImage:`url(${image.thumbnail || image.original})`}" v-for="(image, index) in images">
			<div class="remove" @click="handleRemove(index)"><i class="el-icon-close"></i></div>
		</div>
		<div class="image add_image" @click="handleSelectImages">
			<i class="el-icon-plus add_icon"></i>
		</div>
	</div>
</template>
<script>
export default {
	name: 'pandastudio-gallery-block',
	components:{
	},
	data(){return {
		images:[],
		style: 1,
		align: '',
		show: true,
	}},
	mounted() {
		// 加载默认数据
		nv.block.loadDefaultData.bind(this)();
	},
	methods: {
		handleSelectImages() {
			nv.block.mediaSelector({
				multiple: true,
				callback:(images) =>{
					this.show = false;
					var results = [];
					images.forEach(image=>{
						if (image.isImage) {
							results.push({
								thumbnail: image.urls.thumbnail,
								original: image.urls.original,
							})
						}
					})
					this.images = this.images.concat(results);
					// 需要调用一次保存，否则在inner-blocks里面异步的数据会丢失
					this.$emit('forceUpdate');

					this.$nextTick(()=>{
						this.show = true;
					})
				}
			})
		},
		handleRemove(index) {
			this.images.splice(index,1)
		},
	}
}
</script>
<style scoped>
.pandastudio-gallery {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}
.pandastudio-gallery.align-left {
	justify-content: flex-start;
}
.pandastudio-gallery.align-center {
	justify-content: center;
}
.pandastudio-gallery.align-right {
	justify-content: flex-end;
}
i {
	font-style: normal !important;
}
i.add_icon {
	font-size: 32px;
}
.image {
	width: 140px;
	height: 140px;
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
	transition: .25s;
}
.image.add_image {
	box-shadow: 0 0 0 1px var(--border-color);
	cursor: pointer;
}
.image:hover {
	background-color: var(--primary-opacity-1);
	border-color: var(--primary-color);
	box-shadow: 0 0 0 1px var(--primary-color),0 0 0 3px var(--primary-opacity-2);
	color: var(--primary-color);
}
.remove {
	position: absolute;
	z-index: 1;
	top: -8px;
	right: -8px;
	width: 20px;
	height: 20px;
	line-height: 20px;
	text-align: center;
	background: radial-gradient(at top left,#FFCB88,#FF4949);
	box-shadow: 4px 4px 4px #ff505066;
	border-radius: 50%;
	color: #fff;
	opacity: 0;
	transform: scale(.75);
	cursor: pointer;
	transition: .25s;
}
.image:hover .remove {
	opacity: 1;
	transform: scale(1.2);
}
.image:hover .remove:hover {
	transform: scale(1.5);
}
</style>
