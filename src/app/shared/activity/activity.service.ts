import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TargetParamUtils} from "../target.param.utils";

@Injectable()
export class ActivityService {

  private ACTIVITY_API = environment.apiRoot + '/activities';

  private activityTypeMapping = new Map([
    ['COMMENT_ADDED',
      {
        message: 'added comment for',
        icon: 'send'
      }
    ],
    ['ADDED',
      {
        message: 'added',
        icon: 'person_add'
      }
    ],
    ['EDITED', {
      message: 'edited',
      icon: 'edit'
    }
    ],
    ['DELETED',
      {
        message: 'deleted',
        icon: 'delete'
      }
    ],
    ['ATTACHMENT_ADDED',
      {
        message: 'added attachment for',
        icon: 'attach_file'
      }
    ],
    ['ATTACHMENT_DELETED',
      {
        message: 'deleted attachment for',
        icon: 'delete'
      }
    ]
  ]);

  private targetTypeMapping = new Map([
    ['CANDIDATE',
      {
        targetEndpoint: '/candidate',
        targetName: 'candidate',
      }
    ],
    ['EMPLOYEE',
      {
        targetEndpoint: '/employee',
        targetName: 'employee',
      }
    ]
  ]);

  constructor(private http: HttpClient) {
  }

  getByTarget(targetId: number, targetType: string): Observable<any> {
    let params = TargetParamUtils.getParams(targetId, targetType);
    return this.http.get(`${this.ACTIVITY_API}/search/findByTargetIdAndTargetType?`, {params: params})
  }

  getByAuthor(userId): Observable<any> {
    return this.http.get(`${this.ACTIVITY_API}/search/findByAuthorId?authorId=${userId}`)
  }

  getMessage(activityType: string): string {
    let props = this.getActivityMapping(activityType);
    return props == undefined ? "undefined" : props.message;
  }

  getIcon(activityType: string): string {
    let props = this.getActivityMapping(activityType);
    return props == undefined ? "wb_sunny" : props.icon;
  }

  getTargetEndpoint(targetType: string) {
    let props = this.getTargetMapping(targetType);
    return props.targetEndpoint;
  }

  getTargetName(targetType: string) {
    let props = this.getTargetMapping(targetType);
    return props.targetName;
  }

  private getActivityMapping(type: string): any {
    return this.activityTypeMapping.get(type);
  }

  private getTargetMapping(type: string): any {
    return this.targetTypeMapping.get(type);
  }

}
