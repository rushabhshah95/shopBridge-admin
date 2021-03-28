/* This is a component to handle view when user tries to access not registerd route/ wild card routes/ 404 Error*/

/* Import statements */
import { Component, OnInit } from '@angular/core';
import { faHome, faQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  homeIcon = faHome;
  QuestionIcon = faQuestion;
  
  constructor() { }

  ngOnInit(): void {
  }

}
