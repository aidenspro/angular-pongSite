import { Component, ViewChild, ElementRef, OnInit, NgZone, HostListener ,OnDestroy} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dk',
  templateUrl: './dk.component.html',
  styleUrls: ['./dk.component.css']
})
export class DkComponent implements OnInit {

   items: Observable<any[]>;
  constructor(private ngZone: NgZone,db: AngularFireDatabase) {
    //this.items = db.list('items').valueChanges();
    //const relative = db.object('item').valueChanges();
    
   this.db = db;
  }

 db: AngularFireDatabase;
 mvmnt :number = 0;

@ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  requestId;
  interval;

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
     this.ctx = this.canvas.nativeElement.getContext('2d');
     this.ctx.fillStyle = 'red';
     this.ngZone.runOutsideAngular(() => this.tick());

    setInterval(() => {
      
    }, 33);

    

    this.draw();
    
  }
  tick() {
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    var gradient = this.ctx.createLinearGradient(0, 0, 800, 0);
    gradient.addColorStop(0,"blue");
    this.ctx.font = " 700 450px Unknown Font, roboto";
     this.ctx.strokeStyle = "Blue";
     this.ctx.fillStyle = gradient;
     

    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, 15, 0, 2 * Math.PI);
    //this.ctx.arc(0, 0, 15, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "Red";
    gradient.addColorStop(0,"red");
    this.ctx.fill();
    this.ctx.stroke(); 

  }

}