import { viewClassName } from '@angular/compiler';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'output-property',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.css']
})
export class OutputPropertyComponent implements OnInit {
  @Input() valor: number = 0;

  @Output() mudouValor = new EventEmitter();

  @ViewChild('campoInput') campoValorInput: any;

  incrementa(){
    this.campoValorInput.nativeElement.value++;
    this.valor++;
    this.mudouValor.emit({novoValor: this.valor});
  }

  decrementa(){
    this.valor=this.campoValorInput.nativeElement.value--;
    this.valor--;
    this.mudouValor.emit({novoValor: this.valor});
  }
  constructor() { }

  ngOnInit(): void {
  }

}
