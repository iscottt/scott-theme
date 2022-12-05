<template>
	<div class="widget toc" v-if="titles.length > 0">
		<widgetTitle>文章目录</widgetTitle>
		<ul>
			<template v-for="block in titles">
				<li
				:class="{active: activeIds.includes(block.id)}"
				:data-header-level="block.data.level"
				v-if="block.data.level <= 3"
				>
					<a @click="handleTitleClick(block.id)">{{block.data.text}}</a>
				</li>
			</template>
		</ul>
	</div>
</template>

<script>
import { defineComponent,computed } from "vue";
import widgetTitle from "./widget-title.vue"
export default defineComponent({
	name: 'toc',
	components: {
		widgetTitle
	},
	props: {
		post: Object,
		lastHidedHeaderId: String,
	},
	computed: {
		titles() {
			return this.post.content.blocks.filter(
				item=>item.type=='header'
			)
		},
		activeIds() {
			var last = this.lastHidedHeaderId;
			var result = [];

			var getPrevId = (currentId) => {
				if (currentId) {
					var currentLevel = 0;
					var currentBlock = this.titles.filter(block=>block.id == currentId);
					if (currentBlock.length) {
						currentLevel = currentBlock[0].data.level;
					}
					var lastLevel = currentLevel - 1;
					if (lastLevel > 0) {
						// 从当前的block反向找回去
						var cuttedTitles = this.titles.slice(0,this.titles.indexOf(currentBlock[0]));
						for (var i = cuttedTitles.length - 1; i >= 0; i--) {
							var block = cuttedTitles[i];
							if (block.data.level == lastLevel) {
								return block.id;
							}
						}
					}
				}
				return "";
			}

			while(last) {
				result.push(last);
				last = getPrevId(last);
			}

			return result;
		}
	},
	methods: {
		handleTitleClick(id) {
			window.scrollTo({
				top: document.querySelector(`[data-block-id="${id}"]`).offsetTop - 56,
				left: 0,
				behavior: 'smooth'
			})
		}
	},
})
</script>
<style lang="less">
.toc > ul {
	margin-top: 15px;
	margin-left: 15px;
	padding: 8px 0;
	border-left: 1px solid var(--border-color);
	box-shadow: 1px 0 var(--white-opacity-7) inset;
	position: relative;
}
.toc > ul::before, .toc > ul::after {
	content: "";
	position: absolute;
	width: 9px;
	height: 9px;
	background: linear-gradient(#98a3b3, #d8e0ea);
	box-shadow: 0 0 0 1px #a4b2c6 inset, 0 0 0 2px #d8e0ea inset, 0 4px 3px rgba(166, 180, 199, .4);
	left: -5px;
	border-radius: 50%;
}
.toc > ul::before {
	top: 0;
}
.toc > ul::after {
	bottom: 0;
}
.toc > ul > li {
	display: block;
	list-style: none;
}
.toc > ul > li a {
	cursor: pointer;
	position: relative;
	color: var(--text-color-3);
	background: var(--white-default);
	line-height: 20px;
	border-radius: 8px;
	display: inline-block;
	padding: 8px 15px 8px 12px;
	text-decoration: none;
	margin: 8px 0 8px 25px;
	max-width: calc(100% - 34px);
	box-shadow: 0 13px 15px rgba(0, 0, 0, .1);
	transition: box-shadow .25s,transform .25s, color .1s;
}
.toc > ul > li a::before {
	content: "";
	position: absolute;
	border-right: 13px solid #fff;
	border-top: 14.5px solid transparent;
	border-bottom: 14.5px solid transparent;
	top: 4px;
	left: -12px;
}
.toc > ul > li a::after {
	content: "";
	position: absolute;
	width: 7px;
	height: 7px;
	border-radius: 50%;
	background: #a6b4c7;
	left: -29px;
	top: 15px;
	box-shadow: 0 0 0 1px #cad1db inset, 0 0 0 2px var(--bg-color) inset;
	transition: .25s;
}
.toc > ul > li a:hover {
	transform: translateY(6px);
	box-shadow: 0 3px 3px rgba(0, 0, 0, .15);
}

.toc > ul > li.active a {
	color: #fff;
	text-shadow: 0 2px 2px var(--primary-color),0 3px 3px var(--primary-color);
	background: linear-gradient(100deg, var(--primary-color) 10%, var(--analogous-color));
	box-shadow: 0 13px 15px var(--primary-opacity-3);
}
.toc > ul > li.active a::before {
	border-right-color: var(--primary-color);
}
.toc > ul > li.active a:hover {
	transform: translateY(6px);
	box-shadow: 0 3px 3px var(--primary-opacity-4);
}
.toc > ul > li.active a::after {
	background: var(--primary-color);
	box-shadow: 0 0 0 1px var(--primary-color) inset, 0 0 0 2px var(--bg-color) inset;
}

.toc > ul > li[data-header-level='3'] a::before {
	content: none;
}

.toc > ul > li[data-header-level='3'] a::after {
	opacity: 0;
	transform: scale(0);
}
.toc > ul > li.active[data-header-level='3'] a::after {
	opacity: 1;
	transform: scale(1);
}
</style>