var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var placar = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.play ();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group ();
  climbersGroup = new Group ();
  invisibleBlockGroup = new Group ();
  ghost = createSprite (200, 200);
  ghost.addImage ("morte", ghostImg);
  ghost.scale = 0.35;
  
}

function draw() {
  background("black");
  
   if (gameState === "play"){
    garagem();
  
    if(tower.y > 400){
      tower.y = 300
    }
    if (keyDown("space")){
      ghost.velocityY = -10;
    }
    ghost.velocityY += 1;
   if (keyDown("right")){
     ghost.x += 3;
   }
   if (keyDown ("left")){
     ghost.x -= 3;
   }
   if (climbersGroup.isTouching(ghost)){
     ghost.velocityY = 0;
   } 
   if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
     gameState = "life";
   }
   placar += Math.round (frameRate()/60);
   drawSprites();
   textSize (30);
   fill ("white");
   text ("Pontuação:"+ placar, 20, 30);
   }

   if (gameState === "life"){
    textSize (30);
    fill ("white");
    text ("Pontuação:"+ placar, 20, 30);
     text ("Game Over", 230, 250);
     doorsGroup.setVelocityYEach (0);
     climbersGroup.setVelocityYEach (0);
     invisibleBlockGroup.setVelocityYEach (0);
     ghost.destroy ();

   }
   
}

function garagem (){
 if (frameCount%240 === 0){
   door = createSprite (200, -50);
   door.addImage ("porta", doorImg);
   door.velocityY = 1;
   door.x = Math.round (random(120, 400));
   door.lifetime = 800;
   doorsGroup.add (door);
   ghost.depth = door.depth;
   ghost.depth += 1;
   
   climber = createSprite (200, 10);
   climber.addImage ("grade", climberImg);
   climber.velocityY = 1;
   climber.x = door.x;
   climber.lifetime = 800
   climbersGroup.add (climber);

   invisibleBlock = createSprite (200, 15);
   invisibleBlock.width = climber.width;
   invisibleBlock.height = 2;
   invisibleBlock.x = door.x;
   invisibleBlock.velocityY = 1;
   invisibleBlock.visible = false;
   invisibleBlock.lifetime = 800;
   invisibleBlockGroup.add (invisibleBlock);

 }
}