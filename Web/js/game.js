var ctx = null;
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

$(function() {
	ctx = document.getElementById("canvas").getContext("2d");

	paddle = new Paddle(paddleOffset, height/2, paddleWidth, paddleHeight);
	spriteList.push(paddle);
	spriteList.push(new PaddleAI(width - paddleOffset, height/2, paddleWidth, paddleHeight));
	
	spriteList.push(new Wall(width/2, 0, width, wallThickness, null));
	spriteList.push(new Wall(width/2, height, width, wallThickness, null));
	spriteList.push(new Wall(0, height/2, wallThickness, height, function () { roundWin(1, 0) } ));
	spriteList.push(new Wall(width, height/2, wallThickness, height, function () { roundWin(0, 1) } ));

	ball = new Ball(ballRadius);
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
});

function roundWin(playerPt, aiPt) {
	gui.scorePlayer += playerPt;
	gui.scoreAI += aiPt;

	ball.newRound();
}

function tick() {
	ctx.clearRect(0, 0, width, height);

	for (var i = 0; i < spriteList.length; i++) {
		spriteList[i].tick();
	}

	window.requestAnimationFrame(tick);
}