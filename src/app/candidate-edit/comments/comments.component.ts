import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from "../../shared/comment/comment.service";
import {StorageService} from "../../shared/storage/storage.service";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'comments-component',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input('candidate')
  candidate: any;

  commentDS = new MatTableDataSource();

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.commentService.getCommentsByTarget(this.candidate.id).subscribe(data => {
      this.commentDS.data = data._embedded.commentEntities;
      this.commentDS._updateChangeSubscription()
    });
  }

  postComment(content) {
    let comment = {
      content: content,
      authorId: StorageService.getUser().id,
      targetId: this.candidate.id
    };
    this.commentService.postComment(comment).subscribe(() => {
      this.ngOnInit();
    });
  }

}
