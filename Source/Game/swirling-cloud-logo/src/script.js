// Basically all the JS from caleb-miller.com

$(document).ready(function() {
	// custom color picker here on codepen
	var color_picker = document.createElement('div');
	color_picker.classList.add('color-picker');
	document.body.appendChild(color_picker);
	
	var long_side = 300;
	var short_side = 50;
	color_picker.style.width = short_side + 'px';
	color_picker.style.height = long_side + 'px';
	
	// generate color chips
	for (var i=0; i<8; i++) {
		var color_chip = document.createElement('div');
		color_picker.appendChild(color_chip);
		var hue = i * 40 + 10;
		color_chip.style.backgroundColor = 'hsl(' + hue + ', 100%, 50%)';
		color_chip.addEventListener('click', (function iife(hue) {
			return function changeColor(evt) {
				BG.setHue(hue);
			};
		})(hue));
	}
	
	resizeColorPicker();
	window.addEventListener('resize', resizeColorPicker);
	function resizeColorPicker() {
		color_picker.style.right = '10px';
		color_picker.style.top = (window.innerHeight - long_side) / 2 + 'px';
	}
	
	// setup logo image
	BG.logo = new Image();
	BG.logo.onload = function() {
		BG.logo_loaded = true;
		BG.showLogo();
	}
	BG.logo.setAttribute('id', 'logo');
	BG.logo.setAttribute('width', '100');
	BG.logo.setAttribute('height', '100');
	BG.logo.src = BG.logo_path + BG.logo_ext;
	// setup canvas
	BG.wrapper = document.getElementById('intro');
	$(BG.wrapper).prepend('<canvas id="bg-canvas" width="'+window.innerWidth+'" height="'+window.innerHeight+'">Please use a browser that supports canvas</canvas>');
	BG.canvas = document.getElementById('bg-canvas');
	BG.ctx = BG.canvas.getContext('2d');
	$(BG.wrapper).append(BG.logo);
	// wire ticker listener
	Ticker.addListener(BG.tick);
	// start
	BG.init();
	
	// show initial color (takes a number from 0-360 degrees)
	BG.setHue(210);
	
	// restart on window resize
	window.addEventListener('resize', BG.init);

	// input events
	var is_mobile = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substr(0,4)));
	if (is_mobile) {
		BG.canvas.addEventListener('touchstart', Input.touchHandler);
		BG.canvas.addEventListener('touchmove', Input.touchHandler);
		document.addEventListener('touchend', Input.touchHandler);
	}else{
		BG.canvas.addEventListener('mousedown', Input.mouseHandler);
		BG.canvas.addEventListener('mousemove', Input.mouseHandler);
		document.addEventListener('mouseup', Input.mouseHandler);
	}

	// cycle colors
	var event_name = is_mobile ? 'touchstart' : 'mouseenter';
	$('nav a').on(event_name, function() {
		BG.setHue(BG.hues[$(this).index()]);
	});

	// smooth scroll to projects section
	$('#nav-projects').click(function(){
		var anchor = $.attr(this, 'href');
		window.history.pushState("Project Section", "Project Section", anchor);
		$('html, body').animate({
			scrollTop: $(anchor).offset().top
		}, 500);
		return false;
	});

	// fetch retina versions of project thumbnails if needed
	if (window.devicePixelRatio > 1) {
		$('.project-box').each(function() {
			var image = $(this).css('backgroundImage');
			if (image !== 'none') {
				image = image.substr(0, image.length - 5) + '@2x' + image.substr(-5);
				$(this).css('backgroundImage', image);
			}
		});
	}
});


// wrapper for background animation functionality
var BG = {
	started: false,
	// wrapper element
	wrapper: null,
	// logo image and associated data
	logo_loaded: false,
	logo: null,
	logo_path: 'https://cmiller.tech/static/media/logo.e927a786',
	logo_ext: '.svg',
	logo_opacity: '0.85',
	logo_size: 0,
	showLogo: function() {
		if (BG.logo_loaded) setTimeout(function() { BG.logo.style.opacity = BG.logo_opacity; }, 500);
	},
	// canvas element and context
	canvas: null,
	ctx: null,
	// current hue
	hue: 0,
	// possible hues
	hues: [180, 210, 240],
	// counter for initially adding balls
	init_time: 0,
	// store minimum screen dimension from last initialization
	min_dim: 0,
	// ball arrays
	balls: [],
	ball_pool: [],
	// devicePixelRatio alias
	dpr: window.devicePixelRatio || 1
};
// start/reset animation
BG.init = function() {
	// resize canvas
	BG.canvas.width = window.innerWidth * BG.dpr;
	BG.canvas.height = window.innerHeight * BG.dpr;
	// hide logo with no transition
	BG.logo.style.display = 'none';
	setTimeout(function() {
		BG.logo.style.opacity = '0';
		BG.logo.style.display = 'block';
	}, 0);
	// only restart animation if running for first time, or minimum screen dimension changed
	var current_min_dim = Math.min(window.innerWidth, window.innerHeight);
	if (!BG.started || BG.min_dim !== current_min_dim) {
		BG.started = true;
		BG.min_dim = current_min_dim;
		var balls = BG.balls;
		var ball_pool = BG.ball_pool;
		// recycle any balls that are displayed
		for (var i = balls.length - 1; i >= 0; i--) {
			ball_pool.push(balls.pop());
		}
		// reset initialization frame
		BG.init_time = 0;
		// resize logo
		BG.logo_size = current_min_dim * 0.5;
		BG.logo.style.width = BG.logo_size + 'px';
		BG.logo.style.height = BG.logo_size + 'px';
	}
	// fade logo back in
	BG.showLogo();
	// position logo
	BG.logo.style.left = ((window.innerWidth - BG.logo_size) / 2) + 'px';
	BG.logo.style.top = ((window.innerHeight - BG.logo_size) / 2) + 'px';
}
BG.setHue = function(hue) {
	// store
	BG.hue = hue;
	// color balls
	var balls = BG.balls;
	for (var i = balls.length - 1; i >= 0; i--) {
		balls[i].setColor(hue);
	}
	// color backgrounds
	BG.wrapper.style.backgroundColor = 'hsl('+hue+', 85%, 30%)';
	var hsla = 'hsla('+hue+', 100%, 40%, 0.85)';
	$('header').css('background-color', hsla);
	$('nav a').css('background-color', hsla);
	$('.angle-right-deco').css('border-top-color', hsla);
	$('.angle-left-deco').css('border-bottom-color', hsla);
}
// run animation
BG.tick = function(frame_time, lag) {
	// store some handy references locally
	var Input = window.Input;
	var ctx = BG.ctx;
	var balls = BG.balls;
	var ball_pool = BG.ball_pool;
	var width = BG.canvas.width;
	var height = BG.canvas.height;
	var center_x = width * 0.5;
	var center_y = height * 0.5;
	var radius = Math.min(width, height) * 0.35;
	var max_ball_radius = radius * 0.185;

	// start off slowly adding balls (one every ~4 frames)
	if (balls.length < 200) {
		BG.init_time += frame_time;
		if (BG.init_time > 60) {
			BG.init_time = 0;
			var ball = ball_pool.pop() || new BG.Ball();
			ball.init(center_x, center_y, max_ball_radius);
			balls.push(ball);
		}
	}

	// wipe canvas
	ctx.fillStyle = '#fff'; // temporary fix for Safari - clearRect() shouldn't need a fillStyle to work
	ctx.clearRect(0, 0, width, height);
	// ensure proper blend mode
	ctx.globalCompositeOperation = "lighter";

	// increase input force
	if (Input.touching) {
		if (Input.pointer_force === 0) {
			Input.pointer_force = radius;
		}
		Input.pointer_force += 10 * lag;
		if (Input.pointer_force > radius * 2) {
			Input.pointer_force = radius * 2;
		}
	}

	// step through visible balls
	for (var i = balls.length - 1; i >= 0; i--) {
		var ball = balls[i];
		// movement
		ball.position += ball.speed * lag;
		var radius_offset = radius + Math.sin((ball.position + ball.wave_offset) * ball.wave_period) * radius * ball.wave_height;
		ball.x_target = Math.sin(ball.position) * radius_offset - ball.radius + center_x;
		ball.y_target = -Math.cos(ball.position) * radius_offset - ball.radius + center_y;

		// apply input force
		if (Input.touching && MyMath.pointDist(Input.pointer_x, Input.pointer_y, ball.x_target, ball.y_target) < Input.pointer_force) {
			var angle = MyMath.pointAngle(Input.pointer_x, Input.pointer_y, ball.x_target, ball.y_target);
			ball.x_target = Input.pointer_x + Math.sin(angle) * Input.pointer_force - ball.radius;
			ball.y_target = Input.pointer_y - Math.cos(angle) * Input.pointer_force - ball.radius;
		}

		// approach target
		ball.x_inertia += ((ball.x_target - ball.x) * 0.05 - ball.x_inertia) * 0.05;
		ball.y_inertia += ((ball.y_target - ball.y) * 0.05 - ball.y_inertia) * 0.05;
		// move
		ball.x += ball.x_inertia * lag;
		ball.y += ball.y_inertia * lag;
		// check bounds
		if (ball.x < 0) {
			ball.x = 0;
			ball.x_inertia *= -0.9;
		}else if (ball.x + ball.width > width) {
			ball.x = width - ball.width;
			ball.x_inertia *= -0.9;
		}
		if (ball.y < 0) {
			ball.y = 0;
			ball.y_inertia *= -0.9;
		}else if (ball.y + ball.height > height) {
			ball.y = height - ball.height;
			ball.y_inertia *= -0.9;
		}

		// drawing
		ctx.drawImage(ball.canvas, ball.x | 0, ball.y | 0);
	}
}

// Ball definition
BG.Ball = function() {
	// sprite properties
	this.color = "";
	this.radius = 0;
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.alpha = 1;
	this.canvas = document.createElement('canvas');
	this.ctx = this.canvas.getContext('2d');
	this.redraw = false;
	// track target position separately
	this.x_target = 0;
	this.y_target = 0;
	// track inertia
	this.x_inertia = 0;
	this.y_inertia = 0;
	// position around center circle
	this.position = 0;
	// speed around circle in radians/frame
	this.speed = 0;
	// wave offset params
	this.wave_period = 0;
	this.wave_height = 0;
	this.wave_offset = 0;
}
BG.Ball.prototype.init = function(x, y, max_radius) {
	// size
	this.radius = Math.random() * max_radius * 0.5 + max_radius * 0.5;
	this.width = this.radius * 2 + 1; // without adding a pixel, balls develop a flat edge on bottom and right side... ??
	this.height = this.width;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	// start position
	this.x = x - this.radius;
	this.y = y - this.radius;
	// set start color
	this.setColor(BG.hue);
	// position on circle
	var PI2 = Math.PI * 2;
	this.position = Math.random() * PI2;
	// 10 - 30 seconds for a full orbit
	this.speed = Math.random() * PI2 / 1000 + PI2 / 1800;
	// reset inertia
	this.x_inertia = 0;
	this.y_inertia = 0;
	// randomize offset wave
	this.wave_period = MyMath.randomInt(1, 6);
	this.wave_height = Math.random() * 0.2;
	this.wave_offset = Math.random() * Math.PI;
}
BG.Ball.prototype.setColor = function(hue) {
	// randomize hue a bit
	hue += (Math.random() * 70 - 35) | 0;
	// set color and render
	this.color = 'hsla(' + hue + ', 100%, 55%, 0.2)';
	this.redraw = true;
	this.render();
}
BG.Ball.prototype.render = function() {
	if (this.redraw) {
		this.redraw = false;
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2);
		this.ctx.fill();
	}
}


var Input = {
	// user controls
	touching: false,
	pointer_x: 0,
	pointer_y: 0,
	pointer_force: 0,
	// used to get coordinates of a touchend event
	last_pos: null,

	// easy window to canvas coordinate conversion
	windowToCanvas: function(canvas, x, y) {
		var bbox = canvas.getBoundingClientRect();
		return { x: (x - bbox.left) * (canvas.width / bbox.width),
				 y: (y - bbox.top) * (canvas.height / bbox.height)
			   };
	}
};

// very simple pointer event
Input.PointerEvent = function(x, y) {
	// "start", "move", "end"
	this.type = null;
	this.x = x;
	this.y = y;
	this.touch_count = 1;
}

Input.mouseHandler = function(evt) {
	var pos = Input.windowToCanvas(BG.canvas, evt.clientX, evt.clientY);
	var dispatch_event = new Input.PointerEvent(pos.x, pos.y);

	if (evt.type === 'mousedown') {
		evt.preventDefault();
		dispatch_event.type = 'start';
	}
	else if (evt.type === 'mousemove') {
		dispatch_event.type = 'move';
	}
	else if (evt.type === 'mouseup') {
		dispatch_event.type = 'end';
		dispatch_event.touch_count = 0;
	}

	Input.pointerHandler(dispatch_event);
}

// native touch handler
Input.touchHandler = function(evt) {
	evt.preventDefault();
	var dispatch_event;
	if (evt.touches.length > 0) {
		var touch = evt.touches[0];
		var pos = Input.windowToCanvas(BG.canvas, touch.clientX, touch.clientY);
		Input.last_pos = pos;
		dispatch_event = new Input.PointerEvent(pos.x, pos.y);
	}else{
		dispatch_event = new Input.PointerEvent(Input.last_pos.x, Input.last_pos.y);
	}

	dispatch_event.touch_count = evt.touches.length;

	if (evt.type === 'touchmove') {
		dispatch_event.type = 'move';
	}else if (evt.type === 'touchstart') {
		dispatch_event.type = 'start';
	}else if (evt.type === 'touchend') {
		dispatch_event.type = 'end';
	}

	Input.pointerHandler(dispatch_event);
}

// synthetic "pointer" handler delegate for mouse and touch
Input.pointerHandler = function(evt) {
	if (evt.type === 'start') {
		if (evt.touch_count === 1) {
			Input.touching = true;
			Input.pointer_x = evt.x;
			Input.pointer_y = evt.y;
		}
	}else if (evt.type === 'move') {
		if (evt.touch_count === 1) {
			Input.pointer_x = evt.x;
			Input.pointer_y = evt.y;
		}
	}else if (evt.type === 'end') {
		if (evt.touch_count === 0) {
			Input.touching = false;
			Input.pointer_force = 0;
		}
	}
}

// Handy math/trig reference (implement complex math directly to reduce overhead of extra convenience function calls)
var MyMath = {
	// degree/radian conversion constants
	toDeg: 180/Math.PI,
	toRad: Math.PI/180,
	halfPI: Math.PI/2,

	// Pythagorean Theorem point distance calculation
	pointDist: function(x1, y1, x2, y2) {
		var x_dist = x2-x1;
		var y_dist = y2-y1;
		return Math.sqrt(x_dist*x_dist + y_dist*y_dist);
	},
	// Returns the angle (in radians) between two points
	pointAngle: function(x1, y1, x2, y2) {
		return MyMath.halfPI+Math.atan2(y2-y1, x2-x1);
	},
	// Splits a speed vector into x and y components (angle needs to be in radians)
	split_vector: function(speed, angle) {
		return {x: Math.sin(angle)*speed, y: -Math.cos(angle)*speed};
	},
	// Generates a random integer between and possibly including min and max values
	randomInt: function(min, max) {
		return ((Math.random()*(max-min+1)) | 0) + min;
	},
	// Returns a random element from an array, or simply the set of provided arguments when called
	randomChoice: function(choices) {
		if (arguments.length === 1 && Array.isArray(choices))
			return choices[(Math.random()*choices.length) | 0];
		return arguments[(Math.random()*arguments.length) | 0];
	}
};

// Frame ticker helper class
var Ticker = (function(){
	var PUBLIC_API = {};

	// public
	// will call function reference repeatedly once registered, passing elapsed time and a lag multiplier as parameters
	PUBLIC_API.addListener = function addListener(fn) {
		if (typeof fn !== 'function') throw('Ticker.addListener() requires a function reference passed in.');

		listeners.push(fn);

		// start frame-loop lazily
		if (!started) {
			started = true;
			queueFrame();
		}
	};

	// private
	var started = false;
	var last_timestamp = 0;
	var listeners = [];
	// queue up a new frame (calls frameHandler)
	function queueFrame() {
		if (window.requestAnimationFrame) {
			requestAnimationFrame(frameHandler);
		} else {
			webkitRequestAnimationFrame(frameHandler);
		}
	}
	function frameHandler(timestamp) {
		var frame_time = timestamp - last_timestamp;
		last_timestamp = timestamp;
		// make sure negative time isn't reported (first frame can be whacky)
		if (frame_time < 0) {
			frame_time = 17;
		}
		// - cap minimum framerate to 15fps[~68ms] (assuming 60fps[~17ms] as 'normal')
		else if (frame_time > 68) {
			frame_time = 68;
		}

		// fire custom listeners
		for (var i = 0, len = listeners.length; i < len; i++) {
			listeners[i].call(window, frame_time, frame_time / 16.67);
		}
		
		// always queue another frame
		queueFrame();
	}

	return PUBLIC_API;
}());