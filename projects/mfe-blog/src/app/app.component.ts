import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  title = 'mfe-blog';

  ngOnInit(): void {
    console.log("MFE_APP")
  }

}

