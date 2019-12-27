import { Component, ViewChild, ElementRef, OnInit, NgZone, HostListener ,OnDestroy} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { Ball } from './ball';
import { Paddle } from './paddle';
import { Paddle2 } from './paddle2';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit, OnDestroy { 
  items: Observable<any[]>;
  constructor(private ngZone: NgZone,db: AngularFireDatabase) {
    //this.items = db.list('items').valueChanges();
    //const relative = db.object('item').valueChanges();
   this.db = db;
    
  }
  
  db: AngularFireDatabase;
  
  
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  requestId;
  interval;
  
  ball: Ball = new Ball;
  paddle: Paddle = new Paddle;
  paddle2: Paddle2 = new Paddle2;
  paused: boolean = true;
  stop: boolean = false;
  mouseX: number = 0;
  mouseY: number = 0;
  waitTime: number = 0;
  sNum: number;
  wait : boolean = true;
  message: string = "No Space";
  gameID: string;
  found: boolean = false;
  pid: number = 0;
  entered: boolean = false;
  waitTicks : number = 0;
  velo: number = 0;
  mvmnt :number = 0;
  gameRef;
  p1Ref;
  p2Ref;
  p1ScoreRef;
  p2ScoreRef;
  pongRef;
  p1rRef;
  p2rRef;
  ballRefx;
  ballRefy;
  ballRef;
  rdyRef;
  waitRef;
  vRef;
  v2Ref;
  dbx;
  dby;
  p1Ready;
  p2Ready;
  everyOther : number = 0;
  
  @HostListener('mousemove', ['$event'])
  mouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY - 400;
    if(this.pid == 1){
    if(this.mouseY > 0 && this.mouseY<400) 
    this.paddle.y = this.mouseY;
    }else if(this.pid == 2){
    if(this.mouseY > 0 && this.mouseY<400) 
    this.paddle2.y = this.mouseY;
    }
  }
  
  @HostListener('keydown', ['$event'])
  keyPress(e) {
    
    if(e.keyCode == 87){
    this.mvmnt = 1;
    }else if(e.keyCode == 83){
      this.mvmnt = -1;
      }
  }

  @HostListener('keyup', ['$event'])
  keyRelease(e) {
    if(e.keyCode == 83 || e.keyCode == 87){
    this.mvmnt = 0;
    }
    
  }
  
 
    

  ngOnInit() {
    this.rdyRef = this.db.object('/Pong/ready');
    this.gameRef = this.db.object('/Items');
    this.p1Ref = this.db.object('/Pong/p1/');
    this.p2Ref = this.db.object('/Pong/p2/');
    this.pongRef = this.db.object('/Pong/');
    this.p1rRef = this.db.object('/Pong/p1r');
    this.p2rRef = this.db.object('/Pong/p2r');
    this.p1ScoreRef = this.db.object('/Pong/p1score');
    this.p2ScoreRef = this.db.object('/Pong/p2score');
    this.ballRefx = this.db.object('/Pong/posx');
    this.ballRefy = this.db.object('/Pong/posy');
    this.ballRef = this.db.object('/Pong/ball/');
    this.vRef = this.db.object('/Pong/v');
    this.v2Ref = this.db.object('/Pong/v2');
    
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = 'red';
     
    this.p1rRef.snapshotChanges().subscribe(action => {
         this.p1Ready = action.payload.val();
         
     });

     this.p2rRef.snapshotChanges().subscribe(action => {
         this.p2Ready = action.payload.val();
         
     });
     this.p1ScoreRef.snapshotChanges().subscribe(action => {
         this.paddle.score = action.payload.val();
         
     });

     this.p2ScoreRef.snapshotChanges().subscribe(action => {
         this.paddle2.score = action.payload.val();
         
     });

     this.ballRefx.snapshotChanges().subscribe(action => {
         this.dbx = action.payload.val();
         
     });

     this.ballRefy.snapshotChanges().subscribe(action => {
         this.dby = this.p2rRef = action.payload.val();
         
     });


     


      this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {
      if(this.paused == false )//&& this.p1Ready && this.p2Ready)
      this.tick();
    }, 33);

    

    this.startBall();
    this.draw();
    
  }
  

@HostListener('window:beforeunload')
  async ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
    const itemRef = this.db.object('/Pong');
    const gameRef = this.db.object('/Items');
    this.done();
    
  }

  unPause() {
    this.paused = false;
  }
  readySet() {
    if(this.pid == 1)
    this.pongRef.update({ p1r : true });
    else
    this.pongRef.update({ p2r : true });
  }

  done() {
    if(this.pid == 1){
    this.pongRef.update({ p1r : false });
    this.pongRef.update({ posx : 400 });
    }
    else{
    this.pongRef.update({ p2r : false });
    this.pongRef.update({ posy : 200 });

    }
    this.pongRef.update({ p1score : 0 });
    this.pongRef.update({ p2score : 0 });

  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    var gradient = this.ctx.createLinearGradient(0, 0, 800, 0);
    gradient.addColorStop(0,"blue");
    this.ctx.font = " 700 450px Unknown Font, roboto";
     this.ctx.strokeStyle = "Blue";
     this.ctx.fillStyle = gradient;
     
     this.ctx.fillText(this.paddle.score, 50, 350); 
     this.ctx.fillText(this.paddle2.score, 520, 350); 

    this.ctx.fillText("|", 336, 300); 

    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, 15, 0, 2 * Math.PI);
    //this.ctx.arc(0, 0, 15, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "Red";
    gradient.addColorStop(0,"red");
    this.ctx.fill();
    this.ctx.stroke(); 
   


    this.ctx.beginPath();
    this.ctx.rect(this.paddle.x, this.paddle.y,this.paddle.w, this.paddle.l);
    //this.ctx.rect(0, 0,this.paddle.w, this.paddle.l);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.rect(this.paddle2.x, this.paddle2.y,this.paddle2.w, this.paddle2.l);
    this.ctx.fill();
    this.ctx.stroke();
    
    
     
  }


   drawVictory(player: number) {
    var gradient = this.ctx.createLinearGradient(0, 0, 800, 0);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    gradient.addColorStop(0,"Red");
    gradient.addColorStop(.5,"white");
    gradient.addColorStop(1,"blue");
    this.ctx.font = " 700 200px Unknown Font, roboto";
     this.ctx.strokeStyle = "Blue";
     this.ctx.fillStyle = gradient;
     if(player == 1){
     this.ctx.fillText("Player 1 ", 50, 150); 
     }else
     this.ctx.fillText("Player 2 ", 50, 350); 

      this.ctx.fillText("Wins", 200, 350); 
   }

  collisionWalls() {
    if(this.ball.v < 0){
      if(this.ball.x - 15 < 0){
      this.ball.x = (this.ball.x + 1 * -1);
      this.ball.v = this.ball.v * -1;
      if(this.pid == 1){
      this.paddle2.score++;
      this.pongRef.update({ p2score : this.paddle2.score});
      }
      this.reset();
      }
    }else{
      if(this.ball.x + 15 > 800){
      this.ball.x = (this.ball.x + 1 * -1);
      this.ball.v = this.ball.v * -1;
      if(this.pid == 1){
      this.paddle.score++;
      this.pongRef.update({ p1score : this.paddle.score});
      }
      this.reset();
      }

    }

      if(this.ball.v2 < 0){
      if(this.ball.y - 15 < 0){
      this.ball.y = (this.ball.y + 1 * -1);
      this.ball.v2 = this.ball.v2 * -1;
      
      }
    }else{
      if(this.ball.y + 15 > 400){
      this.ball.y = (this.ball.y + 1 * -1);
      this.ball.v2 = this.ball.v2 * -1;
      }

    }


  }
  startBall() {
     this.sNum =  Math.floor((Math.random() * 10) + 1);
     if(this.sNum > 5)
    this.ball.v2 = this.ball.v2 * 1;
      else
    this.ball.v2 = this.ball.v2 * -1;
   
  }

  collisionPaddles() {
    if(this.ball.v < 0){
      if(this.ball.x - 15 < 40 && (this.ball.y + 15 > this.paddle.y) 
        && (this.ball.y - 15 < (this.paddle.y + this.paddle.l) )){
      this.ball.x = (this.ball.x + 1 * -1);
      this.ball.v = this.ball.v * -1;
      }
    }else{
      if(this.ball.x + 15 > 760 && (this.ball.y + 15 > this.paddle2.y) 
        && (this.ball.y - 15 < (this.paddle2.y + this.paddle2.l) )){
      this.ball.x = (this.ball.x + 1 * -1);
      this.ball.v = this.ball.v * -1;
      }
    }

  }
  tick() {
    if(this.paddle.score > 9)
      this.drawVictory(1);
    else if(this.paddle2.score > 9){
      this.drawVictory(2);
    }else{
   this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    if(this.mvmnt == 1){
    this.velo = -10;
    }else if(this.mvmnt == -1){
    this.velo = 10;
    }else{
    this.velo = 0;
    }

    this.draw();
    
    if(this.pid == 1){
    //this.ball.x = this.ball.x + this.ball.v;
    //this.ball.y = this.ball.y + this.ball.v2;
    this.pongRef.update({ posx : this.ball.x});
    this.pongRef.update({ posy : this.ball.y})
    }else if(this.pid == 2){
    
    //this.ball.x = this.dbx;
    //this.ball.y = this.dby;
      
    }
    

    this.collisionWalls();
    this.collisionPaddles();
    
    
     if(this.pid == 1){

      if(this.paddle.y < 399 - this.paddle.l  && this.paddle.y > 1)
       this.paddle.y = this.velo + this.paddle.y

       
      this.pongRef.update({ p1 : this.paddle.y });
      this.p2Ref.snapshotChanges().subscribe(action => {
      this.paddle2.y = action.payload.val();
     });
     }else if(this.pid == 2){

     if(this.paddle2.y < 399 - this.paddle2.l  && this.paddle2.y > 1)
      this.paddle2.y = this.velo + this.paddle2.y

      this.pongRef.update({ p2 : this.paddle2.y });
    
      
     this.p1Ref.snapshotChanges().subscribe(action => {
      this.paddle.y = action.payload.val();
     });
      } 
    }
    
    this.requestId = requestAnimationFrame(() => this.tick);
    
   }
  

  reset() {
   this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
   this.ball.x = 400;
   this.ball.y = 200;
   this.draw();
   this.stop = true;
   this.startBall(); 
  }

  pause(e: any) {
    alert(e.target.value)
    if(e.target.value == 'p')
    this.paused = true;
  }


  setPID(num) {
    if(num == 1){
    this.pid = 1;
    document.getElementById("p1").style.color = "green";
    document.getElementById("p1").style.content = ""
    //this.pongRef.update({p1r : true});
    }
    else{
    this.pid = 2;
    document.getElementById("p2").style.color = "green";
    //this.pongRef.update({p2r : true});
    }
  }
   


}