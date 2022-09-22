import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[hightlight]'
})
export class HightlightDirective implements OnInit {

  @HostListener('mouseenter') onMouseOver(){
      this.backgroundColor = this.highlightBgColor;
      this.faceColor = 'purple';
      this.fontWeight = 'bold';
    }

@HostListener('mouseleave') onMouseLeave(){
    this.backgroundColor = this.defaultBgColor;
    this.faceColor = 'black';
    this.fontWeight = 'normal';
  }

@HostBinding('style.background-color') backgroundColor: string;
@HostBinding('style.color') faceColor: string;
@HostBinding('style.font-weight') fontWeight: string;

@HostBinding('style.padding') get setPadding(){
  this.padding = '10px';
  return this.padding;
}


private padding:string;

@Input() defaultBgColor: string = 'white';
@Input() highlightBgColor: string = 'yellow';
@Input() watcher: boolean = false;

// @HostBinding('watcher') get setWatcher(){
//   this.watcher = !this.watcher;
//   console.log(this.watcher);
//   return this.watcher;
// }

  constructor() {
    this.backgroundColor = this.defaultBgColor;
    this.faceColor = 'black';
    this.fontWeight = 'normal';
    this.padding = '0px';
   }

  ngOnInit(){
    this.backgroundColor = this.defaultBgColor;
  }

}
