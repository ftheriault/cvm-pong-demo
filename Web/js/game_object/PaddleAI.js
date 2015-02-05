function PaddleAI(x, y, width, height) {
	CommonPaddle.call(this, x, y, width, height)
}

PaddleAI.prototype = new CommonPaddle();
PaddleAI.prototype.constructor = PaddleAI;

PaddleAI.prototype.executeLogic = function(collisionPoint) {
	if (collisionPoint != null) {
		ball.paddleHit();
	}
	
	if (Math.abs(ball.y - this.y) > 4) {
		if (ball.y < this.y) {
			this.y -= this.speed;
		}
		else {
			this.y += this.speed;	
		}
	}
}