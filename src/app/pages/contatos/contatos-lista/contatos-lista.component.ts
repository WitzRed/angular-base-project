import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, empty, Observable, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { ContatosService } from '../contatos.service';
import { Contatos2Service } from '../contatos2.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contatos-lista',
  templateUrl: './contatos-lista.component.html',
  styleUrls: ['./contatos-lista.component.css']
})
export class ContatosListaComponent implements OnInit {


  // contatos: Contato[];
  deleteModal = false;
  cotatoSelecionado:Contato;
  popupAttributtes: any = {
    title: null,
    msg:null,
    saveTxt: null,
    cancelTxt: null
  }


  //notacao de observable
  contatos$: Observable<Contato[]>;
  error$ = new Subject<boolean>();

  constructor(
    //private contatosService: ContatosService,
    private contatos2Service: Contatos2Service,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    // this.contatosService.list().subscribe(dados => this.contatos = dados);

    this.onRefresh();
  }

  onRefresh(){
    //this.contatos$ = this.contatosService.list()
    this.contatos$ = this.contatos2Service.list()
      .pipe(
        catchError(error => {
          console.error(error); 
          this.error$.next(true);
          return null; // return of();
        })
      );

      // this.contatosService.list()
      // .pipe(
      //   catchError(error => {
      //     console.log(error)
      //   })
      // )
      // .subscribe(
      //   dados =>{
      //     console.log(dados);
      //   },
      //   error => console.log(error),
      //   () => console.log('Observable completo!')
      // )
  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(contato:any){
    //const reqAtt = this.contatosService.showConfirm('Confirmação','Tem certeza que deseja remover este contato?', 'Sim', 'Não');
    const reqAtt = this.contatos2Service.showConfirm('Confirmação','Tem certeza que deseja remover este contato?', 'Sim', 'Não');

    
    this.popupAttributtes = Object.assign({},reqAtt);

    this.deleteModal = true;

    this.cotatoSelecionado = contato;

    console.log('Asked to delete.'+ " deleteModal: " + this.deleteModal);
    
  }

  decision(decide:string){
    if(decide == 'confirm'){
      //this.contatosService.delete(this.cotatoSelecionado).subscribe(
      this.contatos2Service.delete(this.cotatoSelecionado).subscribe(
        success => {
          //this.contatosService.showAlertSuccess('Contato excluido com sucesso!')
          this.contatos2Service.showAlertSuccess('Contato excluido com sucesso!')
          this.onRefresh();
        },
        //error => this.contatosService.showAlertDanger(error + 'Erro ao excluir contato.')
        error => this.contatos2Service.showAlertDanger(error + 'Erro ao excluir contato.')
      );
      this.deleteModal = false;
    }else{
      this.deleteModal = false;
    }
  }

}
