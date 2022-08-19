var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;

  doorsGroup = new Group();
  climbersGroup = new Group();

  invisibleBlockGroup = new Group();

  spookySound.play();
}

function draw() {
  background(0);
  if (gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown ("space")){
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY +1;
    if(keyDown ("left")){
      ghost.x = ghost.x  -3;
    }
    if(keyDown ("right")){
      ghost.x = ghost.x  +3;
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;

    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600||ghost.y < 0){
      ghost.destroy();
      gameState = "end";
    }

    
    spawnDoors();
    drawSprites();
  }
  if (gameState === "end"){
    
    fill("yellow");
    textSize (30);
    text ("Game Over", 250,300);
  }

    
  
}


function spawnDoors(){
if(frameCount%240 === 0){
  var door = createSprite(200,-50);
  door.addImage (doorImg);
  door.velocityY = 2;
  door.x = Math.round(random(100,400));
  door.lifetime = 300;

  doorsGroup.add(door);
  var climber = createSprite(200,10);
  climber.addImage (climberImg);
  climber.velocityY = 2;
  climber.x = door.x;
  climber.lifetime = 300;
  
  climbersGroup.add(climber);

  door.depth = ghost.depth;
  ghost.depth += 1;

  var invisibleBlock = createSprite(200,15);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
  invisibleBlock.velocityY = 2;
  invisibleBlock.x = door.x;
  invisibleBlock.lifetime = 300;
  // invisibleBlock.visible = false;
  
  invisibleBlockGroup.add(invisibleBlock);
}
  
}