<template>
	<ul class="comment-pagination flex justify-center" v-if="pageNum > 1">
		<n-tooltip v-if="btn1">
			<template #trigger>
				<li
				class="first"
				@mouseenter="handleMouseenter"
				@mouseleave="handleMouseleave">
					<router-link :to="handleRouterTo(1)" @click="$emit('page-changed',1)">1<svg-icon name="angles-left" height="12" /></router-link>
				</li>
			</template>
			第一页
		</n-tooltip>

		<li
		v-if="btn2"
		@mouseenter="handleMouseenter"
		@mouseleave="handleMouseleave">
			<router-link :to="handleRouterTo(current_page-2)" @click="$emit('page-changed',current_page-2)">{{current_page-2}}</router-link>
			
		</li>

		<li
		v-if="btn3"
		@mouseenter="handleMouseenter"
		@mouseleave="handleMouseleave">
			<router-link :to="handleRouterTo(current_page-1)" @click="$emit('page-changed',current_page-1)">{{current_page-1}}</router-link>
		</li>

		<li
		class="active"
		ref="active"
		@mouseenter="handleMouseenter"
		@mouseleave="handleMouseleave">
			<a>{{current_page}}</a>
		</li>

		<li
		v-if="btn5"
		@mouseenter="handleMouseenter"
		@mouseleave="handleMouseleave">
			<router-link :to="handleRouterTo(current_page+1)" @click="$emit('page-changed',current_page+1)">{{current_page+1}}</router-link>
		</li>

		<li
		v-if="btn6"
		@mouseenter="handleMouseenter"
		@mouseleave="handleMouseleave">
			<router-link :to="handleRouterTo(current_page+2)" @click="$emit('page-changed',current_page+2)">{{current_page+2}}</router-link>
		</li>

		<n-tooltip v-if="btn7">
			<template #trigger>
				<li
				class="last"
				@mouseenter="handleMouseenter"
				@mouseleave="handleMouseleave">
					<router-link :to="handleRouterTo(pageNum)" @click="$emit('page-changed',pageNum)"><svg-icon name="angles-right" height="12" />{{pageNum}}</router-link>
				</li>
			</template>
			最后一页
		</n-tooltip>
	</ul>
</template>

<script>
import {NTooltip} from 'naive-ui';
import { defineComponent } from "vue";
export default defineComponent({
	name: 'comment-pagination',
	components: {
		NTooltip
	},
	props: ['comments_per_page','total','current_page'],
	computed: {
		pageNum() {
			return Math.ceil(this.total/this.comments_per_page) || 0;
		}
	},
	data(){return {
		activeLeft: 0,
		activeWidth: 0,
		targetLeft: null,
		targetWidth: 0,

		prePage: 1,
		btn1: 1,
		prePoint: 1,
		btn2: 1,
		btn3: 1,
		// btn4: 1, // current
		btn5: 1,
		btn6: 1,
		sufPoint: 1,
		btn7: 1,
		sufPage: 1,
	}},
	watch: {
		total() {
			this.parseShow();
		},
		current_page(){
			this.parseShow();
		}
	},
	mounted() {
		this.parseShow();
	},
	methods: {
		parseShow() {
			var currentPage = this.current_page;
			var pageNum = this.pageNum;
			if (!currentPage || !pageNum) {
				return;
			}

			['prePage','btn1','prePoint','btn2','btn3',
			//'btn4',
			'btn5','btn6','sufPoint','btn7','sufPage'].forEach(name=>{
				this[name] = 1;
			})

			//先处理"上一页"和"下一页"的情况
	        if(currentPage==1)  //如果当前页为首页
	        {
	            this.prePage = 0;
	        }

	        if(currentPage==pageNum)    //如果当前页为末页
	        {
	            this.sufPage = 0;
	        }

	        //处理当前页小于等于3的特殊情况
	        if(currentPage<=3){
	        	this.prePoint = 0;
	        	this.btn1 = 0
	        }//当前页是4还需要hide掉第一个省略号按钮（！重要）
	        else if(currentPage==4){
	        	this.prePoint = 0;
	        }
	        //当前页是1还需要hide掉第二第三个按钮
	        if(currentPage==1)
	        {
	        	this.btn2 = 0;
	        	this.btn3 = 0;
	        }
	        //当前页是2则也需要hide掉第二个按钮（此时为-1）
	        else if(currentPage==2)
	        {
	        	this.btn2 = 0;
	        }

	        //最末端的特殊情况处理和最前端是一样的
	        if(currentPage>=pageNum-2){
	        	this.sufPoint = 0;
	        	this.btn7 = 0;
	        }
	        else if(currentPage==pageNum-3){
	        	this.sufPoint = 0;
	        }

	        if(currentPage==pageNum)
	        {
	        	this.btn5 = 0;
	        	this.btn6 = 0;
	        }

	        if(currentPage==pageNum-1)
	        {
	        	this.btn6 = 0;
	        }
		},
		handleRouterTo(page_index) {
			if (this.$route.params.comment_page) {
				return {
					name: this.$route.name,
					params: {
						comment_page: page_index
					}
				}
			} else {
				return {
					name: `${this.$route.name}-comment-paged`,
					params: {
						comment_page: page_index
					}
				}
			}
		}
	}
})
</script>

<style lang="less">
.comment-pagination {
	padding: 0;
	margin: 2em -3em -2em;
	background: var(--gray-9);
	// background: linear-gradient(transparent,var(--gray-9));
	border-top: 1px solid var(--border-color-2);
	box-shadow: 0 1px var(--white-opacity-8) inset;
	border-radius: 0 0 .8em .8em;
	@media (max-width: 577px) {
		margin: 2em -1em -1em;
		border-radius: 0;
	}
	li {
		list-style: none;
		display: flex;
		border-left: 1px solid;
		border-right: 1px solid;
		border-color: transparent;
		a {
			height: 3em;
			min-width: 3em;
			display: flex;
			justify-content: center;
			align-items: center;
			text-decoration: none;
			color: var(--text-color-4);
			text-shadow: 0 1px var(--white-default);
			column-gap: 1.25em;
			transition: .35s;
			&:hover {
				color: var(--primary-color);
			}
		}
		&.active {
			background: linear-gradient(var(--white-default) 20%,transparent);
			border-color: var(--border-color-2);
			box-shadow: 1px 0 var(--white-default) inset,-1px 0 var(--white-default) inset;
			a {
				color: var(--primary-color);
				text-shadow: -1px 0 var(--white-default), 0 2px 2px var(--primary-opacity-4);
			}
		}
	}
	.svg-icon path {
		filter: drop-shadow(0 80px 0 var(--white-default));
	}
}
</style>