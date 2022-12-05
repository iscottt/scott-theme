<template>
	<div
	v-if="$store.state.card_type=='card'"
	class="post-item card flex flex-col items-center">
		<router-link :to="`/${post.slug}`" class="img" :style="{backgroundImage: `url(${post.thumbnail})`}">
			<span class="date"><svg-icon name="clock" height="14" /> {{moment(post.modified_time).format(`${$store.state.theme_settings.nv_date_format || 'l'}`)}}</span>
		</router-link>
		<div class="title">{{post.title}}</div>
		<div class="metas">
			<span class="likes"><svg-icon name="heart" height="14" />{{post.likes}}</span>
			<span class="comments"><svg-icon name="comment-dots" height="14" />{{post.comments}}</span>
			<span class="views"><svg-icon name="eye" height="14" />{{post.views}}</span>
		</div>
		<div class="tags">
			<router-link v-for="tag in post.tags" :class="[`color-${random(tag)}`]" :to="`/tag/${tag}`">{{tag}}</router-link>
			<span v-if="!post.tags.length" class="color-0">无标签</span>
		</div>
		<router-link :to="`/${post.slug}`" class="go" >阅读全文</router-link>
	</div>
	<div
	v-else-if="$store.state.card_type=='list'"
	class="post-item list flex g-10"
	>
		<router-link :to="`/${post.slug}`" class="img flex-shrink-0" :style="{backgroundImage: `url(${post.thumbnail})`}"></router-link>
		<div class="infos flex flex-col justify-center">
			<router-link :to="`/${post.slug}`" class="title">{{post.title}}</router-link>
			<div class="metas">
				<span class="likes"><svg-icon name="heart" height="14" />{{post.likes}}</span>
				<span class="comments"><svg-icon name="comment-dots" height="14" />{{post.comments}}</span>
				<span class="views"><svg-icon name="eye" height="14" />{{post.views}}</span>
			</div>
			<div class="tags">
				<router-link v-for="tag in post.tags" :class="[`color-${random(tag)}`]" :to="`/tag/${tag}`">{{tag}}</router-link>
				<span v-if="!post.tags.length" class="color-0">无标签</span>
			</div>
			<div class="date"><svg-icon name="clock" height="13" /> {{moment(post.modified_time).format(`${$store.state.theme_settings.nv_date_format || 'l'}`)}}</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import {pdColor} from "/@/assets/pandaChromatology";
import moment from "moment"
import md5 from "blueimp-md5"
export default defineComponent({
	props: {
		post: {
			type: Object,
			/*default(){return {
				"id": 0,
				"title": "",
				"slug": "",
				"modified_time": 0,
				"views": 0,
				"likes": 0,
				"comments": 0,
				"thumbnail": "",
				"categories": ""
			}}*/
		}
	},
	data(){return {
		moment,
		darkerColor: "transparent",
		lighterColor: "transparent",
		shadowColor: "transparent",
	}},
	mounted() {
		this.$get_img_color(this.post.thumbnail)
		.then((data)=>{
			var darkerColor = new pdColor(data).mappingL([20,70]);
			this.darkerColor = darkerColor.getString();
			this.shadowColor = darkerColor.setA(.5).getString('rgba');
			this.lighterColor = new pdColor(data).mappingL([45,90]).getString();
		})
		.catch(()=>{

		})
	},
	methods: {
		random(str) {
			var char = md5(str)[0];
			if (['1','5','9','c'].includes(char)) {
				return 1;
			}
			if (['2','6','0','d'].includes(char)) {
				return 2;
			}
			if (['3','7','a','e'].includes(char)) {
				return 3;
			}
			if (['4','8','b','f'].includes(char)) {
				return 4;
			}
		}
	}
});
</script>

<style lang='less'>
.post-item {
	.metas {
		font-size: 14px;
		display: flex;
		transform-origin: left;
		transition: .25s;
		@media (max-width: 768px) {
			column-gap: .5em;
		}
		span {
			display: flex;
			column-gap: .25em;
			justify-content: center;
			align-items: center;
		}
		.likes {
			color: var(--error-color);
		}
		.comments {
			color: var(--primary-color);
		}
		.views {
			color: var(--success-color);
		}
	}
	.tags {
		white-space: nowrap;
		overflow: hidden;
		mask-image: linear-gradient(90deg,#000 calc(100% - 1em),transparent calc(100% - .2em));
		transition: .25s;
		span,a {
			text-decoration: none;
			font-size: 13px;
			display: inline;
			margin-right: .5em;
			padding: .2em .5em;
			border-radius: 9em;
		}
		.color-0 {
			@color: #8492A6;
			color: @color;
			background: fade(@color, 15%);
		}
		.color-1 {
			@color: #20a0ff;
			color: @color;
			background: fade(@color, 15%);
		}
		.color-2 {
			@color: #39c408;
			color: @color;
			background: fade(@color, 15%);
		}
		.color-3 {
			@color: #ff8400;
			color: @color;
			background: fade(@color, 15%);
		}
		.color-4 {
			@color: #837adc;
			color: @color;
			background: fade(@color, 15%);
		}
	}
	&.card {
		border: 1px solid var(--white-default);
		border-radius: 1em;
		// background: linear-gradient(var(--white-opacity-6) calc(100% - 1.5em), transparent);
		background: linear-gradient(hsl(213,40%,97%) calc(100% - 1.5em),hsl(213,40%,93%));
		box-shadow: 0 1em 1em rgba(31,45,61,.15);
		text-align: center;
		text-shadow: 0 1px var(--white-default);
		transition: .25s;
		.img {
			position: relative;
			display: block;
			margin-top: -.625em;
			width: calc(100% - .75em);
			padding-top: calc(89.45% - .67em);
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
			border-radius: .75em;
			// box-shadow: 0 0 0 1px var(--white-opacity-5);
			box-shadow: 1px 0 var(--white-opacity-5),-1px 0 var(--white-opacity-5),0 1px var(--white-opacity-5);
			transform-style: preserve-3d;
			transform: translateZ(0);
			transition: .25s;
			&:before {
				content: "";
				position: absolute;
				top: .75em;
				left: .4em;
				right: .4em;
				bottom: -.75em;
				background-image: inherit;
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;
				border-radius: .75em;
				opacity: .6;
				filter: blur(1em);
				transform-style: preserve-3d;
				transform: translateZ(-1px);
				transition: .25s;
			}
			.date {
				display: flex;
				background: rgba(0,0,0,.2);
				border-radius: 0 0 .75em .75em;
				height: 3em;
				justify-content: center;
				column-gap: .25em;
				font-size: 14px;
				align-items: center;
				text-decoration: none;
				color: #fff;
				text-shadow: 0 3px 3px rgba(0,0,0,.3);
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				opacity: 0;
				transition: .25s;
			}
		}
		.title {
			// color: var(--text-color);
			padding: 0 .5em;
			margin: 1em 0 .2em;
			white-space: nowrap;
			overflow: hidden;
			max-width: 100%;
			text-overflow: ellipsis;
			text-shadow: 0 1px var(--white-default); 
			transition: .25s;
			@media (max-width: 768px) {
				font-size: 14px;
			}
			@media (min-width: 768px) {
				font-size: 17px;
			}
		}
		.metas {
			column-gap: 1.2em;
			justify-content: center;
		}
		.tags {
			width: 100%;
			transform-origin: right;
			padding: 0 .5em;
			opacity: 0;
			visibility: hidden;
			transform: scale(.8);
			margin-top: -1em;
		}
		.go {
			min-width: 50%;
			background: linear-gradient(90deg,v-bind(darkerColor),v-bind(lighterColor));
			box-shadow: 0 .5em 1.2em v-bind(shadowColor);
			font-size: 14px;
			margin: .3em 0 1.5em;
			padding: .45em 1.5em;
			border-radius: 9em;
			text-decoration: none;
			color: #fff;
			text-shadow: 0 2px 3px v-bind(shadowColor);
			transition: .25s;
			&:hover {
				min-width: 60%;
			}
		}

		&:hover {
			transform: translateY(1em);
			box-shadow: 0 .2em .4em rgba(31,45,61,.2);
			.img {
				transform: translateY(1em) translateZ(0);
				&:before {
					opacity: 0;
				}
				.date {
					opacity: 1;
				}
			}
			.title {
				transform: translateY(.5em);
			}
			.metas {
				transform: translateY(.8em) scale(.8);
				opacity: 0;
			}
			.tags {
				transform: scale(1);
				opacity: 1;
				visibility: visible;
			}
			.go {
				transform: translateY(.3em);
			}
		}
	}
	&.list {
		overflow: hidden;
		border: 1px solid var(--white-default);
		border-radius: 1em;
		background: linear-gradient(var(--white-opacity-6),transparent);
		box-shadow: 0 .5em .5em rgba(31,45,61,.1);
		text-shadow: 0 1px var(--white-default);
		padding: .125em;
		transition: .25s;
		.img {
			display: block;
			width: 5.75em;
			height: 5.75em;
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
			border-radius: .825em;
		}
		.infos {
			width: calc(100% - 6.75em);
		}
		.title {
			padding-right: .3em;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			text-shadow: 0 -1px var(--white-default), 0 2px 2px var(--gray-opacity-3); 
			text-decoration: none;
			color: var(--text-color-2);
			font-size: 17px;
			margin: em 0 0;
			transition: .25s;
			&:hover {
				color: var(--primary-color);
				text-shadow: 0 -1px var(--white-default), 0 2px 2px var(--primary-opacity-3); 
			}
		}
		.date {
			font-size: 14px;
			color:var(--text-color-4);
			margin-top: -.125em;
		}
		.metas {
			column-gap: .8em;
		}
		.tags {
			margin-top: -1.5em;
			opacity: 0;
			visibility: hidden;
			transform: scale(1.2);
			transform-origin: left;
		}
		&:hover {
			transform: translateY(.5em);
			box-shadow: 0 .15em .2em rgba(31,45,61,.15);
			.metas {
				transform: scale(.8);
				opacity: 0;
			}
			.tags {
				transform: scale(1);
				opacity: 1;
				visibility: visible;
			}
		}
	}
}

</style>