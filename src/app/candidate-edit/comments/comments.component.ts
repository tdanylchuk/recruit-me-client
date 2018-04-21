import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'comments-component',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input('candidate')
  candidate: any;

  constructor() {
  }

  ngOnInit() {
  }

}
