class CannonBall {
    constructor(x,y){
        var option={
            isStatic:true
        }
        this.radius=30
        this.body=Bodies.circle(x,y,this.radius,option)
        World.add(world,this.body)
        this.cannonballimage=loadImage('assets/cannonball.png')
        this.trajectory=[]
        this.isSink=false
        this.speed=0.05
        this.animation=[this.cannonballimage]

    }
    animate(){
        this.speed=this.speed+0.05
    }
    shot(){
        var x=cannon.a-28 
        x=x*(3.1415/180)
        var velocity=p5.Vector.fromAngle(x)
        velocity.mult(0.5)
        Matter.Body.setStatic(this.body,false)
        Matter.Body.setVelocity(this.body,{x:velocity.x*(180/3.1415),y:velocity.y*(180/3.1415)})
    }
    remove(y){
        this.isSink=true
        Matter.Body.setVelocity(this.body,{x:0,y:0})
        this.animation=splashanimation
        this.radius=100
        this.speed=0.05
        setTimeout(()=>{
            //removing boat from the world
            World.remove(world,this.body)
            //deleting the boat from boats array
            delete balls[y]
        },1000)
    
         
    
    }
    
    display(){
        var po=this.body.position
        var index=Math.floor(this.speed%this.animation.length)
        var angle=this.body.angle 
        var po=this.body.position
        push ()
        imageMode (CENTER)
        translate (po.x,po.y)
        rotate (angle)
        image (this.animation[index],0,0,this.radius,this.radius)
    
        pop ()
        //getting all the position of the cannon ball and storing them in an empty array
        
        if(this.body.velocity.x>0){
            var position=[po.x,po.y]
            this.trajectory.push(position)

        }
        //extracting individual x coordinate of every positions of the cannon balls one by one using a for loop and setting an image of all those positions
        for(var i=0;i<this.trajectory.length;i++){
            image(this.cannonballimage,this.trajectory[i][0],this.trajectory[i][1],5,5)
        }

        
    }
}
