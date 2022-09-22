import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'meu-form-component',
  templateUrl: './meu-form.component.html',
  styleUrls: ['./meu-form.component.css']
})
export class MeuFormComponent implements OnInit {
  colors = [
    { code: '#FF0000', name: 'Red' },
    { code: '#00FF00', name: 'Green' },
    { code: '#0000FF', name: 'Blue' },
  ];

  colorSet: FormGroup;
  
  nome:string = 'abc';

  pessoa: any = {
    nome: 'def',
    idade: 20
  };

  
  isKeyEnter:boolean  = false;

    
  setInputVal(){
    return !this.isKeyEnter;
  }


  constructor() { }

  ngOnInit(): void {

    this.colorSet = new FormGroup({
      color: new FormControl(''),
    });
  }

}
