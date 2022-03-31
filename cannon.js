class Cannon {
    constructor(x,y,w,h,a){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.a=a
        this.cannonBase=loadImage("assets/cannonBase.png")
        this.cannonGun=loadImage("assets/canon.png")
    }
    display(){
        //moving the cannon up and down according to left and right arrow.
        console.log(this.a)
        if(keyIsDown(RIGHT_ARROW)&&this.a<=70){
            console.log("a")
            this.a=this.a+1

        }
        if(keyIsDown(LEFT_ARROW)&&this.a>=-10){
            this.a=this.a-1

        }
        

        //code  to create the cannon gun.
        push ()
        translate (this.x,this.y)
        rotate (this.a)
        imageMode(CENTER)
        image(this.cannonGun,0,0,this.w,this.h)
        pop ()
        // code to create cannon base
        image(this.cannonBase,70,25,200,200)
    }
}