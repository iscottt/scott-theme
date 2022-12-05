import paragraph from "./index.js";
export default ({register_block_type})=>{
	register_block_type("paragraph",{
		class: paragraph,
		inlineToolbar: true,
	})
}