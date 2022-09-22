import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit();

  onSubmit(){
    if(this.formulario.valid){
      this.submit();
    }else{
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray){
    Object.keys(formGroup.controls).forEach(
      (campo) =>{
        console.log(campo);
        const controle = formGroup.get(campo);
        controle.markAsDirty();
        controle.markAsTouched();

        if(controle instanceof FormGroup || controle instanceof FormArray){
          this.verificaValidacoesForm(controle);
        }
      }
    );
  }

  resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(campo:string){
    if (this.formulario.get(campo).invalid && this.formulario.get(campo).touched){
      return true;
    }
    return false;
  }
  aplicaCSSErro(campo: string){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }
  verificaRequired(campo){
    return ( this.formulario.get(campo).hasError('required') && 
    (this.formulario.get(campo).touched || this.formulario.get(campo).dirty));
  }

  validateFieldArray(controls){
    return controls.map(v => v.value).reduce((final, current) => (current || final) ? true : false, false);
  }

  getCampo(campo: string){
    return this.formulario.get(campo);
  }

}
