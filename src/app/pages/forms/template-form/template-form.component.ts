import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsultaCepService } from '../consulta-cep.service';
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    name: null,
    email: null
  };

  
  aplicaCSSErro(campo){
    if (campo.invalid && campo.touched){
      return true;
    }
    return false;
  }

  consultaCEP(campo, form){
    let cep = '';
    cep = campo.value;
    
    if(cep != null && cep !== ''){
      this._consultaCEPService.consultaCEP(cep)
        .subscribe(
          (dados) =>{
            this.popularDadosForm(dados,form)
          }
        );
    }
  }

  popularDadosForm(dados, formulario){
    // formulario.setValue({
    //   name: formulario.value.name,
    //   email: formulario.value.email
    // });
    formulario.form.patchValue({
      endereco:{
        cep:dados.cep,
        rua: dados.logradouro,
        complemento:dados.complemento,
        bairro:dados.bairro,
        cidade:dados.localidade,
        estado:dados.uf
      }
    }
    );
  }

  resetFormData(formulario){
    formulario.form.patchValue({
      endereco:{
        cep:null,
        rua:null,
        complemento:null,
        bairro:null,
        cidade:null,
        estado:null
      }
    }
    );
  }
  onSubmit(form){
    console.log(form.value);

    this._http.post('enderecoServer/formulario',JSON.stringify(form.value))
    .subscribe(
      (dados) => {
        console.log(dados);
      }
    );
  }

  constructor(private _http: HttpClient,
              private _consultaCEPService: ConsultaCepService
              ) { }

  ngOnInit(): void {
  }

}
