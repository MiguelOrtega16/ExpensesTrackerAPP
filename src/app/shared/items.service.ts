import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Items } from './items.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {


  readonly rootUrl = "http://localhost:5001/api"
  ItemsData : Items;

  constructor(private http : HttpClient) { }

  getItems(){
    return this.http.get(this.rootUrl + '/Items');
  }
}
