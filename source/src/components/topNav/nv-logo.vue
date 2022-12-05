<template>
	<router-link to="/">
		<span class="logo-svg-wrapper" v-if="is_SVG()" v-html="svg"></span>
		<img class="logo-image" v-else :src="$store.state.theme_settings.niRvana_logo_url">
	</router-link>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
	name: 'nv-logo',
	data(){return {
		svg: "",
		is_svg_flag: false,
	}},
	methods: {
		is_SVG() {
			if (this.is_svg_flag) {return true;}
			var path = this.$store.state.theme_settings.niRvana_logo_url || '';
			var is_svg = path.toLowerCase().endsWith('.svg');
			if (is_svg) {
				this.is_svg_flag = true;
				this.get_SVG_dom();
			}
			return is_svg;
		},
		get_SVG_dom() {
			this.$axios({
				method: 'get',
				url: this.$store.state.theme_settings.niRvana_logo_url,
			})
			.then(({data})=>{
				this.svg = data;
			})
			.catch((error)=>{
				
			})
			.finally(()=>{
				
			})
		}
	},
})
</script>

<style lang='less' scoped>
a {
	color: inherit;
	height: inherit;
}
img {
	height: inherit;
}
.logo-svg-wrapper {
	height: inherit;
	color: inherit;
}
</style>
<style>
.logo-svg-wrapper svg {
	height: inherit;
	color: inherit;
}
</style>