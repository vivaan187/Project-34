const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Composite = Matter.Composite;
const Composites = Matter.Composites;

var engine, world;
var canvas;

//Image variables
var heli_img,bullet_img;

//Environment variables
var ground;
var false_ground;
var mountain;
var launch_tower,launch_pad;
var building1,building2,landing_pad;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
var falling_rocks1,falling_rocks2,falling_rocks3,falling_rocks4;

//Collision detector variables
var heli_detect,bullet_detect,enemy_def1_detect,enemy_def2_detect,enemy_def3_detect,enemy_heli_detect1,enemy_heli_detect2,enemy_jet_detect1,enemy_jet_detect2;
var heli_crash_g = false;

//Helicopter variables
var helicopter,bullets,bombs,ammo = 100;
var engine_start = 0;
var barrier = 1064,velocityX1 = 0;

//Enemy air defense variables
var enemy_def1,enemy_def2,enemy_def3

//Enemy helicopter variables
var enemy_helicopter1,enemy_helicopter2;

//Enemy jet variables
var enemy_jet1,enemy_jet2;


function preload () {

  heli_img = loadImage("helicopter2-removebg-preview.png");
  bullet_img = loadImage('Bullet1.png')

} 

function setup () {

  canvas = createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;

  //Buildings
  building1 = Bodies.rectangle(1400,700,100,400,{isStatic: true});
  World.add(world,building1);

  building2 = Bodies.rectangle(3400,700,150,500,{isStatic: true});
  World.add(world,building2);
  
  //Launch pad and launch tower

  launch_pad = Bodies.rectangle(390,700,150,50,{isStatic : true});
  World.add(world,launch_pad);

  launch_tower = Bodies.rectangle(250,650,50,150,{isStatic : true});
  World.add(world,launch_tower);

  //Helicopter
  helicopter = Bodies.rectangle(380,650,85,35,{isStatic : false});
  World.add(world,helicopter);
  
  //Air defenses 
  enemy_def1 = Bodies.rectangle(2100,700,100,50,{isStatic: true})
  World.add(world,enemy_def1);

  enemy_def2 = Bodies.rectangle(2900,700,100,50,{isStatic: true})
  World.add(world,enemy_def2);

  enemy_def3 = Bodies.rectangle(4200,700,100,50,{isStatic: true})
  World.add(world,enemy_def3);

}

function draw () {

  background(187);

  Engine.update(engine); 

  //Launch tower and launch pad
  rect(launch_pad.position.x,launch_pad.position.y,150,50);

  rect(launch_tower.position.x,launch_tower.position.y - 40,50,140);

  //Building rect
  rect(building1.position.x,building2.position.y,100,400);

  rect(building2.positionx,building2.position.y,150,500);

  //Helicopter Image
  image(heli_img,helicopter.position.x,helicopter.position.y,85,35);

  //Air defense image
  rect(enemy_def1.position.x,enemy_def1.position.y,100,50);

  rect(enemy_def2.position.x,enemy_def2.position.y,100,50);

  rect(enemy_def3.position.x,enemy_def3.position.y,100,50);

  //Helicopter controls

  velocityX1 = 0;

  if (keyCode === 32) {
    engine_start = 1;
  }

  if (engine_start === 1 && heli_crash_g === false) {  

    if (keyIsDown(UP_ARROW)) {
      velocityX1 = 0
      Matter.Body.setVelocity(helicopter,{x:velocityX1,y:-7.5});      
    }

    if (keyIsDown(RIGHT_ARROW)) {
      velocityX1 = 7.5
      Matter.Body.setVelocity(helicopter,{x:0,y:0});      
    }

    if (keyIsDown(LEFT_ARROW)) {
      velocityX1 = -7.5
      Matter.Body.setVelocity(helicopter,{x:0,y:0});      
    }

    if (keyIsDown(DOWN_ARROW)) {
      velocityX1 = 0
      Matter.Body.setVelocity(helicopter,{x:0,y:0})
    }

    if (keyIsDown(UP_ARROW) && keyIsDown(RIGHT_ARROW)) {
      velocityX1 = 5
      Matter.Body.setVelocity(helicopter,{x:velocityX1,y:-6});      
    }

    if (keyIsDown(UP_ARROW) && keyIsDown(LEFT_ARROW)) {
      velocityX1 = -5
      Matter.Body.setVelocity(helicopter,{x:velocityX1,y:-6});
    } 

  }

    //Helicopter damge control

  //Bullet code
  if (ammo > 0) {
    if (keyIsDown(68)) {
      bullets = createSprite(helicopter.position.x + 20,helicopter.position.y + 10,10,5);
      bullets.scale = 0.02;
      bullets.addImage(bullet_img);
      bullets.velocityX = 15;
      bullets.lifetime = 700;
      ammo -= 1;
    }

    else if (keyIsDown(65)) {
      bullets = createSprite(helicopter.position.x + 20,helicopter.position.y + 10,10,5);
      bullets.scale = 0.02;
      bullets.addImage(bullet_img);
      bullets.velocityX = -15;
      bullets.lifetime = 700;
      ammo-=1;
    }
  }   

  //Object movement
    object_movement()
  
  //Air defense
    air_defense(helicopter,enemy_def1);

    
    //Ammo display
    push()
    textSize(30);
    fill('black')
    text('Ammo : ' + ammo,100,50);
    pop();

    //Variable checker
    console.log(engine_start);

    drawSprites();
  

}

//Object movement function
function object_movement () {

  enemy_def1.position.x -= velocityX1;

  enemy_def2.position.x -= velocityX1;

  enemy_def3.position.x -= velocityX1;

  launch_tower.position.x -= velocityX1;

  launch_pad.position.x -= velocityX1;

  building1.position.x -= velocityX1;
  
  building2.position.x -= velocityX1;

}

//Air defense function
function air_defense (sprite,body) {

  var enemy_def_dist = dist(sprite.position.x,sprite.position.y,body.position.x,body.position.y);

  if (enemy_def_dist <= 500) {

    bullets = createSprite(body.position.x,body.position.y + 10,10,5);
      bullets.scale = 0.02;
      bullets.addImage(bullet_img);
      bullets.velocityX = 8
      bullets.velocityY = - 15;
      bullets.lifetime = 1000;

  }

}




