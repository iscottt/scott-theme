<template>
	<div class="share-modal">
		<NTooltip v-if="liked">
			<template #trigger>
				<button class="likes" @click="handleDuplicateLikeClick"><svg-icon name='heart-s' height=18 /></button>
			</template>
			已点赞
		</NTooltip>
		<NTooltip v-else>
			<template #trigger>
				<button class="likes -o" @click.once="handleLikeClick"><svg-icon name='heart' height=18 /></button>
			</template>
			点赞
		</NTooltip>
		{{post.metas.likes || 0}}
	</div>
</template>

<script>
import { defineComponent } from "vue";
import { NTooltip } from "naive-ui";
export default defineComponent({
	name: 'share-modal',
	inject: ['post'],
	components: {
		NTooltip,
	},
	data(){return {
		liked: false,
	}},
	watch: {
		post() {
			this.parseLiked();
		}
	},
	methods:{
		parseLiked() {
			var liked = this.getLikedPosts();
			if (liked.includes(this.post.id)) {
				this.liked = true;
			}
		},
		handleDuplicateLikeClick() {
			$message.warning('您已经点过赞了')
		},
		handleLikeClick(){
			if (!this.post.id) {return;}
			if (this.liked) {this.handleDuplicateLikeClick();return;}
			var message = $message.info('正在处理点赞...')
			this.$axios({
				method: 'post',
				url: this.$API + '/nirvana/post-like',
				responseType: 'json',
				data:{
					id: this.post.id
				},
			})
			.then(({data})=>{
				this.$emit('likes-change',data);
				$message.success('点赞成功！')
				this.liked = true;
				this.setLikedPosts();
			})
			.catch((error)=>{
				$message.warning('点赞失败，请重试！')
			})
			.finally(()=>{
				message.destroy();
			})
		},
		getLikedPosts() {
			var liked = this.$localStorage('liked');
			return Array.isArray(liked) ? liked : [];
		},
		setLikedPosts() {
			var liked = this.getLikedPosts();
			var current_post_id = this.post.id;
			if (!liked.includes(current_post_id)) {
				liked.push(current_post_id);
				this.$localStorage('liked',liked);
			}
		}
	},
})
</script>
<style lang="less">
.share-modal {
	height: 5em;
	background: var(--gray-9);
	margin:  3em -3em -2em -3em;
	border-radius: 0 0 .8em .8em;
	border-top: 1px solid var(--border-color-2);
	box-shadow: 0 1px var(--white-opacity-8) inset;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 3em;
	@media (max-width: 577px) {
		padding: 0 1em;
		margin: 2em -1em -1em;
		border-radius: 0;
		box-shadow: 0 1px var(--white-opacity-8) inset, 0 -1px var(--gray-opacity-1) inset;
	}
	button {
		width: 3em;
		height: 3em;
		padding: 0;
		border-radius: 50%;
		border: none;
		margin-right: .75em;
		color: #fff;
		&.likes {
			background: radial-gradient(circle farthest-corner at 75% 25%,#ff9600 0,#ff5349 100%);
			box-shadow: 0 0 0 25px rgba(255,83,73,0),0 0 0 20px rgba(255,83,73,0),0 0 0 0 transparent inset,0 10px 10px -2px rgba(255,83,73,.6);
			&.-o {
				box-shadow: 0 0 0 -1px rgba(255,83,73,.6),0 0 0 -15px rgba(255,83,73,.6),0 0 0 1px rgba(255,83,73,.6) inset;
				background: transparent;
				color: #ff5349;
			}
		}
	}
}
</style>