<template>
	<ul class="main-pagination">
		<li
		class="anchor"
		ref="anchor"
		:style="{
			transform: `translateX(${targetLeft ? targetLeft : activeLeft}px)`,
			width: (targetWidth ? targetWidth : activeWidth) +'px',
			transitionDuration: targetLeft != null ? '.3s' : '0s'
		}"
		></li>

		<!-- <n-tooltip v-if="prePage">
			<template #trigger>
				<li>
					《
				</li>
			</template>
			上一页
		</n-tooltip> -->

		<n-tooltip v-if="btn1">
			<template #trigger>
				<li
				class="first"
				@mouseenter="handleMouseenter"
				@mouseleave="handleMouseleave">
					<router-link :to="handleRouterTo(1)">1<svg-icon name="angles-left" height="12" /></router-link>
				</li>
			</template>
			第一页
		</n-tooltip>

		<!-- <li v-if="prePoint">
			...
		</li> -->

		<li
		v-if="btn2"
		@mouseenter="handleMouseenter"
		@mouseleave="handleMouseleave">
			<router-link :to="handleRouterTo($store.state.current_page-2)">{{$store.state.current_page-2}}</router-link>
			
		</li>

		<li
		v-if="btn3"
		@mouseenter="handleMouseenter"
		@mouseleave="handleMouseleave">
			<router-link :to="handleRouterTo($store.state.current_page-1)">{{$store.state.current_page-1}}</router-link>
		</li>

		<li
		class="active"
		ref="active"
		@mouseenter="handleMouseenter"
		@mouseleave="handleMouseleave">
			<a>{{$store.state.current_page}}</a>
		</li>

		<li
		v-if="btn5"
		@mouseenter="handleMouseenter"
		@mouseleave="handleMouseleave">
			<router-link :to="handleRouterTo($store.state.current_page+1)">{{$store.state.current_page+1}}</router-link>
		</li>

		<li
		v-if="btn6"
		@mouseenter="handleMouseenter"
		@mouseleave="handleMouseleave">
			<router-link :to="handleRouterTo($store.state.current_page+2)">{{$store.state.current_page+2}}</router-link>
		</li>

		<!-- <li v-if="sufPoint">
			...
		</li> -->

		<n-tooltip v-if="btn7">
			<template #trigger>
				<li
				class="last"
				@mouseenter="handleMouseenter"
				@mouseleave="handleMouseleave">
					<router-link :to="handleRouterTo(pageNum)"><svg-icon name="angles-right" height="12" />{{pageNum}}</router-link>
				</li>
			</template>
			最后一页
		</n-tooltip>

		<!-- <n-tooltip v-if="sufPage">
			<template #trigger>
				<li>
					》
				</li>
			</template>
			下一页
		</n-tooltip> -->
	</ul>
</template>

<script>
import {NTooltip} from 'naive-ui';
import { defineComponent } from "vue";
export default defineComponent({
	name: 'main-pagination',
	components: {
		NTooltip
	},
	computed: {
		pageNum() {
			return Math.ceil(this.$store.state.total/this.$store.state.posts_per_page) || 0;
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
		/*'$store.state.total'(){
			this.parseShow();
			this.parseActive();
		},
		'$store.state.posts_per_page'(){
			this.parseShow();
			this.parseActive();
		},
		'$store.state.current_page'(){
			this.parseShow();
			this.parseActive();
		}*/
	},
	mounted() {
		this.parseShow();
		this.$nextTick(()=>{
			this.parseActive();
		})
	},
	methods: {
		parseShow() {
			var currentPage = this.$store.state.current_page;
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
		parseActive() {
			var activeLi = this.$refs.active;
	        this.activeLeft = activeLi.offsetLeft;
			this.activeWidth = activeLi.clientWidth;
		},
		handleMouseenter(event) {
			var target = event.target;
			this.targetLeft = target.offsetLeft;
			this.targetWidth = target.clientWidth;
		},
		handleMouseleave(event) {
			if (this.activeWidth) {
				this.targetLeft = 0;
			}
			this.targetWidth = 0;
		},
		handleRouterTo(page_index) {
			if (this.$route.params.current_page) {
				return {
					name: this.$route.name,
					params: {
						current_page: page_index
					}
				}
			} else {
				return {
					name: `${this.$route.name}-paged`,
					params: {
						current_page: page_index
					}
				}
			}
		}
	}
})
</script>

<style lang='less' scoped>
ul {
	margin: 0;
	padding: 2px;
	display: grid;
	grid-auto-flow: column;
	justify-content: start;
	align-items: center;
	position: relative;
	background: var(--gray-6);
	box-shadow: 0 8px 10px rgba(31,45,61,.1) inset,0 0 1px rgba(31,45,61,.1) inset,0 1px var(--white-opacity-5);
	border-radius: 9em;
	&:hover {
		li {
			color: var(--text-color-3);
			&:hover {
				color: var(--primary-color);
			}
		}
	}
}
li {
	list-style: none;
	height: 40px;
	min-width: 40px;
	border-radius: 9em;
	cursor: pointer;
	z-index: 1;
	color: var(--gray-4);
	position: relative;
	display: flex;
	transition: color .3s;
	color: var(--text-color-3);
	>a {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 10px;
		text-decoration: none;
		color: inherit;
		text-shadow: 0 1px var(--white-opacity-6);
		column-gap: 1em;
		transition: .3s;
	}
	&.first {
		a {
			padding-left: 1em;
		}
	}
	&.last {
		a {
			padding-right: 1em;
		}
	}
	&.anchor {
		position: absolute;
		background: linear-gradient(var(--white-default),var(--gray-7));
		box-shadow: 0 6px 6px rgba(0,0,0,.05),0 10px 10px rgba(0,0,0,.15),0 -1px 2px var(--white-default) inset;
		transition: .3s;
		z-index: 0;
	}
	&.active {
		color: var(--primary-color);
	}
	&:not(.anchor):after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: radial-gradient(closest-side at center, rgba(255,255,255,.55),transparent);
		opacity: 0;
		transform: scale(.4);
		z-index: -2;
		transition: .25s;
	}
	&:not(.anchor):hover:after {
		opacity: 1;
		transform: scale(.8);
	}
}

</style>
<style lang="less">
.main-pagination {
	.svg-icon path {
		filter: drop-shadow(0 80px 0 var(--white-opacity-6));
	}
}
</style>