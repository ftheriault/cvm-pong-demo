var ctx = null;
var canevas = null;
var spriteList = [];

var width = 800;
var height = 400;
var wallThickness = 6;
var ballRadius = 8;

var paddleWidth = 6;
var paddleHeight = 60;
var paddleOffset = 40;

var ball = null;
var gui = null;
var paddle = null;

var enhancedGraphics = false;
var enhancedParticle = false;

//Particle system
var proton = null;
var emitter = null;
var emitterLeftPaddle = null;
var emitterRightPaddle = null;

$(function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	paddle = new Paddle(paddleOffset, height/2, paddleWidth, paddleHeight);
	spriteList.push(paddle);
	spriteList.push(new PaddleAI(width - paddleOffset, height/2, paddleWidth, paddleHeight));
	
	spriteList.push(new Wall(width/2, 0, width, wallThickness, function () { sideWallCollision() }));
	spriteList.push(new Wall(width/2, height, width, wallThickness, function () { sideWallCollision() }));
	spriteList.push(new Wall(0, height/2, wallThickness, height, function () { roundWin(1, 0) } ));
	spriteList.push(new Wall(width, height/2, wallThickness, height, function () { roundWin(0, 1) } ));

	ball = new Ball(ballRadius, function () { ballHitPaddle() });
	spriteList.push(ball);

	gui = new GUI();
	spriteList.push(gui);

	window.requestAnimationFrame(tick);

	document.onkeydown = function (e) {
		paddle.control(e.which, true);
	}

	document.onkeyup = function (e) {
		paddle.control(e.which, false);
	}


	initParticle();
});

function createPaddleEmitter(direction)
{
	//Paddle emitter
	var myEmitter = new Proton.Emitter();
	//set Rate
	myEmitter.rate = new Proton.Rate(Proton.getSpan(10, 20), 0.1);
	//add Initialize
	myEmitter.addInitialize(new Proton.Radius(3, 6));
	myEmitter.addInitialize(new Proton.Life(1, 2));
	//myEmitter.addInitialize(new Proton.V(new Proton.Span(1,3), new Proton.Span(0, 10), 'vector'));

	if(direction ==  "left")
	{
		myEmitter.addInitialize(new Proton.V(new Proton.Span(0.5, 3), new Proton.Span(90, 45, true), 'polar'));
	}else
	{
		myEmitter.addInitialize(new Proton.V(new Proton.Span(0.5, 3), new Proton.Span(-90, 45, true), 'polar'));
	}
	//Behavior
	myEmitter.addBehaviour(new Proton.Gravity(3));
	myEmitter.addBehaviour(new Proton.Color('#ffffff', ['#ff0000', '#555500'], Infinity, Proton.easeOutSine));
	myEmitter.addBehaviour(new Proton.Alpha(1, 0.1));
	myEmitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, canvas.width, canvas.height), 'bound'));
	myEmitter.damping = 0.02;

	//set emitter position
	myEmitter.p.x = canvas.width / 2;
	myEmitter.p.y = canvas.height / 2;

	return myEmitter;
}

function initParticle()
{
	proton = new Proton();

	//Wall emitter
	emitter = new Proton.Emitter();
	//set Rate
	emitter.rate = new Proton.Rate(Proton.getSpan(20, 30), 0.1);
	//add Initialize
	emitter.addInitialize(new Proton.Radius(2, 4));
	emitter.addInitialize(new Proton.Life(1, 2));
	emitter.addInitialize(new Proton.V(new Proton.Span(1, 3), new Proton.Span(0, 360), 'polar'));
	//Behavior
	emitter.addBehaviour(new Proton.Gravity(8));
	emitter.addBehaviour(new Proton.Color('#FF0026', ['#ffff00', '#ffff11'], Infinity, Proton.easeOutSine));
	emitter.addBehaviour(new Proton.Alpha(1, 0.5));
	emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, canvas.width, canvas.height), 'bound'));
	emitter.damping = 0.04;

	//set emitter position
	emitter.p.x = canvas.width / 2;
	emitter.p.y = canvas.height / 2;
	//add emitter to the proton
	proton.addEmitter(emitter);

	//add emitter to the proton
	emitterLeftPaddle = createPaddleEmitter("left")
	proton.addEmitter(emitterLeftPaddle);

	emitterRightPaddle = createPaddleEmitter("right")
	proton.addEmitter(emitterRightPaddle);

	// add canvas renderer
	var renderer = new Proton.Renderer('canvas', proton, canvas);
	renderer.start();
}

function roundWin(playerPt, aiPt) {
	gui.scorePlayer += playerPt;
	gui.scoreAI += aiPt;

	ball.newRound();
}

function sideWallCollision() {
	if(enhancedParticle)
	{
		emitter.p.x = ball.x;
		emitter.p.y = ball.y;
		emitter.emit();
		setTimeout(function(){emitter.stopEmit()},200);

		if(ball.y < canvas.height / 2)
		{
			$( ".container" ).effect( "shake", {
				direction : "up",
				distance : "10",
				times : "1"
			} );
		}else
		{
			$( ".container" ).effect( "shake", {
			direction : "down",
			distance : "10",
			times : "1"
		} );
		}
	}
}

function ballHitPaddle() {
	if(enhancedParticle)
	{
		emitterLeftPaddle.p.x = ball.x;
		emitterLeftPaddle.p.y = ball.y;

		emitterRightPaddle.p.x = ball.x;
		emitterRightPaddle.p.y = ball.y;

		if(ball.x > canvas.width / 2)
		{
			$( ".container" ).effect( "shake", {
				direction : "right",
				distance : "10",
				times : "1"
			} );
			emitterRightPaddle.emit();
			setTimeout(function(){emitterRightPaddle.stopEmit()},200);
		}else
		{
			$( ".container" ).effect( "shake", {
			direction : "left",
			distance : "10",
			times : "1"
			} );
			emitterLeftPaddle.emit();
			setTimeout(function(){emitterLeftPaddle.stopEmit()},200);
		}

	}
}


function tick() {
	ctx.clearRect(0, 0, width, height);
	proton.update();

	for (var i = 0; i < spriteList.length; i++) {
		spriteList[i].tick();
	}

	window.requestAnimationFrame(tick);
}

function startPhysics1() {
	enhancedParticle = true;
}

function startGraphics() {
	$("html").addClass("graphics");
	enhancedGraphics = true;

	setTimeout(dogeAnimation, 2000);
}

function startPhysics2() {

}