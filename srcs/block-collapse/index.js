export default ({register_block_type})=>{
	register_block_type("pandastudio/collapse",{
		name: '折叠内容',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
    <path d="M14,16H3a3,3,0,0,1-3-3V4A3,3,0,0,1,3,1H14a3,3,0,0,1,3,3v9A3,3,0,0,1,14,16ZM15,5a2,2,0,0,0-2-2H4A2,2,0,0,0,2,5v7a2,2,0,0,0,2,2h9a2,2,0,0,0,2-2V5ZM7.661,12.1a1,1,0,0,1-1.4-1.433L8.414,8.574,6.321,6.425a1,1,0,1,1,1.433-1.4L10.545,7.9a1,1,0,0,1-.019,1.414Z"/>
</svg>
`,
		attributes: {
			title: '详细信息',
			content(){return{}},
		},
		sanitize(editor) { return {
			title: {
				br: {}
			},
			content: true,
		}},
		editor: {
			url: '/srcs/block-collapse/ui.vue',
		},
		inlineToolbar: true,
	})
}