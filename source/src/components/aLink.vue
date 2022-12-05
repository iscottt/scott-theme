<template>
	<a v-if="to==''" v-html="label">
	</a>
	<a
	v-else-if="typeof(to)=='string' && (to.startsWith('http') || to.startsWith('//'))"
	:href="to"
	:target="target"
	rel="noopener noreferrer"
	v-html="label"
	>
	</a>
	<router-link
	v-else
	v-bind="$props"
	:target="target"
	v-html="label"
	>
	</router-link>
</template>
<script>
export default{
	props:{
		to: {
			type: [String,Object],
			required: true
		},
		target: {
			type: String,
			default: '_self'
		},
		label: {
			type: String,
			default: ''
		}
	},
}
</script>