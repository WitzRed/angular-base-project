import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forloop-page',
  templateUrl: './forloop-page.component.html',
  styleUrls: ['./forloop-page.component.css']
})
export class ForloopPageComponent implements OnInit {

cursos:string[] = ["C", "MATLAB", "JAVA", "C++", "Python", "Typescript"];

meuFavorito: boolean = false;

ativo: boolean = false;

tamanhoFonte:number = 12;

prodDescription:string = "Mudar atributo 'ativo'";

tarefa: any = {
  desc: 'Descrição da tarefa',
  reposavel: {
    usuario: null
  }
};

mudarAtivo(){
  this.ativo = !this.ativo;
}

onClick(){
  this.meuFavorito = !this.meuFavorito;
}
  constructor() { }

  ngOnInit(): void {
    
  }

}
