console.clear();

////////////
// CONFIG //
////////////

const DRAW_SIZE = 18;
// Affects number of cubes generated
const DENSITY = 1;
const LAYERS = 5;
// Colors are in rgb format
const COLORS = [
	[1.000, 0.655, 0.231],
	[1.000, 0.365, 0.114],
	[0.898, 0.078, 0.392],
	[0.424, 0.5, 0.114]
];
const GAMMA = 1.8;
const CLEAR_COLOR = [0., 0., 0., 1];
// Time in seconds for all cubes to wrap around once.
const SCROLL_TIME = 20;
// Radians per second
const ROTATE_MIN = 0.5;
const ROTATE_MAX = 4.2;
// Meters
const SIZE_MIN = 0.025;
const SIZE_MAX = 0.05;
// Randomize placement (meters)
const OFFSET_JITTER = 0.025;
// Camera controls
const CAMERA_DISTANCE = 2.8;
const CAMERA_FOV = 0.7;
const CAMERA_NEAR = 1;
const CAMERA_FAR = 100;


////////////////////////
// COMPUTED CONSTANTS //
////////////////////////

const ASPECT_RATIO = window.innerWidth / window.innerHeight;
// Number of cubes on each axis
const COUNT_Y = Math.floor(50 * DENSITY);
const COUNT_X = Math.floor(COUNT_Y * ASPECT_RATIO);
const COUNT_Z = Math.floor(LAYERS);
const COUNT_TOTAL = COUNT_X * COUNT_Y * COUNT_Z;
// Bounding volume dimensions (meters)
const BOUND_HEIGHT = 2;
const BOUND_WIDTH = COUNT_X / COUNT_Y * BOUND_HEIGHT;
const BOUND_DEPTH = COUNT_Z / COUNT_Y * BOUND_HEIGHT;


//////////////////
// MATH HELPERS //
//////////////////

const TAU = Math.PI * 2;
const random = (min, max) => Math.random() * (max - min) + min;
const interpolate = (a, b, mix) => (b - a) * mix + a;


/////////////////
// APPLICATION //
/////////////////

const regl = createREGL({ extensions: ['angle_instanced_arrays'] });

let mode = 'draw';

const reglCanvas = document.querySelector('canvas');
const drawCanvas = document.createElement('canvas');
drawCanvas.height = 128;
drawCanvas.width = Math.floor(ASPECT_RATIO * drawCanvas.height);
const drawCtx = drawCanvas.getContext('2d');
drawCtx.globalCompositeOperation = 'lighter';
// debug draw canvas
// document.body.appendChild(drawCanvas);
// drawCanvas.style.position = 'fixed';

const resizeAlert = document.querySelector('.resize-alert');
window.addEventListener('resize', () => {
	const newAspectRatio = window.innerWidth / window.innerHeight;
	const needsAlert = Math.abs(ASPECT_RATIO - newAspectRatio) > 0.1;
	resizeAlert.style.display = needsAlert ? 'block' : 'none';
});
resizeAlert.addEventListener('click', () => window.location.reload());

function clearDraw(firstCall) {
	drawCtx.save();
	drawCtx.globalCompositeOperation = 'source-over';
	drawCtx.fillStyle = '#000';
	drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
	drawCtx.restore();
	if (!firstCall) {
		updateDrawTexture();
		setMode('draw');
	}
}

clearDraw(true);

const clearBtn = document.querySelector('.clear-btn');
const modeBtn = document.querySelector('.mode-btn');
clearBtn.addEventListener('click', () => clearDraw());
modeBtn.addEventListener('click', () => setMode(mode === 'draw' ? 'erase' : 'draw'));

function setMode(newMode) {
	mode = newMode
	modeBtn.textContent = `MODE: ${mode.toUpperCase()}`
	if (mode === 'draw') {
		drawCtx.globalCompositeOperation = 'lighter';
	} else if (mode === 'erase') {
		drawCtx.globalCompositeOperation = 'multiply';
	} else {
		throw new Error(`Unrecognized mode: "${mode}"`);
	}
}

// Initialize default mode
setMode(mode);


const drawGradientStopCount = 10;

function makeGradientStops(mode) {
	const stops = [];
	for (let i=0; i<drawGradientStopCount; i++) {
		const percent = i / (drawGradientStopCount - 1);
		let brightness = (1 - percent) ** 2;
		if (mode === 'erase') {
			brightness = percent;
		}
		const rgb = brightness * 255 | 0;
		stops.push({
			position: percent,
			color: `rgb(${rgb},${rgb},${rgb})`
		});
	}
	return stops;
}

const drawGradientStops = makeGradientStops('draw');
const eraseGradientStops = makeGradientStops('erase');

let dragging = false;
const lastPosition = { x: 0, y: 0 };

const _positionTemp = { x: 0, y: 0 };
function getPositionFromEvent(evt) {
	_positionTemp.x = evt.clientX / window.innerWidth * drawCanvas.width;
	_positionTemp.y = evt.clientY / window.innerHeight * drawCanvas.height;
	return _positionTemp;
}

function drawSpot(x, y, strength=1) {
	drawCtx.save();
	const size = mode === 'draw' ? DRAW_SIZE * (strength * 0.6 + 0.4) : DRAW_SIZE;
	drawCtx.globalAlpha = size;
	const gradient = drawCtx.createRadialGradient(x, y, size/16, x, y, size/2);
	const gradientStops = mode === 'draw' ? drawGradientStops : eraseGradientStops;
	for (const stop of gradientStops) {
		gradient.addColorStop(stop.position, stop.color);
	}
	drawCtx.fillStyle = gradient;
	drawCtx.fillRect(x - size/2, y - size/2, size, size);
	drawCtx.restore();
	updateDrawTexture();
}

const points = [];
function addPoint(x, y) {
	points.push({
		x: x - 0.5*drawCanvas.width,
		y: y - 0.5*drawCanvas.height,
	});
}

function handlePointerDown(x, y) {
	// addPoint(x, y);
	lastPosition.x = x;
	lastPosition.y = y;
	drawSpot(x, y);
}

function handlePointerMove(x, y) {
	// addPoint(x, y);
	const dx = x - lastPosition.x;
	const dy = y - lastPosition.y;
	const minStep = 3;
	let distance = Math.hypot(dx, dy);
	if (distance > minStep) {
		const vx = dx / distance * minStep;
		const vy = dy / distance * minStep;
		const strength = minStep / distance;
		while (distance > minStep) {
			distance -= minStep;
			lastPosition.x += vx;
			lastPosition.y += vy;
			drawSpot(lastPosition.x, lastPosition.y, strength);
		}
	}
}

reglCanvas.addEventListener('pointerdown', evt => {
	if (evt.isPrimary) {
		dragging = true;
		const { x, y } = getPositionFromEvent(evt);
		handlePointerDown(x, y);
	}
});
reglCanvas.addEventListener('pointermove', evt => {
	if (dragging && evt.isPrimary) {
		let { x, y } = getPositionFromEvent(evt);
		handlePointerMove(x, y);
	}
});
reglCanvas.addEventListener('pointerup', evt => {
	if (evt.isPrimary) {
		dragging = false;
	}
});

const drawTexConfig = {
	format: 'rgb',
	data: drawCanvas,
	mag: 'linear',
	min: 'linear'
};
const drawTexture = regl.texture(drawTexConfig);

function updateDrawTexture() {
	drawTexture(drawTexConfig);
}

const viewMatrix = mat4.fromTranslation([], [0, 0, -CAMERA_DISTANCE]);
const projectionMatrix = [];
const projectionViewMatrix = [];

// Gamma correct colors
COLORS.forEach(c => {
	c[0] = Math.pow(c[0], GAMMA);
	c[1] = Math.pow(c[1], GAMMA);
	c[2] = Math.pow(c[2], GAMMA);
});

// Color of each cube
const colors = new Float32Array(3 * COUNT_TOTAL);
// Position of each cube
const offsets = new Float32Array(3 * COUNT_TOTAL);
// Base scale of each cube
const scales = new Float32Array(COUNT_TOTAL);
// Axis of rotation for each cube
const rotationAxes = new Float32Array(3 * COUNT_TOTAL);
// Rotation angle for each cube
const angles = new Float32Array(COUNT_TOTAL);
// Rotation speed for each cube (radians/s)
const rotationSpeeds = new Float32Array(COUNT_TOTAL);

// `angleBuffer` will be updated each frame, to animate rotations
const angleBuffer = regl.buffer({
	data: angles,
	type: 'float',
	usage: 'dynamic'
});

// Generate all data.
// Some buffers have a stride of 1, others have a stride of 3.
let i = 0;
let i3 = 0;
for (let x=0; x<COUNT_X; x++) {
	const xPercent = x / COUNT_X;
	for (let y=0; y<COUNT_Y; y++) {
		const yPercent = y / COUNT_Y;
		for (let z=0; z<COUNT_Z; z++) {
			const zPercent = z / COUNT_Z;
			const color = COLORS[Math.random() * COLORS.length | 0];
			const axis = vec3.random([]);
			colors[i3] = color[0];
			colors[i3+1] = color[1];
			colors[i3+2] = color[2];
			offsets[i3] = xPercent*BOUND_WIDTH - 0.5*BOUND_WIDTH + random(-OFFSET_JITTER, OFFSET_JITTER);
			offsets[i3+1] = yPercent*BOUND_HEIGHT - 0.5*BOUND_HEIGHT + random(-OFFSET_JITTER, OFFSET_JITTER);
			offsets[i3+2] = zPercent*BOUND_DEPTH - 0.5*BOUND_DEPTH + random(-OFFSET_JITTER, OFFSET_JITTER);
			scales[i] = 0.5 * random(SIZE_MIN, SIZE_MAX);
			rotationAxes[i3] = axis[0];
			rotationAxes[i3+1] = axis[1];
			rotationAxes[i3+2] = axis[2];
			angles[i] = Math.random() * TAU;
			rotationSpeeds[i] = random(ROTATE_MIN, ROTATE_MAX);
			i++;
			i3 += 3;
		}
	}	
}

// Shader setup, using instancing to draw many copies of one cube.
// Note most animation and math is done in the vertex shader on the GPU,
// including generating rotation matrices. Many common instancing approaches
// upload a tranform matrix for each instance each frame, but here we only
// upload a single float each frame (the angle) and a rotation matrix is built
// from that and a static rotation axis.
const draw = regl({
	cull: { enable: true },
	frontFace: 'cw',
	vert: `
		precision highp float;

		attribute vec3 a_position;
		attribute vec3 a_normal;
		attribute vec3 a_color;
		attribute vec3 a_offset;
		attribute float a_scale;
		attribute vec3 a_rotationAxis;
		attribute float a_angle;
		uniform sampler2D u_tex;
		uniform float u_scrollOffset;
		uniform mat4 u_projectionViewMatrix;
		varying vec3 v_color;

		mat4 rotationMatrix(vec3 axis, float angle) {
			float s = sin(angle);
			float c = cos(angle);
			float oc = 1.0 - c;
			return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
									oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
									oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
									0.0,                                0.0,                                0.0,                                1.0);
		}

		void main() {
			vec3 offset = a_offset;
			offset.y = -(mod(offset.y + u_scrollOffset + 1.0, 2.0) - 1.0);
			vec2 texCoord = vec2(
				(offset.x + ${(0.5*BOUND_WIDTH).toFixed(2)}) / ${BOUND_WIDTH.toFixed(2)},
				1.0 - (offset.y + 1.0) * 0.5
			);
			float texScale = texture2D(u_tex, texCoord).r;
			mat4 rotation = rotationMatrix(a_rotationAxis, a_angle);
			vec3 position = (rotation * vec4(a_position, 1.0)).xyz;
			vec3 normal = (rotation * vec4(a_normal, 1.0)).xyz;
			gl_Position = u_projectionViewMatrix * vec4(position * a_scale * texScale + offset, 1.0);
			v_color = a_color * min(1.0, normal.z + 0.1);
		}
	`,
	frag: `
		precision highp float;

		varying vec3 v_color;

		void main() {
			gl_FragColor = vec4(v_color, 1.0);
		}
	`,
	attributes: {
		// unit cube triangle vertices
		a_position: getCubeVertices(),
		a_normal: getCubeNormals(),
		a_color: {
			buffer: regl.buffer(colors),
			divisor: 1 // one per cube
		},
		a_offset: {
			buffer: regl.buffer(offsets),
			divisor: 1 // one per cube
		},
		a_scale: {
			buffer: regl.buffer(scales),
			divisor: 1 // one per cube
		},
		a_rotationAxis: {
			buffer: regl.buffer(rotationAxes),
			divisor: 1 // one per cube
		},
		a_angle: {
			buffer: angleBuffer,
			divisor: 1 // one per cube
		}
	},
	uniforms: {
		u_tex: drawTexture,
		u_scrollOffset: ({ time }) => {
			return time % SCROLL_TIME / SCROLL_TIME * BOUND_HEIGHT;
		},
		u_projectionViewMatrix: ({ viewportWidth, viewportHeight }) => {
			const aspectRatio = viewportWidth / viewportHeight;
			mat4.perspective(projectionMatrix, CAMERA_FOV, aspectRatio, CAMERA_NEAR, CAMERA_FAR);
			mat4.multiply(projectionViewMatrix, projectionMatrix, viewMatrix);
			return projectionViewMatrix;
		}
	},
	count: 36,
	instances: COUNT_TOTAL
});

// Points are relative to center, to look nice on all screen sizes...
const initialStrokePoints = [{x:-23.4,y:-17.3},{x:-20.3,y:-16.6},{x:-19.1,y:-16.4},{x:-16.3,y:-16.4},{x:-9.1,y:-17.3},{x:0.0,y:-19.0},{x:9.4,y:-21.3},{x:17.8,y:-24.6},{x:22.0,y:-26.6},{x:26.0,y:-28.8},{x:27.1,y:-29.3},{x:27.3,y:-29.5},{x:27.4,y:-29.5},{x:27.4,y:-29.0},{x:27.4,y:-28.8},{x:27.4,y:-28.8},{x:27.4,y:-28.5},{x:26.7,y:-28.1},{x:25.2,y:-26.4},{x:22.7,y:-23.9},{x:18.8,y:-19.8},{x:13.1,y:-14.1},{x:7.4,y:-8.2},{x:1.8,y:-1.8},{x:-1.8,y:2.6},{x:-5.8,y:7.8},{x:-8.3,y:11.4},{x:-9.8,y:14.0},{x:-10.4,y:15.4},{x:-10.7,y:16.0},{x:-10.7,y:16.1},{x:-10.7,y:16.3},{x:-10.7,y:16.4},{x:-10.7,y:16.5},{x:-9.2,y:16.5},{x:-6.9,y:15.8},{x:-3.3,y:14.4},{x:-0.4,y:13.3},{x:4.1,y:11.4},{x:7.4,y:9.9},{x:9.7,y:9.1},{x:11.0,y:8.6},{x:11.3,y:8.5},{x:11.5,y:8.4},{x:11.6,y:8.4},{x:11.7,y:8.4},{x:11.7,y:8.4},{x:10.6,y:10.9},{x:9.2,y:13.7},{x:6.9,y:19.6},{x:4.9,y:26.2},{x:3.7,y:31.9},{x:2.5,y:37.3},{x:1.8,y:40.5},{x:1.8,y:41.0},{x:1.8,y:41.3},{x:1.8,y:41.5},{x:1.8,y:41.6},{x:1.8,y:41.7},{x:2.0,y:43.6}];
// ...so we'll re-center them
for (const p of initialStrokePoints) {
	p.x += 0.5 * drawCanvas.width;
	p.y += 0.5 * drawCanvas.height;
}


// Animation loop
let lastTime = -1;
let animatedStrokeFrame = 0;
const animateStartTime = Date.now() + 1000;

regl.frame(({ time }) => {
	const timeDelta = lastTime === -1 ? 0 : time - lastTime;
	lastTime = time;
	
	if (animatedStrokeFrame === 0 && Date.now() > animateStartTime) {
		animatedStrokeFrame = 1;
		const p = initialStrokePoints[0];
		handlePointerDown(p.x, p.y);
	} else if (animatedStrokeFrame > 0 && animatedStrokeFrame < initialStrokePoints.length) {
		const p = initialStrokePoints[animatedStrokeFrame];
		handlePointerMove(p.x, p.y);
		animatedStrokeFrame++;
	}
	
	regl.clear({ color: CLEAR_COLOR });
	
	for (let i=0; i<COUNT_TOTAL; i++) {
		const speed = rotationSpeeds[i];
		let angle = angles[i] + speed*timeDelta;
		if (angle > TAU) {
			angle -= TAU;
		}
		angles[i] = angle;
	}
	
	angleBuffer.subdata(angles);
	
	draw();
});



//////////////////
// DATA HELPERS //
//////////////////

function getCubeVertices() {
	const ltf = [-1, 1, 1];
	const ltb = [-1, 1, -1];
	const lbf = [-1, -1, 1];
	const lbb = [-1, -1, -1];
	const rtf = [1, 1, 1];
	const rtb = [1, 1, -1];
	const rbf = [1, -1, 1];
	const rbb = [1, -1, -1];
	return [
		// top
		ltf, ltb, rtb,
		rtb, rtf, ltf,
		// bottom
		lbb, lbf, rbf,
		rbf, rbb, lbb,
		// left
		ltb, ltf, lbb,
		lbb, ltf, lbf,
		// right
		rbf, rtf, rtb,
		rtb, rbb, rbf,
		// front
		lbf, ltf, rtf,
		rtf, rbf, lbf,
		// back
		rtb, ltb, lbb,
		lbb, rbb, rtb
	];
}

function getCubeNormals() {
	const up = [0, 1, 0];
	const down = [0, -1, 0];
	const left = [-1, 0, 0];
	const right = [1, 0, 0];
	const front = [0, 0, 1];
	const back = [0, 0, -1];
	return [
		// top
		up, up, up, up, up, up,
		// bottom
		down, down, down, down, down, down,
		// left
		left, left, left, left, left, left,
		// right
		right, right, right, right, right, right,
		// front
		front, front, front, front, front, front,
		// back
		back, back, back, back, back, back
	];
}
