import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  constructor() { }

  eventLog(msg: string){
    console.log(msg);
  }
}
