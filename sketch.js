
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, ObstacleGroup;
var score;
var ground;
var PLAY = 1;
var END = 0;
var gameState = 1;
var survival_Time = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400,350,800,10);
  ground.veloctiyX = -4;
  ground.x = ground.width/2;

  ObstacleGroup = new Group();
  FoodGroup = new Group();
  
}


function draw() {

  if (gameState === PLAY){
     background("white");
       
   if(keyDown("space")){
    monkey.y = 120;
    monkey.velocityY = 5;   
     
  }
    survival_Time = Math.ceil(frameCount/frameRate());
    text("survival_Time"+ survival_Time, 100, 50);
    stroke("white");
    textSize(40);
  
  monkey.collide(ground);
  
    bananas();
    obstacles();
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    }
      if(ObstacleGroup.collide(monkey)){
      gameState = END;
    }
  }
  if(gameState === END){
    background("black");
    
    text("MONKEY CAUGHT", 150, 200);
    stroke("white");
    
    ObstacleGroup.visible = false;
    
    FoodGroup.visible = false;
    
    ground.visible = false;
    
    monkey.visible = false;
    
    ObstacleGroup.destroyEach();
    
    FoodGroup.destroyEach();
  }
 drawSprites(); 
}
  
  
 

function bananas(){
  if(World.frameCount%80 === 0){
  banana = createSprite(450,20);
  banana.addImage(bananaImage);
  banana.velocityX = -7;
  banana.y = Math.round(random(120,200));
  banana.setLifetime = 100;
  banana.scale = 0.1;
  FoodGroup.add(banana);
  }

}

function obstacles(){
  if(World.frameCount%80 === 0){
    obstacle = createSprite(420,330,800,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -9;
    obstacle.scale = 0.1;
    obstacle.setLifetime = 100;
    ObstacleGroup.add(obstacle);
  }
}




