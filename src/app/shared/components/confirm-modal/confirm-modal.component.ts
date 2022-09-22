import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() cancelTxt: string;
  @Input() saveTxt: string;
  @Input() display:boolean;

  @Output() confirmResult = new EventEmitter();
 

  constructor() {}

  ngOnInit(): void {
  }

  onConfirm(){
    this.confirmAndClose('confirm');
  }

  
  onClose(){
    this.confirmAndClose('cancel');
  }

  private confirmAndClose(value:string){
    this.display = false;
    this.confirmResult.emit({decision: value});
  }

}
