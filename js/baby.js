var babyObj = function()
{
	this.x;
	this.y;
	//11.definite angle attribute
	this.angle;
	//2.load the images sourses
	//2.first definite the var about eye body tail
	this.babyEye = new Image();
	//this.babyBody = new Image();
	

	this.babyTailTimer = 0;
	this.babyTailCount = 0;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}
babyObj.prototype.init = function()
{
	this.x = canWidth*0.5 - 50;
	this.y = canHeight*0.5 + 50;
	//11.init angle
	this.angle = 0;
	//2.load the sourse for init
	
	//this.babyEye.src = "./src/babyEye0.png";
	//this.babyBody.src = "./src/babyFade0.png";
	//this.babyTail.src = "./src/babyTail0.png"
}
babyObj.prototype.draw = function()
{
	    //9.let baby move following mom with lerp x,y
	    this.x = lerpDistance(mom.x + 30, this.x, 0.98);
	    this.y = lerpDistance(mom.y + 30, this.y, 0.98);
	    //10. for mom's angle, we caculate the angle between mouse and mom with their coord different, and mom's angle following the angle, then rotate can to complete
	    //11. definite two var
	    var deltaY = mom.y - this.y;
	    var deltaX = mom.x - this.x;
	    //12. caculate angle
	    var beta = Math.atan2(deltaY, deltaX) + Math.PI;//-PI,PI
	    this.angle = lerpAngle(beta, this.angle, 0.7);

	    //catoon: baby tail count
        this.babyTailTimer += deltaTime;
		if(this.babyTailTimer > 50) 
		{
		// babyTail计数
			this.babyTailCount = (this.babyTailCount + 1) % 8;   //让它一直在0-8之间
			this.babyTailTimer %= 50;    
		}

		//baby eye
		this.babyEyeTimer += deltaTime;
		if(this.babyEyeTimer > this.babyEyeInterval)
		{
			this.babyEyeCount = (this.babyEyeCount + 1) % 2;
			this.babyEyeTimer %= this.babyEyeInterval;//to setup 0 again

			if (this.babyEyeCount == 0) 
			{
					this.babyEyeInterval = Math.random()/*(0<= & <1)*/ * 1500 +2000;//(2500-3500)
			}else
			{
					this.babyEyeInterval = 200;
			}
		}

		//baby body
		this.babyBodyTimer += deltaTime;
		if(this.babyBodyTimer > 300)
		{
			this.babyBodyCount = this.babyBodyCount + 1;
			this.babyBodyTimer %= 300;
			if(this.babyBodyCount > 19)
			{
					this.babyBodyCount = 19;
					//game over
					data.gameOver = true;
			}
		}

			//1.ctx1
			//7.limit to apply baby only
		ctx1.save();
			//3.draw the baby
			//6.translate the original point value
		ctx1.translate(this.x, this.y);
		//13. rotate can
		ctx1.rotate(this.angle);

        var babyTailCount = this.babyTailCount;

		//7.make this.x and this.y as (0,0)
		//8.first draw tail (will be in the bottom layer
		ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width*0.5 + 20, -babyTail[babyTailCount].height*0.5);
		//8.second draw body(will be in the middle layer)
		var babyBodyCount = this.babyBodyCount;
		ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width*0.5, -babyBody[babyBodyCount].height*0.5 /*7.make the image center as o,0 point*/);
		//8.last draw eye(will be in the top layer)
		var babyEyeCount = this.babyEyeCount;
		ctx1.drawImage(babyEye[babyEyeCount], /*7.this.x, this.y*/-babyEye[babyEyeCount].width*0.5, -babyEye[babyEyeCount].height*0.5 /*7.make the image center as o,0 point*/);
		//4. imput the draw methon into main.js loop
		//5. no baby show up, print to debug
		//5.console.log(this.x);
		//5.the resule is 750 which means x value is too big
		//5.for get *0.5 to ensure it is in the can center

		ctx1.restore();
}
//1.the above finish the baby Object construction
//1.then go to main.js to finish baby definition(var & init)