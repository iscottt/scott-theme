export default (options)=>{
	var width,
	height,
	largeContainer,
	canvas,
	ctx,
	target,
	animateHeader = true;

	var circles = [];
	if (!options.el) {
		console.log('circleMagic Err: Container element not exist!')
	}
	var settings = {
		el: null,
		color: 'rgba(255,255,255,.4)',
		radius: 20,
		densety: 0.3,
		clearOffset: 0.2,
		...options,
	}

	initContainer();
	addListeners();

	function initContainer() {
		largeContainer = settings.el;
		// width = window.innerWidth;
		// height = window.innerHeight;
		width = settings.width || largeContainer.offsetWidth;
		height = settings.height || largeContainer.offsetHeight;
		target = {
			x: 0,
			y: height
		};
		//父元素高度，禁用
		// largeContainer.style.height = height + 'px';
		initCanvas();
		canvas.width = width;
		canvas.height = height;
		ctx = canvas.getContext('2d');
		for (var x = 0; x < width * settings.densety; x++) {
			var c = new Circle();
			circles.push(c);
		}
		animate();
	}

	function initCanvas() {
		canvas = document.createElement('canvas');
		canvas.classList.add(settings.className);
		largeContainer.append(canvas);
	}

	function addListeners() {
		window.addEventListener('scroll', scrollCheck);
		window.addEventListener('resize', resize);
	}

	function scrollCheck() {
		if (document.body.scrollTop > height) animateHeader = false;
		else animateHeader = true;
	}

	function resize() {
		largeContainer = settings.el;
		width = settings.width || largeContainer.offsetWidth;
		height = settings.height || largeContainer.offsetHeight;
		canvas.width = width;
		canvas.height = height;
	}

	function animate() {
		if (animateHeader) {
			ctx.clearRect(0, 0, width, height);
			for (var i in circles) {
				circles[i].draw();
			}
		}
		requestAnimationFrame(animate);
	}

	function randomColor() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		var alpha = Math.random().toPrecision(2);
		// var rgba = `rgba($ {
		//     r
		// },
		// $ {
		//     g
		// },
		// $ {
		//     b
		// },
		// $ {
		//     alpha
		// })`;
		var rgba = 'rgba('+r+','+g+','+b+','+alpha+')';
		return rgba;
	};

	/*function randomOpacity() {
		return `rgba(255,255,255,${Math.random().toPrecision(2)})`;
	};*/

	function randomOpacity(opacity) {
		return `rgba(255,255,255,${opacity})`;
	};

	function Circle() {
		var self = this; (function() {
			self.pos = {};
			init();
		})();

		function init() {
			self.pos.x = Math.random() * width;
			// self.pos.y = height + Math.random() * 100;
			self.pos.y = 0 - Math.random() * 100;
			self.alpha = 0.1 + Math.random() * settings.clearOffset;
			self.scale = 0.1 + Math.random() * 0.3;
			self.speed = Math.random();
			if (settings.color == 'random') {
				self.color = randomColor();
			}
			else if(settings.color == 'randomOpacity') {
				self.color = randomOpacity(self.alpha);
			}
			else {
				self.color = settings.color;
			}
		}
		this.draw = function() {
			if (self.alpha <= 0) {
				init();
			}
			self.pos.y += self.speed;
			self.alpha -= 0.0005;
			ctx.beginPath();
			ctx.arc(self.pos.x, self.pos.y, self.scale * settings.radius, 0, 2 * Math.PI, false);
			// ctx.fillStyle = self.color;
			ctx.fillStyle = randomOpacity(self.alpha * 5);
			ctx.fill();
			ctx.closePath();
		};
	}
}