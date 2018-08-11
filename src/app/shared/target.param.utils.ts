import {HttpParams} from "@angular/common/http";

export class TargetParamUtils {

  static getParams(targetId: number, targetType: string) {
    return new HttpParams()
      .set("targetId", `${targetId}`)
      .set("targetType", `${targetType}`);
  }
}
