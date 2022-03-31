//exaple of she is happy today, also practicing array;
//var frag=[1,2,3,4,5]
//frag.push('you')
//console.log(frag[5])
//console.log(frag.length)//it is use for counting how many index is in an array.
//var lier=[[1,2],[3,4],[5,6],[7,8]]
//console.log(lier[0][0],[0][1])
//[1][0],[1][1]
//[2][0],[2][1]
//[3][0],[3][1]

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var waterinblack,milk,angle
var balls=[]
var boats=[]
//variable for making the boat animation
var boatanimation=[]
var boatdata
var boatsheet
//vairable for making the broken boat animation
var brokenanimation=[]
var brokendata
var brokensheet
//creating vairable for making the water splash
var splashanimation=[]
var splashdata
var splashsheet
//gaming over
var isgameover = false
var isPirareLaughing =flase
var backgroundM
var cannonE
var cannonWM

function preload() {
 waterinblack=loadImage("assets/background.gif")
 milk=loadImage("assets/tower.png")
 boatdata=loadJSON("assets/boat/boat.json") 
 boatsheet=loadImage('assets/boat/boat.png')
 brokendata=loadJSON('assets/boat/brokenBoat.json')
 brokensheet=loadImage('assets/boat/brokenBoat.png')
 splashdata=loadJSON('assets/waterSplash/waterSplash.json')
 splashsheet=loadImage('assets/waterSplash/waterSplash.png')
 backgroundM=loadSound('assets/assets_background_music.mp3')
 cannonE=loadSound('assets/assets_cannon_explosion.mp3')
 cannonWM=loadSound('assets/assets_cannon_water.mp3')
pL=loadSound("assets/assets_pirare_laugh.mp3")
 
}
function setup() {

  canvas = createCanvas(1200, 600);
  angleMode(DEGREES)
  a=20
  engine = Engine.create();
  world = engine.world;
  var option={
    isStatic:1
  }
  dickenson=Bodies.rectangle(0,590,2400,10,option) 
  World.add(world, dickenson)
  milkgood=Bodies.rectangle(160,350,160,310,option)
  World.add(world,milkgood)
  //creating the cannon
  cannon=new Cannon (180,110,130,100,a)
  //getting the images from boat.png 1 by 1 and storing them in an empty array
  var boatframes=boatdata.frames
  for(var i=0; i<boatframes.length;i++){
    var p=boatframes[i].position
    var img=boatsheet.get(p.x,p.y,p.w,p.h)
    boatanimation.push(img)
  }
  var brokenframes=brokendata.frames
  for(var i=0; i<brokenframes.length;i++){
    var p=brokenframes[i].position
    var img=brokensheet.get(p.x,p.y,p.w,p.h)
    brokenanimation.push(img)
  }
  var splashframes=splashdata.frames
  for(var i=0; i<splashframes.length;i++){
    var p=splashframes[i].position
    var img=splashsheet.get(p.x,p.y,p.w,p.h)
    splashanimation.push(img)
  }
  console.log(splashanimation)
  backgroundM.play()
}

function draw() {
  background(189);
  image(waterinblack,0,0,1200,600)
  push ()
  imageMode (CENTER)
  image(milk,milkgood.position.x,milkgood.position.y,160,310)
  pop ()
  Engine.update(engine);
  fill('black')
  rect(dickenson.position.x,dickenson.position.y,1200,10)
  cannon.display()
  for (i=0;i<balls.length;i++){
    showCannonBalls(balls[i],i)
    collisionWithBoat(i)
  }
  showBoats()
}
function collisionWithBoat(x){
  for(var i=0; i<boats.length ; i++){
    if(balls[x]!==undefined&&boats[i]!==undefined){
      var storage=Matter.SAT.collides(boats[i].body,balls[x].body)
      if(storage.collided){
       boats[i].remove(i) 
       World.remove(world,balls[x].body)
       
       delete balls[x]
      }
    }

  }
}
function showCannonBalls(ball,i){
  if(ball){
    ball.display()
    ball.animate()
    if(ball.body.position.y>height-100){
      ball.remove(i)
      cannonWM.play()
    }
  }
}
function showBoats(){
  if(boats.length>0){
    if(boats[boats.length-1]==undefined || boats[boats.length-1].body.position.x<width-300){
      var crikets=[-20,-40,-60,-80]
      var baseball=random(crikets)
      boat=new Boat(width-100,height-60,150,150,baseball,boatanimation)
   boats.push(boat)
    }
    //command display boat one by one use for loop
    for(var i=0;i<boats.length;i=i+1){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x:-2,y:0})
        boats[i].display()
        boats[i].animate()
       var storage=Matter.SAT.collides(boats[i].body,this.milkgood)
       if(storage.collided&& ! boats[i].isBroken ){
        isgameover=true
        isPirareLaughing=true
        gameOver()
        pL.play()
       }
       
      }
    }
  }
  else{
    boat=new Boat(width-100,height-60,150,150,-60,boatanimation)
    boats.push(boat)
  }
}
function gameOver(){
  swal(
    {
      title:`Game Over!!!`,
      text:`Thanks for playing!!!`,
      imageUrl:"https://ih1.redbubble.net/image.1038972284.9558/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
      imageSize: "200x200",
      confirmButtonText:"Play Again!"
    },
    function (isConfirm){
      if(isConfirm){
        location.reload();
      }
    }
  )
}
function keyPressed(){
  if(keyCode==DOWN_ARROW){
    //creating CAnnoball
    cannonBall=new CannonBall(cannon.x,cannon.y)
    balls.push(cannonBall)
    
  }
}
function keyReleased(){
  if(keyCode==DOWN_ARROW){
    balls[balls.length-1].shot()
    cannonE.play()
  }
}
