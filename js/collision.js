function momFruitCollision()
{
	for(var i=0; i<fruit.num; i++)
	{
			if(!data.gameOver)
			{
					if(fruit.alive[i])
				{
						//calculate length
						var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
						if (l<900)
						{
								 //fruit eaten
								 fruit.dead(i);
								 data.fruitNum++;
								 mom.momBodyCount++;
								 if(mom.momBodyCount > 7)
								 		mom.momBodyCount = 7;
								 if(fruit.fruitType[i] == "blue")
								 {
								 		data.double = 2;
								 }
								wave.born(fruit.x[i], fruit.y[i]); //碰撞特效
						}
				}
			}
			
	}
}

//mom baby collsion
function momBabyCollision()
{
	if(data.fruitNum > 0 && !data.gameOver)
	{
			var l = calLength2(mom.x, mom.y, baby.x, baby.y);
			if (l < 900) 
			{
				//baby recover
				baby.babyBodyCount = 0;
				// data >= 0
				//data.reset();
				mom.momBodyCount = 0;
				data.addScore();
				swave.born(baby.x, baby.y);
			}
			
	}

}