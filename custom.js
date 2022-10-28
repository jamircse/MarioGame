
var canvasarea=document.querySelector('.gamearea');
var ctx=canvasarea.getContext('2d');
var player;
var crossplateform,overlapplateform;
var gravity=2;
var flag;
var plateforms;
var scrollofset=0;
function gamestart(){
    player= new Player();
    plateforms=[new Plateform({x:50,y:200}),new Plateform({x:280,y:250}),new Plateform({x:500,y:300}),new Plateform({x:720,y:350}),new Plateform({x:940,y:450}),new Plateform({x:1160,y:500}),new Plateform({x:1380,y:450}),new Plateform({x:1600,y:400}),new Plateform({x:1820,y:350}),new Plateform({x:2040,y:300}),new Plateform({x:2260,y:250}),new Plateform({x:2480,y:200}),new Plateform({x:2700,y:250}),new Plateform({x:2920,y:300}),new Plateform({x:3140,y:350}),new Plateform({x:3360,y:400}),new Plateform({x:3580,y:450}),new Plateform({x:3800,y:500})];
    gamearea.start();
}


var gamearea={
    canvas:canvasarea,
    start:function(){
        this.canvas.width=innerWidth;
        this.canvas.height=innerHeight;
        this.context=ctx;
        this.interval=setInterval(updatearea,10);
        window.addEventListener('keydown', function (e) {
            gamearea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            gamearea.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval)
    }
}

class Player{
    constructor(){
       this.position={
         x:100,
         y:100
       },
       this.velocity={
          x:0,
          y:0
       },
       this.width=20;
       this.height=20;
    }
    draw(){
        ctx.fillStyle='red';
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
     
    }
 
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if((this.position.y+this.velocity.y+this.height)>=canvasarea.height){
            this.velocity.y=0;
        }else{
            this.position.y +=gravity;
        }
    }
    
    plateformoverlay(obj){
        var myleft=this.position.x
        var myright=this.position.x+this.width;
        var mybottom=this.position.y+this.height;
        
        var objleft=obj.position.x;
        var objright=obj.position.x+obj.width;
        var objtop=obj.position.y;
        
        if(myright>=objleft&&mybottom==objtop&&myleft<=objright){
            return true;
        }else{
            return false;
        }   
    }
    
    plateformcross(obj){
        var myleft=this.position.x
        var myright=this.position.x+this.width;
        var mybottom=this.position.y+this.height;
        
        var objleft=obj.position.x;
        var objright=obj.position.x+obj.width;
        var objtop=obj.position.y;
        
        if(myleft>objright){
            return true;
        }
    }
    
    
 }




 class Plateform{
    constructor({x,y}){
        this.position={
            x,
            y
        }
        this.width=200;
        this.height=20;
    }
    draw(){
        ctx.fillStyle="black";
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
     
   
 }

 function updatearea(){
    gamearea.clear();
    player.update();
     
     plateforms.forEach((plateform)=>{
         plateform.draw();
         
        if(player.plateformoverlay(plateform)) gravity=0;
        if(player.plateformcross(plateform)&& gravity==0) gravity=2;
        
        if(gamearea.key && gamearea.key ==37 &&player.plateformcross(plateform)){
            for(var i=0;i<plateforms.length;i++){
                plateforms[i].position.x +=1;
             }
        }
        
        if(gamearea.key && gamearea.key ==39 &&player.plateformcross(plateform)){
            for(var i=0;i<plateforms.length;i++){
                plateforms[i].position.x +=-1;
             }
        }
        
        
        if (gamearea.key && gamearea.key ==37){   // left pressed
            player.velocity.x =-2;
            scrollofset +=-2;
        }else if(gamearea.key && gamearea.key == 39){  // right pressed
            player.velocity.x =2;
            scrollofset +=2;
        }else if(gamearea.key && gamearea.key == 38){  // top pressed
            player.velocity.y =-6;
            gravity=2;
        }else{
            player.velocity.x=0;
            player.velocity.y=0;
        }
        


     });

 }

 gamestart();
