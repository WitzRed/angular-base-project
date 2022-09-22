import { Directive, HostListener, ElementRef, Renderer2, HostBinding} from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver(){
      this._renderer.setStyle(
        this._elementRef.nativeElement,
        'background-color',
        'yellow'
        );
        this.faceColor = 'purple';
        this.fontWeight = 'bold';
      }

  @HostListener('mouseleave') onMouseLeave(){
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'background-color',
      'white'
      );
      this.faceColor = 'black';
      this.fontWeight = 'normal';
    }

@HostBinding('style.color') faceColor: string;
@HostBinding('style.font-weight') fontWeight: string;

@HostBinding('style.padding') get setPadding(){
  this.padding = '10px';
  return this.padding;
}

private padding:string;

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer2) {

    this.faceColor = 'black';
    this.fontWeight = 'normal';
    this.padding = '0px';
  }

}
