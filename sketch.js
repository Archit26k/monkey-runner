var PLAY = 1;
var END = 2;
var gameState = PLAY;

var monkey , monkey_running,monkey1
var back , backImage
var banana ,bananaImage, obstacle, obstacleImage
var pipe , pipeImage
var fruitGroup, obstacleGroup
var jail , jailImage

var survivalTime = 0;
var slider
var score = 0;

var restart , restartImage ;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png"
                                           )
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  pipeImage = loadImage("pip.png") ; 
  jailImage = loadImage("j.png");
  backImage = loadImage("backG.png");
  restartImage = loadImage("res.png")
  monkey1 = loadImage("sprite_2.png")
  
}



function setup() {
createCanvas(500,175)
  back = createSprite(500,30,30)
  back.addImage(backImage);
  back.scale = 2;


  monkey = createSprite(50,100,50,50)
  monkey.addAnimation("collided",monkey1)
   monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.11
monkey.debug = false
  
  pipe = createSprite(210,300 , 0,10)

  pipe.scale = 1;
  pipe.debug = false;
  pipe.setCollider("rectangle" , 0,-120,600,25,0)
  pipe.visible = false
  
  slider = createSlider(0,16,0);

  
  jail = createSprite(50,100,50,50)
  jail.addImage(jailImage);
  
  obstacleGroup = new Group()
  fruitGroup = new Group()

  restart = createSprite(250,90,50,50)
    restart.addImage(restartImage)
    restart.scale = 0.5;
  
}

function draw() {
  background(180);
  
    
  
  
  if(gameState === PLAY)
  {
    
    restart.visible = false;
    
    if(monkey.isTouching(fruitGroup))
  {
  
      fruitGroup.destroyEach()   
      score = score+1
     
  } 
    
    if(monkey.isTouching(obstacleGroup))
  {
  
      gameState = END
     
  } 
    
    
      if(jail.y <0){
        
         monkey.changeAnimation("running",monkey_running)
        
        
     spawnObstacles()
    fruits() 
   
     back.velocityX = -(2 + 2* survivalTime/100)
  
       survivalTime = survivalTime + Math.round(getFrameRate()/60);
        
          
  
     
      } 
        
   if (back.x < 0){
      back.x = back.width/1;
    }
 
  
     monkey.velocityY = monkey.velocityY + 0.8
    monkey . collide(pipe);
    
    jail.velocityY = -slider.value()
  jail.collide(pipe)
    
   if(keyDown("space")&& monkey.y >= 133) {
       monkey.velocityY = -12;
    }
    
  
    
    
     
    
  }else if(gameState === END)
  {
    back.velocityX = 0;
    monkey.collide(pipe)
    
    monkey.changeAnimation("collided",monkey1)
    
    obstacle.lifetime = -1
    obstacle.velocityX = 0
    
    banana.lifetime = -1
    banana.velocityX = 0;
    
    restart.visible = true ;
    
    if(mousePressedOver(restart)){
      reset()
    }
    
  }
  
  
  
  
   
  
   
  
  console.log(monkey.y)
  
 
  
  
  
  
  if(jail.y <0){
    
      
    
  }
    
  
       

drawSprites()  
  
textSize(20)
stroke(255,155,100)  
fill(100,155,255)
text("Survival Time :"+survivalTime,300,20) 
  text("Score :"+score,150,20) 
  
}

function reset()
{
  score = 0;
  survivalTime = 0;
 monkey.changeAnimation("running",monkey_running)
  gameState = PLAY;
  obstacleGroup.destroyEach();
  fruitGroup.destroyEach()
  
}




function spawnObstacles()
{
    if (frameCount % 50 === 0){
   obstacle = createSprite(500,130,10,40);
   obstacle.debug = false
   obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
    
    obstacle.velocityX = -(6 + survivalTime/100);
   obstacle.addImage(obstaceImage);
   obstacle.scale = 0.10
     obstacle.lifetime = 83
   obstacleGroup.add(obstacle);
    }
}

function fruits()
{
  if (frameCount % 80 === 0)
  {
    banana = createSprite(500,24,50,50)
    banana.debug = false;
    banana.y = Math.round(random(80,100))
    banana.addImage(bananaImage);
    banana.scale =0.10
    banana.velocityX = -(6 + survivalTime/100);
    banana.lifetime =  83
    fruitGroup.add(banana)
    
  }
}



