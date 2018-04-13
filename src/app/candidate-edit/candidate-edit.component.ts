import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {CandidatesService} from '../shared/candidates/candidates.service';
import {NgForm} from '@angular/forms';
import {Inject} from "@angular/compiler/src/core";

@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.css']
})
export class CandidateEditComponent implements OnInit, OnDestroy {

  candidate: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private candidateService: CandidatesService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.candidateService.get(id).subscribe((candidate: any) => {
          if (candidate) {
            this.candidate = candidate;
            this.candidate.href = candidate._links.self.href;
          } else {
            console.log(`Candidate with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/candidate-list']);
  }

  save(form: NgForm) {
    this.candidateService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.candidateService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }


  onBeforeUpload($event) {
    console.info($event);
    console.info($event);
  }
}
