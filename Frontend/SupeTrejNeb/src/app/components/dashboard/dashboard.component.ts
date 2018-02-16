import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {




  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.sidenav').sidenav();
      $(".dropdown-trigger").dropdown();
    });
  }

  ngAfterViewInit(): void {

  }

}
