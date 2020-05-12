var canvas; 
var ctx;
var pointCentreX, pointCentreY;
var baseShapeScale = 50;
var shapeScale;

var numberConcentric;
var currentSize;
var infinitessimalShift = 1;
var i, j;

var colors = ['green', 'darkViolet', 'yellow', 'blue'];

var shift = 0;
var timeStep = 0;
var shiftSpeed = 15;
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
	shapeScale = Math.floor(baseShapeScale/shiftSpeed)*shiftSpeed;
	numberConcentric = mainFactor*Math.ceil(ctx.canvas.width/shapeScale);
	slider = document.getElementById('speedRange');
	slider.oninput = function() { 
		shiftSpeed = this.value;
		shapeScale = Math.floor(baseShapeScale/shiftSpeed)*shiftSpeed;
	 }
	document.getElementById('clown_audio').play();
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
		var continuousShift = (verrucktMode) ? shift/shapeScale : 0.0;
		var factor = Math.pow(i + continuousShift, mainPower)
		currentSize = factor*shapeScale + infinitessimalShift + shift;
		j = numberConcentric - i
		color = colors[(j + colorShift) % colors.length];
		drawTriangle(currentSize, color, canvas, pointCentreX, pointCentreY);
	}
}

function drawSquareCanvas(shift) {
	for (i = numberConcentric; i >= 0; i--) {
		var continuousShift = (verrucktMode) ? shift/shapeScale : 0.0;
		var factor = Math.pow(i + continuousShift, mainPower)
		currentSize = factor*shapeScale + infinitessimalShift + shift;
		j = numberConcentric - i
		color = colors[(j + colorShift) % colors.length];
		drawSquare(currentSize, color, canvas, pointCentreX, pointCentreY);
	}
}

function drawCircleCanvas(shift) {
	for (i = numberConcentric; i >= 0; i--) {
		var continuousShift = (verrucktMode) ? shift/shapeScale : 0.0;
		var factor = Math.pow(i + continuousShift, mainPower)
		currentSize = factor*shapeScale + infinitessimalShift + shift;
		j = numberConcentric - i
		color = colors[(j + colorShift) % colors.length];
		drawCircle(currentSize, color, canvas, pointCentreX, pointCentreY);
	}
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
		document.getElementById('verruckt').innerHTML = "Verrückt";
	} else {
		verrucktMode = true;
		mainPower = 0.75;
		mainFactor = 12;
		numberConcentric = mainFactor*Math.ceil(ctx.canvas.width/shapeScale);
		document.getElementById('verruckt').innerHTML = "Zurück!!!";
	}
}

function drawTriangle(scale, color, canvas, pX, pY) {
	var context = canvas.getContext('2d');
	context.fillStyle = color;
	context.beginPath();
	context.moveTo(pX, pY + scale/Math.pow(3, 0.5));
	context.lineTo(pX + 0.5*scale, pY - scale/2/Math.pow(3, 0.5));
	context.lineTo(pX - 0.5*scale, pY - scale/2/Math.pow(3, 0.5));
	context.fill();
}

function drawSquare(scale, color, canvas, pX, pY) {
	var context = canvas.getContext('2d');
	context.fillStyle = color;
	upperLeftX = pX - 0.5*scale;
	upperLeftY = pY - 0.5*scale;
	context.fillRect(upperLeftX, upperLeftY, scale, scale);
}

function drawCircle(scale, color, canvas, pX, pY) {
	var context = canvas.getContext('2d');
	context.fillStyle = color;
	context.beginPath();
	context.arc(pX,	pY, scale, 0, 2*Math.PI);
	context.fill();
}
