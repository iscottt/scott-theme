export default ({register_block_type})=>{
	register_block_type("pandastudio/title",{
		name: '小标题',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M448 448c0 17.69-14.33 32-32 32h-96c-17.67 0-32-14.31-32-32s14.33-32 32-32h16v-144h-224v144H128c17.67 0 32 14.31 32 32s-14.33 32-32 32H32c-17.67 0-32-14.31-32-32s14.33-32 32-32h16v-320H32c-17.67 0-32-14.31-32-32s14.33-32 32-32h96c17.67 0 32 14.31 32 32s-14.33 32-32 32H112v112h224v-112H320c-17.67 0-32-14.31-32-32s14.33-32 32-32h96c17.67 0 32 14.31 32 32s-14.33 32-32 32h-16v320H416C433.7 416 448 430.3 448 448z"/></svg>`,
		attributes: {
			tag: 'h2',
			style: 1,
			text: '',
		},
		sanitize(editor) { return {

		}},
		editor: {
			url: '/srcs/block-title/ui.vue',
		},
		settings: {
			url: '/srcs/block-title/settings_ui.vue',
		},
	})
}