

export default class player{
   constructor(){
      this.position={
        x:100,
        y:100
      },
      this.velocity={
         x:0,
         y:1
      },
      this.width=20;
      this.height=20;
   }
   draw(){
    ctx.fillstyle="red";
    ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
   }

   update(){
      this.position.y +=this.velocity.y;
      this.draw();
   }
}
