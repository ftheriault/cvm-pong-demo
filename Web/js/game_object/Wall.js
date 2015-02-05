function Wall(x, y, width, height, callback) {
	CommonPaddle.call(this, x, y, width, height)

	this.callback = callback;
}

Wall.prototype = new CommonPaddle();
Wall.prototype.constructor = Wall;

Wall.prototype.executeLogic = function(collisionPoint) {

	if (collisionPoint != null) {
		ball.angle = Math.PI - ball.angle;

		if (this.callback != null) {
			this.callback();
		}
	}
}