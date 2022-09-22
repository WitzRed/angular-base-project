import { Component, OnInit } from '@angular/core';
import { GaleriaService } from './galeria.service';


@Component({
  selector: 'galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
  
  galeria: any = {};

  constructor(private _galeria: GaleriaService) { }

  ngOnInit(): void {
    this.galeria = this._galeria.getImages();
  }

}
