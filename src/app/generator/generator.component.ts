import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})

export class GeneratorComponent implements OnInit {

  current: string ="A";
  repeat: boolean = false;
  cNum: number;
  funChar: string[] = ["!","@","#","$","%"];

  funNouns: string[] = ["Helicopter","Salad","Cowboy","Pancake","PizzaPie","Watermelon","Toaster"
  ,"Duckling","Volcano","Treehouse","Spaceman","Moonrock","Dinosaur","Pirate","Vacation","Shoes","Walrus"
  ,"Jello","Pudding","Bandit","Sweater"];

  funAdj: string[] = ["Huge","Large","Peaceful","Tiny","Lost","Little","Official","TheBest","Fresh","Magical"
  ,"Secret","Karate","Thrifty","Kungfu","Slightly","Juicy","Gleaming","Spicy","Savory","Nervous","Spooky","Beefy"]

  funFull: string[] = ["ReallyColdIce","VolleyballBoy","CoolCucumbers","LeafyGreens","SpicySauces"
  ,"SweetHomeAlabama","StompTheYard","BananaBunch","HarryPotter","DancingQueen","FreshOnionRings"
  ,"FreshPrince","HandyFingers","SnakeonaPlane","PushTheLimit","BigBadWolf","NinjaMaster","BellyButton"]

 randomNum() {
    this.cNum =  Math.floor((Math.random() * 1000) + 1);
  }
  randomAgain(): void{
    
      if(this.cNum < 250)
      this.current = (this.funFull[Math.floor((Math.random() * this.funFull.length))] + this.cNum + this.funChar[Math.floor((Math.random() * this.funChar.length))]);
      
      else if(this.cNum < 500 && this.cNum > 250)
      this.current = (this.funNouns[Math.floor((Math.random() * this.funNouns.length))]
      + this.funNouns[Math.floor((Math.random() * this.funNouns.length))]+ this.funChar[Math.floor((Math.random() * this.funChar.length))] + this.cNum + "");

      else if(this.cNum < 750 && this.cNum > 500)
      this.current = (this.funAdj[Math.floor((Math.random() * this.funAdj.length))]
      + this.funNouns[Math.floor((Math.random() * this.funNouns.length))]+ this.cNum + "");
      
      else
      this.current = (this.funAdj[Math.floor((Math.random() * this.funAdj.length))]
      + this.funNouns[Math.floor((Math.random() * this.funNouns.length))]+ this.cNum + 
      this.funChar[Math.floor((Math.random() * this.funChar.length))] + "");     
   }

  randomWord(length: number): number{
    return  Math.floor((Math.random() * length));
  }
  
  getCurrent(): string{
    return this.current;
  }

  makeTrue() {
    this.repeat = true;
  }

  makeFalse() {
    this.repeat = false;
  }
  openRand() {
  document.getElementById("gen").style.width = "100%";
  document.getElementById("b1").textContent = "Again!";
}
closeRand() {
  document.getElementById("gen").style.width = "0%";
}
  openCopy1() {
  document.getElementById("gen1").style.width = "60%";
  document.getElementById("gen1").style.height = "30%";
}
openCopy2() {
  document.getElementById("gen2").style.width = "60%";
  document.getElementById("gen2").style.height = "30%";
}
openCopy3() {
  document.getElementById("gen3").style.width = "60%";
  document.getElementById("gen3").style.height = "30%";
}
openCopy4() {
  document.getElementById("gen4").style.width = "60%";
  document.getElementById("gen4").style.height = "30%";
}
openCopy5() {
  document.getElementById("gen5").style.width = "60%";
  document.getElementById("gen5").style.height = "30%";
}
closeCopy(){
  document.getElementById("gen1").style.width = "0%";
  document.getElementById("gen1").style.height = "0%";
  document.getElementById("gen2").style.width = "0%";
  document.getElementById("gen2").style.height = "0%";
  document.getElementById("gen3").style.width = "0%";
  document.getElementById("gen3").style.height = "0%";
  document.getElementById("gen4").style.width = "0%";
  document.getElementById("gen4").style.height = "0%";
  document.getElementById("gen5").style.width = "0%";
  document.getElementById("gen5").style.height = "0%";
}
copyText(val: string){
  let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  copyInputMessage(box: string){
    

    this.copyText(document.getElementById(box).textContent);
    //document.getElementById("gen1").focus;
    //document.execCommand('highlight');
    //document.execCommand('copy');
    
  }
  

  constructor() { 
    
  }

  ngOnInit() {
    this.cNum =  Math.floor((Math.random() * 200) + 2);
  }

}