import { Injectable } from '@angular/core';
import { EntryLog } from './entry-log.model';
import {HttpClient} from "@angular/common/http"
import { SettlementLog } from './settlement-log.model';

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


  getExpensesLogRecordsById(userId : number){
    return this.http.get(this.rootUrl + '/ExpensesLogs/user/' + userId);
  }

  saveEntryRecord(formData ){
    return this.http.post(this.rootUrl + '/ExpensesLogs', formData);
  }

  updateEntryStatus(settlementRows : Array<SettlementLog>, userId: number,  status : number){
    return this.http.post(this.rootUrl + '/ExpensesLogs/update-status/'+ userId + '/' +status, settlementRows);
  }
}
