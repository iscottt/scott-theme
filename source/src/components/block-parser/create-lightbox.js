import "./create-lightbox.css"

var wrapper = document.createElement('div');
var image = document.createElement('img');
wrapper.append(image);

wrapper.className = "lightbox-wrapper";

image.addEventListener('click',(event)=>{
	event.stopPropagation();
})
wrapper.addEventListener('click',()=>{
	wrapper.classList.remove('show')
	setTimeout(()=>{
		wrapper.remove();
	},500)
})

export default (src)=>{
	image.src = src;
	document.body.append(wrapper)
	setTimeout(()=>{
		wrapper.classList.add('show');
	},50)
}