function Paddle(x, y, width, height) {
	CommonPaddle.call(this, x, y, width, height);

	this.direction = 0;
}

Paddle.prototype = new CommonPaddle();
Paddle.prototype.constructor = Paddle;

Paddle.prototype.control = function(eventCode, isDown) {
	if (eventCode == 87 || eventCode == 38) {
		if (isDown) {
			this.direction = -1;					
		}
		else if (this.direction == -1) {
			this.direction = 0;
		}
	}
	else if (eventCode == 83  || eventCode == 40) {
		if (isDown) {
			this.direction = 1;					
		}
		else if (this.direction == 1) {
			this.direction = 0;
		}
	}
}

Paddle.prototype.executeLogic = function(collisionPoint) {
	if (this.direction < 0) {
		if (game3d == null) {
			this.moveUp();
		}
		else {
			this.moveDown();	
		}
	}
	else if (this.direction > 0) {
		if (game3d == null) {
			this.moveDown();
		}
		else {
			this.moveUp();
		}
	}

	if (collisionPoint != null) {
		ball.paddleHit();
	}
}

Paddle.prototype.getTexture = function() {
	return "#087070";
}