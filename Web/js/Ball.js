function Ball(radius) {
	this.speed = 4;
	this.radius = radius;
	this.newRound();
}

Ball.prototype.newRound = function() {
	this.x = Math.random() * width/2 + 40;
	this.y = Math.random() * height/2 + 40;
	this.angle = Math.random() * Math.PI/2 + Math.PI/4; // cadran 1 and 4 (0 to 180)
	this.goingRight = true;	
}

Ball.prototype.paddleHit = function () {
	this.goingRight = !this.goingRight;
	this.angle += Math.random() * (Math.PI/5) - Math.PI/10;
}

Ball.prototype.tick = function() {
	var x = Math.sin(this.angle % 90) * this.speed;
	var y = Math.cos(this.angle % 90) * this.speed;

	if (this.goingRight) {
		this.x += x;
	}
	else {
		this.x -= x;
	}

	if (this.angle > 90) {
		this.y += y;	
	}
	else {
		this.y -= y;
	}

	// drawing ball
	ctx.save();
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
	ctx.restore();

	ctx.fillStyle = '#black';
	ctx.fill();
}