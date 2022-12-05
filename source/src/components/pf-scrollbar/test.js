import {mapStyles} from './functions'

var nativeScrollbarExists = null;

export default ()=>{
	if (nativeScrollbarExists !== null) {
		return nativeScrollbarExists;
	}

	var scrollbarTest = document.createElement('div');
	scrollbarTest.classList.add('pf_scroller');
	mapStyles(scrollbarTest,{
		width: '50px',
		height: '50px',
		overflow: 'scroll',
		position: 'absolute',
		bottom: 0,
		padding: 0,
		border: 0
	})

	var child = document.createElement('div');
	child.style.width = '1px';
	child.style.height = '100px';

	scrollbarTest.append(child);
	document.body.append(scrollbarTest);

	var scrollbar_y_width = scrollbarTest.offsetWidth - scrollbarTest.clientWidth;
	scrollbarTest.remove();

	nativeScrollbarExists = scrollbar_y_width !== 0;

	return nativeScrollbarExists;
}