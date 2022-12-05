export default ({register_block_type})=>{
	register_block_type("pandastudio/tip",{
		name: '提示框',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
  <path id="_1" data-name="1" class="cls-1" d="M7.562,17a2.25,2.25,0,0,1-.353-0.028A8.546,8.546,0,0,1,4.68.905a8.481,8.481,0,0,1,11.4,3.8A8.569,8.569,0,0,1,12.3,16.163a1,1,0,0,1-1.352-.45,1.014,1.014,0,0,1,.447-1.358A6.538,6.538,0,0,0,14.283,5.61a6.487,6.487,0,1,0-6.771,9.362,0.269,0.269,0,0,0,.22-0.066A1.1,1.1,0,0,0,7.987,14.1V10.051a1.012,1.012,0,0,1,0-2.024H10V14.1a3.018,3.018,0,0,1-.956,2.343A2.248,2.248,0,0,1,7.562,17ZM8.49,3.981A1.518,1.518,0,1,1,6.98,5.5,1.514,1.514,0,0,1,8.49,3.981Z"/>
</svg>`,
		attributes: {
			type: '',
			title: '',
			text(){return {}},
		},
		sanitize(editor) { return {
			title: {
				br: {}
			},
			text: {
				br: {}
			},
		}},
		editor: {
			url: '/srcs/block-tip/ui.vue',
		},
		settings: {
			url: '/srcs/block-tip/settings_ui.vue',
		},
		inlineToolbar: true,
		// shortcut: 'CMD+U',
	})
}