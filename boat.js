class Boat {
    constructor(x,y,w,h,boatPos,boatanimation){
        var option={
            friction:1.0,
            restitution:0.8,
            density:1

        }
        this.animation=boatanimation
        this.isBroken=false
        this.speed=0.05
        this.body=Bodies.rectangle(x,y,w,h,option)
        this.width=w
        this.height=h
        this.boatPosition=boatPos
        World.add(world,this.body)
        this.image=loadImage("assets/boat.png")

}
    animate(){
        this.speed=this.speed+0.05
    }
    
    remove(y){
        this.isBroken=true
        this.animation=brokenanimation
        this.width=250
        this.height=250
        setTimeout(()=>{
            //removing boat from the world
            World.remove(world,boats[y].body)
            //deleting the boat from boats array
            delete boats[y]
        },2000)
    }
    display(){
        var angle=this.body.angle
        var po=this.body.position
        //var index=Math.round(random(0,3))
        var index=Math.floor(this.speed%this.animation.length)
        push ()
        imageMode (CENTER)
        rotate (angle)
        translate (po.x,po.y)
        image (this.animation[index],0,this.boatPosition,this.width,this.height)
        
        pop ()
    }
}