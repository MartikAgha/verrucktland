var canvas; 
var ctx;
var pointCentreX, pointCentreY;
var shapeScale = 50;

var numberConcentric;
var currentSize;
var infinitessimalShift = 1;
var i, j;

var colors = ['green', 'darkViolet', 'yellow', 'blue'];

var shift = 0;
var timeStep = 0;
var shiftSpeed = 5;
var colorShift = 0;

var mainShape = 0;
var slider;
var mainPower = 1;
var mainFactor = 3;
var verrucktMode = false;


window.onload = init();

function init() {
	canvas = document.querySelector('#myCanvas');
	canvas.addEventListener('click', changePosition);
	ctx = canvas.getContext('2d');
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	pointCentreX = window.innerWidth*0.5;
	pointCentreY = window.innerHeight*0.5;
	numberConcentric = mainFactor*Math.ceil(ctx.canvas.width/shapeScale);
	slider = document.getElementById('speedRange');
	slider.oninput = function() { shiftSpeed = this.value; }
	console.log(pointCentreX);
	console.log(pointCentreY);
	requestAnimationFrame(animate);
}

function animate() {
	shift = timeStep*shiftSpeed;
	timeStep += 1;
	if (shift >= shapeScale) {
		shift -= shapeScale;
		timeStep = 0;
		colorShift += 1;
		console.log(colorShift);
	}
	drawCanvas(shift);
	requestAnimationFrame(animate)
}

function initialCanvas() {
	numberConcentric = 2*Math.ceil(ctx.canvas.width/shapeScale);
	for (i = numberConcentric; i >= 0; i--) {
		currentSize = i*shapeScale + infinitessimalShift;
		color = colors[i % colors.length];
		drawTriangle(currentSize, color);
	}
	requestAnimationFrame(animate);
}

function drawCanvas(shift) {
	if (mainShape == 0) {
		drawTriangleCanvas(shift);
	} else if (mainShape == 1) {
		drawSquareCanvas(shift);
	} else {
		drawCircleCanvas(shift);
	}
}

function drawTriangleCanvas(shift) {
	for (i = numberConcentric; i >= 0; i--) {
		currentSize = Math.pow(i, mainPower)*shapeScale + infinitessimalShift + shift;
		j = numberConcentric - i
		color = colors[(j + colorShift) % colors.length];
		drawTriangle(currentSize, color);
	}
}

function drawTriangle(scale, color) {
	var context = canvas.getContext('2d');
	context.fillStyle = color;
	context.beginPath();
	context.moveTo(pointCentreX, 
				   pointCentreY + scale/Math.pow(3, 0.5));
	context.lineTo(pointCentreX + 0.5*scale,
				   pointCentreY - scale/2/Math.pow(3, 0.5));
	context.lineTo(pointCentreX - 0.5*scale,
				   pointCentreY - scale/2/Math.pow(3, 0.5));
	context.fill();
}

function drawSquareCanvas(shift) {
	for (i = numberConcentric; i >= 0; i--) {
		currentSize = Math.pow(i, mainPower)*shapeScale + infinitessimalShift + shift;
		j = numberConcentric - i
		color = colors[(j + colorShift) % colors.length];
		drawSquare(currentSize, color);
	}
}

function drawSquare(scale, color) {
	var context = canvas.getContext('2d');
	context.fillStyle = color;
	upperLeftX = pointCentreX - 0.5*scale;
	upperLeftY = pointCentreY - 0.5*scale;
	context.fillRect(upperLeftX,
					 upperLeftY,
					 scale,
					 scale);
}

function drawCircleCanvas(shift) {
	for (i = numberConcentric; i >= 0; i--) {
		currentSize = Math.pow(i, mainPower)*shapeScale + infinitessimalShift + shift;
		j = numberConcentric - i
		color = colors[(j + colorShift) % colors.length];
		drawCircle(currentSize, color);
	}
}

function drawCircle(scale, color) {
	var context = canvas.getContext('2d');
	context.fillStyle = color;
	context.beginPath();
	context.arc(pointCentreX, 
				pointCentreY, 
				scale,
				0,
				2*Math.PI);
		 
	context.fill();
}

function changePosition(evt) {
	rect = canvas.getBoundingClientRect();
	pointCentreX = evt.clientX - rect.x;
	pointCentreY = evt.clientY - rect.y;
}	

function changeToTriangle() {
	mainShape = 0;
}

function changeToSquare() {
	mainShape = 1;
}
 
function changeToCircle() {
	mainShape = 2;
}

function switchVerruckt() {
	if (verrucktMode) {
		verrucktMode = false;
		mainPower = 1;
		mainFactor = 3;
		numberConcentric = mainFactor*Math.ceil(ctx.canvas.width/shapeScale);
	} else {
		verrucktMode = true;
		mainPower = 0.7;
		mainFactor = 14;
		numberConcentric = mainFactor*Math.ceil(ctx.canvas.width/shapeScale);
	}
}

