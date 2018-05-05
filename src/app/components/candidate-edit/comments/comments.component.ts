import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {CommentService} from "../../../shared/comment/comment.service";
import {StorageService} from "../../../shared/storage/storage.service";

@Component({
  selector: 'comments-component',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input('candidate')
  candidate: any;

  @Input('dataChangedEmitter')
  dataChangedEmitter: EventEmitter<any>;

  comments: any;

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.commentService.getCommentsByTarget(this.candidate.id).subscribe(data => {
      this.comments = data._embedded.commentEntities;
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
      this.dataChangedEmitter.emit('comment');
    });
  }

}
