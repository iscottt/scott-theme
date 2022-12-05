<template>
	<div class="slider" :class="{isChanging}" v-touch:swipe.left="handleNext" v-touch:swipe.right="handlePrev">
		<div class="stage">
			<div
			v-for="(slotName,index) in getStageSlotNames()"
			:key="`scene-${index}`"
			:class="['scene', getStageSlotClasses()[index] ]"
			ref="sceneREF"
			>
				<slot :name="slotName"></slot>
			</div>
		</div>
		<div class="controls" v-if="$slots['controls-prev'] || $slots['controls-next']">
			<button @click="handlePrev" v-if="$slots['controls-prev']" class="prev">
				<slot name=controls-prev></slot>
			</button>
			<button @click="handleNext" v-if="$slots['controls-next']" class="next">
				<slot name=controls-next></slot>
			</button>
		</div>
		<div class="anchors" v-if="getAnchorNames().length > 0">
			<div
			:class="{anchor:1,active:index == getRealCurrentIndex()}"
			v-for="(sceneName,index) in getPageSlotNames()"
			:key="`anchor-${index}`"
			@click="jumpTo(index)"
			>
				<slot :name="getCurrentAnchorName(sceneName)" ></slot>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
	name: 'slider',
	props: {
		past: Number,
		future: Number,
		transitionTime: Number,
		jumppingTime: Number,
	},
	data(){
		return {
			// past: 2,
			// future: 2,
			// transitionTime: 250,
			// jumppingTime: 100,
			stageCurrentIndex: null,
			isChanging: false,
		}
	},
	mounted() {
		this.stageCurrentIndex = 0;
		this.$emit('init',{
			prev: this.prev,
			next: this.next,
			jumpTo: this.jumpTo
		})
	},
	methods: {
		getAnchorNames() {
			var anchorNames = [];
			Object.keys(this.$slots).map((item)=> {
				if (item.indexOf('anchor-')==0) {
					anchorNames.push(item)
				}
			});
			return anchorNames;
		},
		getCurrentAnchorName(sceneName) {
			var anchorNames = this.getAnchorNames();
			var testName = `anchor-${sceneName.replace('scene-','')}`;
			return anchorNames.indexOf(testName) > -1 ? testName : `anchor-default`;
		},
		getRealCurrentIndex() {
			var realLength = this.getPageSlotNames().length;
			return this.stageCurrentIndex % realLength;
		},
		getPageSlotNames() {
			var slotNames = [];
			Object.keys(this.$slots).map((item)=> {
				if (item.indexOf('scene-')==0) {
					slotNames.push(item)
				}
			});
			if (slotNames.length == 0) {
				slotNames = ['^_^']
			}
			return slotNames;
		},
		getStageSlotNames() {
			var slotNames = this.getPageSlotNames();
			var stageSlotNames = [...slotNames];
			//判定要循环的次数
			var repeat = Math.ceil( (this.past+this.future+1) / slotNames.length) - 1;
			for (var i = 0; i < repeat; i++) {
				stageSlotNames = [...stageSlotNames,...slotNames]
			}
			return stageSlotNames;
		},
		getStageSlotClasses() {
			var countClasses = this.getStageSlotNames().length;
			var classes = [];
			for (var i = 0; i < countClasses; i++) {
				classes.push('out-of-stage');
			}
			//current
			classes[this.stageCurrentIndex] = 'current';
			//future
			for (var i = 1; i <= this.future; i++) {
				if (this.stageCurrentIndex + i < countClasses) {
					var newIndex = this.stageCurrentIndex + i;
				} else {
					var newIndex = this.stageCurrentIndex + i - countClasses;
				}
				classes[newIndex] = 'future-'+(i-1);
			}
			//pasts
			for (var i = 1; i <= this.past; i++) {
				if (this.stageCurrentIndex - i >= 0) {
					var newIndex = this.stageCurrentIndex - i;
				} else {
					var newIndex = countClasses + this.stageCurrentIndex - i;
				}
				classes[newIndex] = 'past-'+(i-1);
			}
			return classes;
		},
		next() {
			if (this.stageCurrentIndex < this.getStageSlotNames().length - 1) {
				this.stageCurrentIndex ++
			} else {
				this.stageCurrentIndex = 0;
			}			
		},
		prev() {
			if (this.stageCurrentIndex == 0) {
				this.stageCurrentIndex = this.getStageSlotNames().length - 1;
			} else {
				this.stageCurrentIndex --
			}
		},
		jumpTo(index){
			if (index == this.getRealCurrentIndex()) {return;}

			if (this.isChanging) {return;}
			this.isChanging = true;

			var showPageSize = this.getStageSlotNames().length,
				pageSize = this.getPageSlotNames().length,
				currentIndex = this.getRealCurrentIndex();

			//判断Index是否可用
			if (index > pageSize - 1 || index < 0) {return;}

			var length_arr = [];
			//从当前页到指定index，看看最近的index是谁
			//指定的index一共在显示的状态中出现在哪些位置
			var index_show_arr = [];
			for (var i = 0; i < showPageSize/pageSize; i++) {
				index_show_arr.push(i*pageSize + index);
			}
			//计算currentIndex到上述位置每一个的距离，以及正向近还是反向近
			var all_steps = [];
			for (var i = 0; i < index_show_arr.length; i++) {
				var toGoIndex = index_show_arr[i];
				var zx = Math.abs(currentIndex - toGoIndex);
				var fx = showPageSize - zx;
				var min_step = Math.min(zx,fx);
				if (min_step == zx) {
					var towards = currentIndex >= toGoIndex ? "-":"+";
				} else {
					var towards = currentIndex >= toGoIndex ? "+":"-";
				}
				all_steps.push({
					step: min_step,
					towards: towards
				})
			}
			//找到最小的那个step
			var min = all_steps[0];
			for (var i = 0; i < all_steps.length; i++) {
				if (all_steps[i].step < min.step) {
					min = all_steps[i];
				} else if (all_steps[i].step == min.step && all_steps[i].towards == '+') {
					min = all_steps[i];
				}
			}
			//循环多次的玩具
			var repeatSelf = (self_func,delay,times,delay_do)=> {
				if (times > 0 && !delay_do) {
					self_func();
					times--;
					clearTimeout(this.jumping_timeout);
				}
				if (times > 0) {
					this.jumping_timeout = setTimeout(function() {
						self_func();
						repeatSelf(self_func,delay,times - 1,true);
					},delay)
				}
				this.emitter({isJump: true, jumpEnd: times == 0, towards: min.towards });
				if (times==0) {
					setTimeout(()=>{
						this.isChanging = false;
					},this.transitionTime)
				}
			}
			//根据min的情况来动画跳转
			repeatSelf(()=>{
				min.towards == "+" ? this.next() : this.prev();
			},this.jumppingTime || 200,min.step)
		},
		handlePrev() {
			if (this.isChanging) {return;}

			this.isChanging = true;
			setTimeout(()=>{
				this.isChanging = false;
			},this.transitionTime)

			this.prev()
			this.emitter({isPrev:true,towards: '-'})
		},
		handleNext() {
			if (this.isChanging) {return;}
			this.isChanging = true;
			setTimeout(()=>{
				this.isChanging = false;
			},this.transitionTime)

			this.next()
			this.emitter({isNext:true, towards:'+'})
		},
		emitter(args) {
			this.$nextTick(()=>{
				this.$emit('change',{
					currentIndex: this.getRealCurrentIndex(),
					stageIndex:this.stageCurrentIndex,
					currentEl: this.$refs.sceneREF[this.stageCurrentIndex],
					...args
				})
			})
		}
	}
})
</script>

<style lang="less">
.stage {
	z-index: 1;
	position: relative;
	.scene {
		position: absolute;
		top: 0;
		left: 0;
		transition: transform .7s, z-index .7s,opacity .7s;
	}
}
.controls button {
	transition: .1s;
}
.isChanging .controls button {
	transform: scale(.5);
	opacity: 0;
}

.past-2 {
	z-index: 2;
	transform: translateX(-13em) perspective(30em) rotateY(50deg) scale(.55);
	opacity: 0;
}
.past-1 {
	z-index: 3;
	transform: translateX(-11em) perspective(30em) rotateY(50deg) scale(.65);
	opacity: .35;
}
.past-0 {
	z-index: 4;
	transform: translateX(-8em) perspective(30em) rotateY(50deg) scale(.75);
}
.current {
	z-index: 5;
	transition: transform cubic-bezier(.48,0,.3,1) .7s, z-index .7s !important;
}
.future-0 {
	z-index: 4;
	transform: translateX(8em) perspective(30em) rotateY(-50deg) scale(.75);
}
.future-1 {
	z-index: 3;
	transform: translateX(11em) perspective(30em) rotateY(-50deg) scale(.65);
	opacity: .35;
}
.future-2 {
	z-index: 2;
	transform: translateX(13em) perspective(30em) rotateY(-50deg) scale(.55);
	opacity: 0;
}
.out-of-stage {
	display: none;
}

.anchors {
	display: flex;
	margin-top: 256px;
	width: 256px;
	justify-content: center;
	@media (max-width:991.5px) {
		width: 200px;
		margin-top: 200px;
	}
	div {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		margin: 0 3px;
		// background: linear-gradient(#fff,rgba(255,255,255,0));
		box-shadow: 0 0 0 1px rgba(255,255,255,.3) inset,0 5px 4px rgba(0,0,0,.4) inset;
		opacity: .8;
		cursor: pointer;
		transition: .5s;
	}
	.active {
		transform: translateY(-1px);
		opacity: 1;
		background: linear-gradient(#fff,rgba(255,255,255,0));
		box-shadow: 0 0 0 1px rgba(255,255,255,.3) inset,0 5px 4px rgba(0,0,0,0) inset,0 5px 4px rgba(0,0,0,.2);
	}
	/*div {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		margin: 0 3px;
		background: linear-gradient(#fff,rgba(255,255,255,0));
		box-shadow: 0 0 0 1px rgba(255,255,255,.3) inset,0 5px 4px rgba(0,0,0,.4);
		opacity: .4;
		cursor: pointer;
		transition: .5s;
	}
	.active {
		opacity: 1;
		box-shadow: 0 0 0 1px rgba(255,255,255,.3) inset,0 5px 4px rgba(0,0,0,.2);
	}*/
}

@media (max-width:991.5px) {
	.past-2 {
		transform: translateX(-11em) perspective(30em) rotateY(50deg) scale(.55);
	}
	.past-1 {
		transform: translateX(-9em) perspective(30em) rotateY(50deg) scale(.65);
	}
	.past-0 {
		transform: translateX(-6.4em) perspective(30em) rotateY(50deg) scale(.75);
	}
	.current {
		transform: translateZ(2em);
		transition: transform cubic-bezier(.48,0,.3,1) .7s, z-index .7s !important;
	}
	.future-0 {
		transform: translateX(6.4em) perspective(30em) rotateY(-50deg) scale(.75);
	}
	.future-1 {
		transform: translateX(9em) perspective(30em) rotateY(-50deg) scale(.65);
	}
	.future-2 {
		transform: translateX(11em) perspective(30em) rotateY(-50deg) scale(.55);
	}
}
</style>
