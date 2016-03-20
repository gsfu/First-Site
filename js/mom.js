var momObj = function()
{
	this.x;
	this.y;
	this.angle;
	this.bigEye = new Image();
	this.bigBody = new Image();
	

	this.momTailTimer = 0;
	this.momTailCount = 0;
}
momObj.prototype.init = function()
{
	this.x = canWidth*0.5;
	this.y = canHeight*0.5;
	this.angle = 0;
	this.bigEye.src = "./src/bigEye0.png";
	this.bigBody.src = "./src/bigSwim0.png";
	//this.bigTail.src = "./src/bigTail0.png"
}
momObj.prototype.draw = function()
{
		//lerp x,y
		this.x = lerpDistance(mx, this.x, 0.9);
		this.y = lerpDistance(my, this.y, 0.9);

		//delta angle
		//Math.atan2(y,x)
		var deltaY = my - this.y;
		var deltaX = mx - this.x;
		var beta = Math.atan2(deltaY,deltaX); //-PI, Pi

		//lerp angle
		this.angle = lerpAngle(beta, this.angle, 0.9);

		this.momTailTimer += deltaTime;
		if (this.momTailTimer > 50)
		{
			this.momTailCount = (this.momTailCount + 1) % 8;
			this.momTailTimer %= 50;
		}

		ctx1.save();
		ctx1.translate(this.x, this.y);
		ctx1.rotate(this.angle);
		
		var momTailCount = this.momTailCount;
		//ctx1.drawImage(bigTail[bigTailCount],-bigTail[bigTailCount].width*0.5 + 30, -bigTail[bigTailCount].height*0.5);
		ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width*0.5 + 30, -momTail[momTailCount].height*0.5);
		ctx1.drawImage(this.bigBody,-this.bigBody.width*0.5, -this.bigBody.height*0.5);
		ctx1.drawImage(this.bigEye, -this.bigEye.width*0.5, -this.bigEye.height*0.5);

		ctx1.restore();
}