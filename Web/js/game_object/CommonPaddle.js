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

	if (game3d == null) {
		ctx.fillStyle = "black";

		if (enhancedGraphics) {
			ctx.fillStyle = this.getTexture();				
		}
		
		ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
	}
	else {
		if (this.shape3d == null) {
			var geometry = new THREE.BoxGeometry( this.width, this.height, 30 );
			// var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
			var material = new THREE.MeshLambertMaterial({
			  color: 0x6cbdd0
			});
			this.shape3d = new THREE.Mesh( geometry, material );
			this.shape3d.position.z = 0;
			game3d.scene.add( this.shape3d );
		}

		this.shape3d.position.x = this.x - width/2;
		this.shape3d.position.y = this.y;
	}
}