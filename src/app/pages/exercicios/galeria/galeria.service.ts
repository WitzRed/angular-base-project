import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
  fromserver:any = {imagens:["./assets/mapa/mapa03.png",
              "./assets/mapa/mapa07.png",
              "./assets/mapa/mapa05.png",
              "./assets/mapa/mapa09.png",
              "./assets/mapa/mapa01.png",
              "./assets/mapa/mapa08.png",
              "./assets/mapa/mapa06.png",
              "./assets/mapa/mapa02.png",
              "./assets/mapa/mapa04.png"
            ]};
  constructor() { }

  getImages(){

    return this.fromserver;
  }
}
