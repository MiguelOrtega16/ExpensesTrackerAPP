import { Component, OnInit, Inject } from '@angular/core';
import { LogEntryNewRecordComponent } from '../log-entry/log-entry-new-record/log-entry-new-record.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EntryLogStatusEnum } from '../shared/enums/entry-log-status-enum.model';
import { UtilitiesService } from '../shared/utilities.service';
import { SettlementLog } from '../shared/settlement-log.model';
import { EntryLogService } from '../shared/entry-log.service';

@Component({
  selector: 'app-change-settlement-status',
  templateUrl: './change-settlement-status.component.html',
  styleUrls: ['./change-settlement-status.component.scss']
})
export class ChangeSettlementStatusComponent implements OnInit {

  statusOptions = new Array<any>();
  entryLogStatusEnum = EntryLogStatusEnum;
  settlementRows : Array<SettlementLog>;
  currentStatus : number;

  userId : number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedData,
    public dialogRef: MatDialogRef<LogEntryNewRecordComponent>,
    private utilitiesService : UtilitiesService,
    private entryLogService : EntryLogService)
    {

    }

  ngOnInit() {
    this.getStatusTypes();
    this.settlementRows = this.receivedData.selectedRows;
    this.userId = this.receivedData.usrId;
  }

  private getStatusTypes()
  {
    this.statusOptions.push({"name" : 'Not Paid' , "id" : this.entryLogStatusEnum.NotPaid})
    this.statusOptions.push({"name" : 'Paid' , "id" : this.entryLogStatusEnum.Paid})
    this.statusOptions.push({"name" : 'Partially Paid' , "id" : this.entryLogStatusEnum.PartialPaid})
    //this.statusOptions = this.utilitiesService.convertEnumToArray(this.entryLogStatusEnum);
  }


  updateStatus(){
    this.entryLogService.updateEntryStatus(this.settlementRows, this.userId, this.currentStatus).subscribe((res : any) => {
      this.dialogRef.close(res.value);
     });
  }

}
