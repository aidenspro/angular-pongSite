import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  openNav() {
  document.getElementById("mySidebar").style.width = "200px";
  //document.getElementById("main").style.marginLeft = "200px";
  
}
  closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  //document.getElementById("main").style.marginLeft = "0";
} 

  constructor() { }

 

  ngOnInit() {
  }

}