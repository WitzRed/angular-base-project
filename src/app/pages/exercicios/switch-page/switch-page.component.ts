import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-switch-page',
  templateUrl: './switch-page.component.html',
  styleUrls: ['./switch-page.component.css']
})
export class SwitchPageComponent implements OnInit {

  id: string='';
  inscriver: Subscription;

  aba:string = 'home';
  
  constructor(private _activatedRoute: ActivatedRoute) {  
    this.inscriver = this._activatedRoute.params.subscribe(
      (params: any) => {
        this.id = params ['id'];
      }
    );
  }

  ngOnInit(): void {

  }

  ngOnDestry(){
    this.inscriver.unsubscribe();
  }

}
