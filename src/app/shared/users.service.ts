import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Users } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly rootUrl = "http://localhost:5001/api"
  UserData : Users;
  UserDataArr : Array<Users>;


  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get(this.rootUrl + '/Users');
  }
}
