export default ({register_block_type})=>{
	register_block_type("pandastudio/columns",{
		name: '图文排版',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M6.8,8.591a10.993,10.993,0,0,1-1.921.342l0.315-1.1A4.612,4.612,0,0,0,6.1,7.708c2.474-.616,4.2-2.172,3.865-3.391A3.287,3.287,0,0,0,7.9,2.008c2.1-.045,3.74.617,4.054,1.835C12.391,5.551,10.084,7.676,6.8,8.591ZM6,2L7.486,6.457a3.23,3.23,0,0,0,1.246-.991L6.833,0H5.167L4.207,2.763C1.476,3.793-.344,5.632.049,7.156a2.025,2.025,0,0,0,.994,1.191L1.418,7.036a0.722,0.722,0,0,1-.381-0.352C0.923,5.742,2.4,3.966,4.176,2.853L1,12H2.667Zm5,10H9.333L8.3,8.891a10.321,10.321,0,0,0,1.416-.6Z"/></svg>`,
		attributes: {
			columns(){return [
				/*{
					content: {},
					backgroundColor: "",
					paddingX: null,
					paddingY: null,
					backgroundImage: "",
					width: 100
				}*/
			]},
			borderTop: false,
			borderBottom: false,
			backgroundImage: "",
			columnOnMobile: true,
			reverseOnMobile: false,
			alignFull: false,
		},
		sanitize(editor) { return {
			columns: true,
		}},
		editor: {
			url: '/srcs/block-columns/ui.vue',
		},
		settings: {
			url: '/srcs/block-columns/settings_ui.vue',
		},
		inlineToolbar: true,
		// shortcut: 'CMD+U',
	})
}