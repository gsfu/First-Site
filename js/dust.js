var dustObj = function()
{
	this.x = [];//坐标
	this.y = [];//坐标
	this.amp = [];//振幅
	this.NO = [];//指定图片

	this.alpha;//角度
}
dustObj.prototype.num = 30;
dustObj.prototype.init = function()
{
	//遍历初始化每一个变量
	for(var i = 0; i < this.num; i++)
	{
		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i] = 20 + Math.random() * 15;
		this.NO[i] = Math.floor(Math.random() * 7);  // [0,7)包括0，不包括7。floor取整
		//console.log(this.NO[i]);
	}
		this.alpha = 0;
}
dustObj.prototype.draw = function()
{
		this.alpha += deltaTime * 0.0008;//copy from ane
		var l = Math.sin(this.alpha);
		for(var i = 0; i < this.num; i++)
		{
			var no = this.NO[i];
			//console.log(no);
			var num = this.x[i] + this.amp[i] * l
			//console.log(num);
			ctx1.drawImage(dustPic[no], num, this.y[i]);
			//ctx1.drawImage(dustPic[no], this.x[i] + this.amp[i] * l, this.y[i]);
		}
}