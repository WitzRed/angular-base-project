import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-search',
  templateUrl: './reactive-search.component.html',
  styleUrls: ['./reactive-search.component.css']
})
export class ReactiveSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries'
  readonly FIELDS ='name,filename,description,version,homepage';
  total:number;

  results$: Observable<any>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges
    .pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(value => this.http.get(this.SEARCH_URL,{
        params:{
          search: value,
          fields: this.FIELDS
        }
      })),
      tap((res: any) => this.total = res.total),
      map((res: any) => res.results)
    )
  }

  onSearch(){
    const fields='name,filename,description,version,homepage';
    let value = this.queryField.value;
    if(value && (value =value.trim())!==''){

      const params_ = {
        search:value,
        fields: fields
      };

      let params = new HttpParams();
      params = params.set('search',value);
      params.append('fields',fields);

      this.results$ = this.http.get(this.SEARCH_URL, {params})
      .pipe(
        tap((res: any) => this.total = res['total']),
        map((res: any) => res['results'])
      );
    }

    //https://api.cdnjs.com/libraries
  }

}
