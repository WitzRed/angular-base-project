import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exercicios',
  templateUrl: './exercicios.component.html',
  styleUrls: ['./exercicios.component.css']
})
export class ExerciciosComponent implements OnInit {

  title = 'primeiro-projeto';

  valor: number = 5;

  deletarCiclo: boolean = false;

  cursos:string[] = ['Angular'];

  mostrarCursos: boolean = false;

  mudarValor(){
    this.valor++;
  }

  destruirClico(){
    this.deletarCiclo = true;
  }

  onMostrarCursos(){
    this.mostrarCursos = !this.mostrarCursos;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
