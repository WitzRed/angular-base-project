import { Directive, ElementRef, Renderer2} from '@angular/core';


//'p[FundoAmarelo]' para aplicar em paragrafos somente.
//'button[FundoAmarelo]' para apliar no botão
//Sem nada vai se aplicara tudo
@Directive({
  selector: '[FundoAmarelo]'
})


export class FundoAmareloDirective {

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer2) {
    //Insegura
    //  this._elementRef.nativeElement.style.backgroundColor = 'yellow';
    
    // Segura
    this._renderer.setStyle(this._elementRef.nativeElement,
                            'background-color',
                            'yellow');
   }

}
