<template>
	<div class="widget most-comments" v-if="$store.state.most_comments_posts.length">
		<widgetTitle>热评文章</widgetTitle>
		<div class="widget-post-list">
			<div class="post flex g-8" v-for="post in $store.state.most_comments_posts">
				<router-link :to="`/${post.slug}`" class="img flex-shrink-0" :style="{backgroundImage: `url(${post.thumbnail})`}"></router-link>
				<div class="infos flex flex-col justify-center">
					<router-link :to="`/${post.slug}`" class="title">{{post.title}}</router-link>
					<div class="metas">
						<span class="comments"><svg-icon name="comment-dots" height="14" />{{post.comments}}</span>
						<span class="likes"><svg-icon name="heart" height="14" />{{post.likes}}</span>
						<span class="views"><svg-icon name="eye" height="14" />{{post.views}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent,computed } from "vue";
import widgetTitle from "./widget-title.vue"
export default defineComponent({
	name: 'most-comments',
	components: {
		widgetTitle
	},
	props: {
		post: Object,
	},
	mounted() {
		if (!this.$store.state.most_comments_posts.length) {
			this.$nextTick(()=>{
				this.requestData();
			})
		}
	},
	methods: {
		requestData() {
			this.$axios({
				method: 'post',
				url: this.$API + '/nirvana/most-comments',
			})
			.then(({data})=>{
				this.$store.state.most_comments_posts = data;
			})
			.catch((error)=>{
				
			})
			.finally(()=>{
			})
		}
	}
})
</script>
<style lang="less">
// 样式在 most-likes 里面
</style>