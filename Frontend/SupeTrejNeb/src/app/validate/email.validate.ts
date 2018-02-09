import { Injectable } from '@angular/core';

@Injectable()
export class emailValidate{

  public regexp:any;

  validate(email):Boolean{

    this.regexp = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    return this.regexp.test(email);
  }
}
