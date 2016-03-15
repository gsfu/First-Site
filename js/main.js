var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;

var mom;
document.body.onload = game;
function game()
{
	    init();
	    lastTime = Date.now();
	    deltaTime = 0;
	    gameloop();
}


function init()
{
	//canvas context
	can1 = document.getElementById("canvas1");//fishes, dust, UI, circle
	ctx1 = can1.getContext("2d");
	can2 = document.getElementById("canvas2");//backgroud, ane, fruits
	ctx2 = can2.getContext("2d");

	bgPic.src = "./src/background.jpg";
	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

}
function gameloop()
{
        window.requestAnimationFrame(gameloop);
		var now = Date.now();
		deltaTime = now - lastTime;
		lastTime = now;

		drawBackground();
		ane.draw();
		fruitMonitor();
		fruit.draw();	

		ctx1.clearRect(0, 0, canWidth,canHeight);//
		mom.draw();	
}