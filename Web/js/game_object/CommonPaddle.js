function CommonPaddle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.speed = 5;	
	this.width = width;
	this.height = height;
}

CommonPaddle.prototype.moveUp = function() {
	this.y -= this.speed;
}

CommonPaddle.prototype.moveDown = function() {
	this.y += this.speed;
}

CommonPaddle.prototype.checkCollision = function () {
	var point = null;

	if (ball.x > this.x - this.width/2 && ball.x < this.x + this.width/2 &&
		ball.y > this.y - this.height/2 && ball.y < this.y + this.height/2) {
		point = {
			x : ball.x, 
			y : ball.y
		}
	}

	return point;
}

CommonPaddle.prototype.executeLogic = function(collisionPoint) {
	// Must be redefined in children in order to add logic to paddle
}

CommonPaddle.prototype.getTexture = function() {
	// Must be redefined in children
}

CommonPaddle.prototype.tick = function() {
	var collisionPoint = this.checkCollision();
	this.executeLogic(collisionPoint);

	if (this.x - this.width/2 < 0) this.x = this.width/2;
	if (this.x + this.width/2 > width) this.x = width - this.width/2;
	if (this.y - this.height/2 < 0) this.y = this.height/2;
	if (this.y + this.height/2 > height) this.y = height - this.height/2;

	ctx.fillStyle = "black";

	if (enhancedGraphics) {
		ctx.fillStyle = this.getTexture();				
	}
	
	ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
	
}