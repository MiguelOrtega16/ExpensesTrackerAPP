import { Injectable } from '@angular/core';
import { EntryLog } from './entry-log.model';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class EntryLogService {

  readonly rootUrl = "http://localhost:5001/api"
  ExpensesLogData : EntryLog;

  constructor(private http : HttpClient) {
    this.ExpensesLogData = new EntryLog();
   }

  getExpensesLogRecords(){
    return this.http.get(this.rootUrl + '/ExpensesLogs');
  }

  saveEntryRecord(formData ){

    console.log("lo que va a enviar");
    return this.http.post(this.rootUrl + '/ExpensesLogs', formData);
  }
}
