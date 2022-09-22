import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {
  nomePortal: string;
  urlImagem: string;
  cursoAngular:boolean = true;
  valorAtual:string = '';
  valorSalvo:string = '';
  isMouseOver:boolean = false;
  valorInicial:number = 10;

  showLoremImages:boolean = false;

  nomeDoCurso: string = 'Angular';

  getCurtirCurso(){
    return true;
  }

  getValor() {
    return 1;
  }

  botaoClicado(){
    alert('Botão clicado!');
  }

  onKeyUp(event: any){
    this.valorAtual = (<HTMLInputElement>event.target).value;
  }

  salvarValor(value:any){
    this.valorSalvo = value;
  }

  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(evento:any){
    console.log(evento.novoValor);
  }

  onShowImages(){
    this.showLoremImages = !this.showLoremImages;
  }

  constructor() { 
    this.nomePortal = 'http://witzred.blogspot.com/';

    this.urlImagem = 'http://lorempixel.com/400/200/nature';

  }


  ngOnInit(): void {
  }

}
