var trex, ground, gameOver, restart,cloud,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,trexLoad,trexCollide,trexCollideLoad, groundLoad, barrier, cloudLoad, obstacle1Load, obstacle2Load, obstacle3Load, obstacle4Load, obstacle5Load, obstacle6Load,obstacle, cloudGroup,score, gameState, gameOverLoad, highScore, restartLoad,PLAY,END;
function preload(){
  trexLoad=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundLoad=loadImage("ground2.png")
  cloudLoad=loadImage("cloud.png");
  obstacle1Load=loadImage("obstacle1.png");
  obstacle2Load=loadImage("obstacle2.png");
  obstacle3Load=loadImage("obstacle3.png");
  obstacle4Load=loadImage("obstacle4.png");
  obstacle5Load=loadImage("obstacle5.png");
  obstacle6Load=loadImage("obstacle6.png");
  gameOverLoad = loadImage("gameOver.png");
  restartLoad = loadImage("restart.png");
  trexCollideLoad=loadImage("trex_collided.png");
}
function setup() {
  createCanvas(400,400);
  
  PLAY=1;
  END=0;
  gameState=PLAY;
  trex = createSprite(50,360,10,40);
  trex.addAnimation("trex",trexLoad);
  trex.scale=0.6;
  
  ground=createSprite(600,378);
  ground.addImage("ground",groundLoad);
  ground.x=ground.width/2;
  barrier=createSprite(600,388,1200,10);
  barrier.visible=false;
  
  cloudGroup=new Group();
  obstacleGroup = new Group();
  
  score = 0;
  gameOver = createSprite(200,200);
  gameOver.addAnimation("gameOver",gameOverLoad);
  gameOver.visible=false;
  restart = createSprite(200,250);
  restart.addAnimation("restart",restartLoad);
  restart.visible=false;
  restart.scale=0.5;
  
  highScore=0;
}

function draw() {
  if(score>=0&&score<400){
    background(20,228,93); 
  }
  if(score>=400 && score<800){
    background("black");
    fill(255,185,0);
    circle(200,30,40)
  }
  if(score>=800){
    background(20,228,93); 
  }
  //console.log(trex.y);
  
  trex.debug=false;
  
  
  trex.velocityY=trex.velocityY+0.8;
  createEdgeSprites();
  trex.collide(barrier);
  drawSprites();
  
  
  
  if(gameState===PLAY){
    
    cloudSpawn();
    obstacleSpawn();
    score = score+Math.round(getFrameRate()/60);
    ground.velocityX=-(4+3*score/100);
    if(keyDown("space")&&trex.y>354){
    trex.velocityY=-13;  
    }
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    if(obstacleGroup.isTouching(trex)){
      gameState=END;
    }
  }
  else if(gameState===END){
    restart.visible=true;
    gameOver.visible=true;
    ground.velocityX=0;
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    trex.addImage("trex",trexCollideLoad);
    if(score>highScore){
      highScore=score;
    }
  }
  stroke("Blue");
  fill("Blue");
  textSize(18);
  text("Score: "+score,300,20);
  text("High Score: "+highScore,20,20);
  if(mousePressedOver(restart)){
    Reset();
  }
}

function cloudSpawn(){
  if(frameCount %60===0){
    cloud=createSprite(400,200);
    cloud.addImage("cloud",cloudLoad);
    cloud.velocityX=-3;
    cloud.y=Math.round(random(100,150));
    cloud.lifetime=134;
    cloudGroup.add(cloud);
  }
}
function obstacleSpawn(){
  if(frameCount %70===0){
    obstacle = createSprite(400,360);
    obstacle.velocityX=-(4+3*score/100);
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:
        obstacle.addImage(obstacle1Load);
        break;
      case 2:
        obstacle.addImage(obstacle2Load);
        break;
      case 3:
        obstacle.addImage(obstacle3Load);
        break;
      case 4:
        obstacle.addImage(obstacle4Load);
        break;
      case 5:
        obstacle.addImage(obstacle5Load);
        break;
      case 6:
        obstacle.addImage(obstacle6Load);
        break;
        default:
          break;
    }
    obstacle.scale=0.5;
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
    
  }    
}

function Reset(){
  gameState=PLAY;
  score=0;
  cloudGroup.destroyEach();
  obstacleGroup.destroyEach();
  gameOver.visible=false;
  restart.visible=false;
  trex.addAnimation("trex",trexLoad);
}
