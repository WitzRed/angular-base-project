import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ContatosService } from '../contatos.service';

@Component({
  selector: 'app-contatos-form',
  templateUrl: './contatos-form.component.html',
  styleUrls: ['./contatos-form.component.css']
})
export class ContatosFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contatoService: ContatosService,
    private location: Location,
    private route: ActivatedRoute
     ) { 
  }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: any) =>{
    //     const id = params['id'];
    //     console.log(id);
    //     const contato$ = this.contatoService.loadByID(id);
    //     contato$.subscribe(contato => {
    //       this.updateForm(contato);
    //     })
    //   }
    // );

    //sem resolver
    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   switchMap(id => this.contatoService.loadByID(id))
    //   //switchMap(contato => this.obterEndereco(contato))
    // )
    // .subscribe(contato => this.updateForm(contato));

    // concatMap -> ordem da requisicao importa
    // mergeMap -> ordem nao importa
    // exaustMap -> casos de login

    const contato = this.route.snapshot.data['contato'];
    
    this.form = this.fb.group({
      id: [contato.id],
      nome: [contato.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  //sem resolve
  // updateForm(contato){
  //   this.form.patchValue({
  //     id: contato.id,
  //     nome: contato.nome
  //   })
  // }

  hasError(field: string){
    if( this.form.get(field).errors != null){
      return this.form.get(field).errors;
    }
      
    return false;
  }
  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.valid){
      console.log('Submit');

      let mgsSuccess = 'Contato criado com Sucesso';
      let msgError = 'Erro ao tentar crair contato, tente novamente!';

      if(this.form.value.id){
        mgsSuccess = 'Contato atualizado com sucesso';
        msgError = 'Erro ao tentar atualiazar contato, tente novamente!';
      }

      this.contatoService.save(this.form.value).subscribe(
        success => {
          this.contatoService.showAlertSuccess(mgsSuccess);
          this.location.back();
        },
        error => {
          console.log(error);
            this.contatoService.showAlertDanger(msgError)
        }
      );

     /* if(this.form.value.id){
        //updade
        this.contatoService.update(this.form.value).subscribe(
          success => {
            this.contatoService.showAlertSuccess(mgsSuccess);
            this.location.back();
          },
          error => {
            console.log(error);
            this.contatoService.showAlertDanger(msgError)
          },
          () => console.log('Update completo')
        )
      }else{
        this.contatoService.create(this.form.value).subscribe(
          success => {
            this.contatoService.showAlertSuccess('Contato criado com Sucesso');
            this.location.back();
          },
          error => {
            console.log(error);
            this.contatoService.showAlertDanger('Erro ao tentar crair contato, tente novamente!')
          },
          () => console.log('request completado')
        );
      }*/
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
  }

}
