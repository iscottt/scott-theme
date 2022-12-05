<template>
	<div class="code" :data-lang="data.language">
		<n-tooltip>
			<template #trigger>
				<button @click="copyToClip(data.pre.split('\n'))">
					<svg-icon name="copy" />
				</button>
			</template>
			复制代码
		</n-tooltip>
		<pre><code class="hljs" v-html="hightlighjs()" :data-language="data.language"></code></pre>
	</div>
</template>
<script>
import { useMessage,NTooltip } from 'naive-ui'
import { defineComponent } from "vue";
import 'highlight.js/styles/atom-one-dark.css'
import hljs from "highlight.js/lib/common";
export default defineComponent({
	name: 'block-code',
	props: {
		data: {
			type: Object
		}
	},
	components: {
		NTooltip
	},
	data() {return {
		message: useMessage(),
	}},
	methods: {
		copyToClip(contentArray) {
			var contents = "";
			for (var i = 0; i < contentArray.length; i++) {
				contents += contentArray[i] + "\n";
			}
			const textarea = document.createElement('textarea');
			textarea.value = contents;
			document.body.appendChild(textarea);
			textarea.select();
			if (document.execCommand('copy')) {
				document.execCommand('copy');
			}
			document.body.removeChild(textarea);
			this.message.info('复制成功！')
		},
		hightlighjs() {
			var result = this.data.language
						? hljs.highlight(this.data.pre,{language: this.data.language}).value
						: hljs.highlightAuto(this.data.pre).value;
			return result;
		}
	}
})
</script>
<style scoped lang="less">
div {
	position: relative;
	margin: 1em 0;
}
button {
	font-size: 14px;
	padding: 0;
	width: 2.2em;
	height: 2.2em;
	border-radius: 50%;
	border: none;
	position: absolute;
	top: 0;
	right: 0;
	transform: translateX(-30%) translateY(-50%);
	color: #fff;
	background: linear-gradient(var(--analogous-color),var(--primary-color));
	box-shadow: 0 3px 4px var(--primary-opacity-3);
	transition: .35s;
	&:hover {
		transform: translateX(-30%) translateY(-50%) scale(1.4);
		transition: cubic-bezier(.5,3,.65,1) .5s;
	}
}
.code pre {
	max-height: 300px;
	margin: 0;
	padding: 1em 1.2em;
	overflow: auto;
	background: #282c34;
	border-radius: .5em;
}
.code pre code {
	overflow: visible;
	font-family: Menlo, Monaco, Consolas, Courier New, monospace;
	font-size: 85%;
	padding: 0;
	background: transparent;
}
</style>
