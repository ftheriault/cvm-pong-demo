function GUI() {
	this.scorePlayer = 0;
	this.scoreAI = 0;
}

GUI.prototype.tick = function() {
	ctx.font = "40px Courier";
	ctx.fillStyle = "black";
	ctx.fillText("" + this.scoreAI, width/2 - 60, 60);
	ctx.fillText("" + this.scorePlayer, width/2 + 40, 60);
}