import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { empty, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";
import { DropdownService } from 'src/app/services/dropdown.service';
import { IEstado } from 'src/app/shared/interfaces/i-estado';
import { ConsultaCepService } from '../consulta-cep.service';

import { saveAs } from 'file-saver';
import { FormValidations } from 'src/app/shared/classes/form-validations';
import { VerificaEmailService } from './service/verifica-email.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { ICidade } from 'src/app/shared/interfaces/i-cidade';
@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {
  
  // formulario: FormGroup;

  // forma antiga
  // estados: IEstado[];
  cidades: ICidade[];
  
  //forma nova
  estados: Observable<IEstado[]>;
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];

  frameworks: string[] = ['Aangular', 'React', 'Vue', 'Sencha'];
  
  submit(){
    console.log(this.formulario.value);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit,{
      frameworks: valueSubmit.frameworks.map((v,i) => v ? this.frameworks[i] : null )
      .filter(v => v !== null)
    });

    this._http.post('https://httpbin.org/post',JSON.stringify(valueSubmit))
      .subscribe(
        (dados) => {
          console.log(dados);
  
          //reseta form
          this.resetar();
        },
        (error: any) => alert('erro')
      );
  }

  downloadTabloid(){
    this._dropDownService.getTabloid(1).subscribe(
      tabloid =>{
        let blob:any = new Blob([tabloid], { type: 'application/pdf' });
			  const url = window.URL.createObjectURL(blob);
			  window.open(url);
			  saveAs(blob, 'tabloid.pdf');
			}), (error: any) => console.log('Error downloading the file'),
			                    () => console.info('File downloaded successfully');
  }

  consultaCEP(){
    const cep = this.formulario.get('endereco.cep').value;
    if(cep != null && cep !== ''){
      this._consultaCEPService.consultaCEP(cep)
        .subscribe(
          (dados) =>{
            this.popularDadosForm(dados)
          }
        );
    }
  }

  popularDadosForm(dados){
    // formulario.setValue({
    //   name: formulario.value.name,
    //   email: formulario.value.email
    // });
    this.formulario.patchValue({
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

  setCargo(){
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1, obj2){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setTecnologia(){
    const tecnologia = {nome: 'ruby', desc: 'Ruby'};
    this.formulario.get('tecnologias').setValue(tecnologia.nome);
  }

  compararTecnologias(obj1, obj2){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false))
    return this._formBuilder.array(values, FormValidations.requiredMinCheckbox(2));
  }

  validateEmail(formControl: FormControl){
    return this._verificaEmailService.verificaEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null ));
  }
  
  constructor(private _formBuilder: FormBuilder,
              private _http: HttpClient,
              private _dropDownService: DropdownService,
              private _consultaCEPService: ConsultaCepService,
              private _verificaEmailService: VerificaEmailService) {

                super();
               }

  ngOnInit(): void {

    // this._verificaEmailService.verificaEmail('email@email.com').subscribe();

    // this.formulario = new FormGroup({
    //   name:new FormControl(null),
    //   email: new FormControl(null)
    // })

    this.formulario = this._formBuilder.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      email: [null,Validators.compose([Validators.required,Validators.email]),[this.validateEmail.bind(this)]],
      confirmarEmail: [null,Validators.compose([FormValidations.equalsTo('email') ,Validators.required,Validators.email])],
      endereco: this._formBuilder.group({
        cep:[null, Validators.compose([Validators.required, FormValidations.cepValidator])],
        rua:[null, Validators.required],
        numero: [null, Validators.required],
        complemento:[null],
        bairro:[null, Validators.required],
        cidade:[null, Validators.required],
        estado:[null, Validators.required]
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null,Validators.compose([Validators.required,Validators.pattern('true')])],
      frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep').statusChanges.pipe(
      distinctUntilChanged(),
      tap( value => console.log('valor do Cep', value)),
      switchMap( status => status === 'VALID' ?
        this._consultaCEPService.consultaCEP(this.formulario.get('endereco.cep').value)
        : empty()
        )
      )
      .subscribe(dados => dados ?  this.popularDadosForm(dados) : {});

    this.formulario.get('endereco.estado').valueChanges
      .pipe(
        switchMap(sigla => this.estados.pipe(
          map(estados => estados.filter(estado => estado.sigla === sigla)),
          map(estados  => estados[0].id),
          switchMap(id => this._dropDownService.getCidades(id).pipe(
            map((cidades: ICidade[]) => this.cidades = cidades)
          ))
        )),
      )
      .subscribe();

    //  Para forma nova
    this.estados = this._dropDownService.getEstadosBr();

    // Para forma antiga
    // this._dropDownService.getEstadosBr()
    //   .subscribe(
    //     (dados: IEstado[]) => {
    //       this.estados = dados;
    //     }
    //   );

    this.cargos = this._dropDownService.getTICargos();
    this.tecnologias = this._dropDownService.getTecnologias();
    this.newsletterOp = this._dropDownService.getNewsletter();

  }


}
