export default ({register_block_type})=>{
	register_block_type("pandastudio/panel",{
		name: '面板',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
  <path id="_1" data-name="1" class="cls-1" d="M10,11.011H2a2,2,0,0,1-2-2V2.989a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2V9.011A2,2,0,0,1,10,11.011Zm1.011-8.346A0.667,0.667,0,0,0,10.345,2H1.655a0.667,0.667,0,0,0-.667.667v6.67A0.667,0.667,0,0,0,1.655,10h8.689a0.667,0.667,0,0,0,.667-0.667V2.665Z"/>
  <path id="_2" data-name="2" class="cls-2" style="opacity: .25" d="M1.655,2h8.689a0.667,0.667,0,0,1,.667.667V4.994H0.989V2.67A0.667,0.667,0,0,1,1.655,2Z"/>
</svg>
`,
		attributes: {
			type: "",
			title: "",
			content(){return {}},
		},
		sanitize(editor) { return {
			title: {
				br: {}
			},
			content: true,
		}},
		editor: {
			url: '/srcs/block-panel/ui.vue',
		},
		settings: {
			url: '/srcs/block-panel/settings_ui.vue',
		},
		inlineToolbar: true,
		// shortcut: 'CMD+U',
	})
}