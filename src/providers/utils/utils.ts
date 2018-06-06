import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilsProvider {

  constructor(public http: HttpClient) {
    //
  }

  dynamicColorsGraph() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ", 0.5)";
  }

  removeAcento(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

}
