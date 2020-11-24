var grassBG;
var obstacle;
var ground;
var score;
var PLAY= 1;
var END= 0;
var gameState= PLAY;

function preload()
{
 monkeyImage =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
 grassBI = loadImage("grass1.png");
 monkeyStop = loadImage("sprite_0.png");
}

function setup() 
{
 createCanvas(600, 400);
 score= 0;

 grassBG= createSprite(300, 80, 300, 200);
 monkey= createSprite(100, 390, 50, 50);
 ground= createSprite(300, 390, 600, 5);
  
 ground.shapeColor= "lightgreen";
  
 monkey.addAnimation("running", monkeyImage);
 grassBG.addImage(grassBI);
  
 monkey.scale= 0.15;
 grassBG.scale= 5.3;

 grassBG.velocityX= -1;
 ground.visible= false;
 
 obstacleGroup= new Group();
 bananaGroup= new Group();
}

function draw() 
{
 background("skyblue");
 if(gameState=== PLAY)
 {
   spawnBanana();
   spawnObstacles();
   
   score= score + Math.round(frameCount/60)

   if(grassBG.x < 0)
   {
    grassBG.x= 300
   }

   if(keyDown("space") && monkey.y > 300)
   {
    monkey.velocityY= -10;
   }
   monkey.velocityY = monkey.velocityY + 0.5;
   
   if(monkey.isTouching(bananaGroup))
   {
    bananaGroup.destroyEach();
   }
   
   if(monkey.isTouching(obstacleGroup))
   {
    gameState= END;
   }
 }
 else if(gameState=== END)
 {
  grassBG.velocityX= 0;
  grassBG.destroy();
   
  obstacleGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);;

  text("Game Over: Press 'R' to restart", 170, 200, fill("black"), textSize(20));
  monkey.changeAnimation(monkeyStop);
  if(keyDown("r"))
  {
   score= 0;
   gameState= PLAY;
   monkey.changeAnimation(monkeyImage);
   grassBG.addImage(grassBI);
   grassBG= createSprite(300, 80, 300, 200);
   grassBG.addImage(grassBI);
   grassBG.scale= 5.3
   obstacleGroup.destroyEach();
   bananaGroup.destroyEach();
   grassBG.velocityX= -1;
    
   if(grassBG.x < 0)
   {
    grassBG.x= 300
   }
   gameState= PLAY;
  }
 }
  
 monkey.depth= grassBG.depth + 1;
 monkey.collide(ground);
 drawSprites(); 
 text("Survival time: " + score, 10, 10, fill("black"), textSize(20));
}

function spawnObstacles()
{
 if(frameCount%100 === 0)
 {
  var obstacle= createSprite(600, 370, 50, 50);
  obstacle.addImage(obstacleImage);
  obstacle.scale= 0.1;
  obstacle.velocityX= -10;
  obstacle.lifetime = 60;
  obstacleGroup.add(obstacle);
 }
  
}

function spawnBanana()
{
 if(frameCount%80 === 0)
 {
  var rand= Math.round(random(350, 200));
  var banana= createSprite(600, rand, 50, 50);
  banana.addImage(bananaImage);
  banana.scale= 0.1;
  banana.velocityX= -10;
  banana.lifetime = 60
  bananaGroup.add(banana)
 }
}
