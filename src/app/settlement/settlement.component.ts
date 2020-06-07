import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatTable, MatDialog, MatDialogConfig } from '@angular/material';
import { EntryLog } from '../shared/entry-log.model';
import { FilterEntryLogTableComponent } from '../shared/filter-entry-log-table/filter-entry-log-table.component';
import { EntryLogStatusEnum } from "../shared/enums/entry-log-status-enum.model";
import { AreaCategoryEnumColors } from '../shared/enums/area-category-enum.model';
import { EntryLogService } from '../shared/entry-log.service';
import { SettlementLog } from '../shared/settlement-log.model';
import { SelectionModel } from '@angular/cdk/collections';
import { ChangeSettlementStatusComponent } from '../change-settlement-status/change-settlement-status.component';


@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.scss']
})
export class SettlementComponent implements OnInit {

  dataSource = new MatTableDataSource<SettlementLog>();
  filterSelectObj = [];
  entryLogStatusEnum = EntryLogStatusEnum;

  title = 'Expenses Tracker APP - Settlements';
  description =  'Here you can settle the things you have bought with your friends/family';

  userId : number;

  @ViewChild(FilterEntryLogTableComponent, {static: false}) filterEntryLog: FilterEntryLogTableComponent;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, { static: false }) settlementTable: MatTable<SettlementLog>;

  displayedColumns: string[] = [
    "select",
    "nickName",
    "itemDescription",
    "entryDescription",
    "date",
    "value",
    "status",
  ];

  selection = new SelectionModel<SettlementLog>(true, []);

  constructor(private route : ActivatedRoute,
              private entryLogService : EntryLogService,
              private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef) {
                this.setFilterObject();
               }

  ngOnInit() {

    this.route.params.subscribe(routeParams => {
      this.userId = routeParams.id;
      this.setUserSettlementDetails(routeParams.id);
    });


  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = this.filterEntryLog.createFilter();
    this.dataSource.sort = this.sort;
  }

  setUserSettlementDetails(userId : number){
    this.entryLogService.getExpensesLogRecordsById(userId).subscribe((res) => {
      this.dataSource.data = res as Array<SettlementLog>;
      this.filterSelectObj.filter((o) => {
        o.options = this.filterEntryLog.getFilterObject(res, o.columnProp);
      });
    });
  }

  getTotalCost() {
    if (this.dataSource !== undefined)
      return this.dataSource.data
        .map((t) => t.value)
        .reduce((acc, value) => acc + value, 0);
    else return 0;
  }

  setFilterObject(){
    this.filterSelectObj = [
      {
        name: 'Who Owes',
        columnProp: 'nickName',
        options: []
      },{
        name: 'Status',
        columnProp: 'status',
        options: []
      }
    ]
  }

  getAreaColor(color) {
    switch (color) {
      case AreaCategoryEnumColors.Azul:
        return "badge badge-pill badge-primary";
      case AreaCategoryEnumColors.Amarillo:
        return "badge badge-pill badge-warning";
      case AreaCategoryEnumColors.Gris:
        return "badge badge-pill badge-secondary";
      case AreaCategoryEnumColors.AzulVerdoso:
        return "badge badge-pill badge-info";
      case AreaCategoryEnumColors.Negro:
        return "badge badge-pill badge-dark";
      case AreaCategoryEnumColors.Verde:
        return "badge badge-pill badge-success";
      case AreaCategoryEnumColors.Rojo:
        return "badge badge-pill badge-danger";
      default:
        return "badge badge-pill badge-primary";
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected == numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}

checkSelect(element){
  console.log(element);
}

changeRowStatus(){
  var selectedRows = this.selection.selected;
  var usrId = this.userId;
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = false;
  dialogConfig.width = "50%";
  dialogConfig.data = { selectedRows, usrId };
  this.dialog
    .open(ChangeSettlementStatusComponent, dialogConfig)
    .afterClosed()
    .subscribe((response) => {
      if(response != undefined){
        var data = response;
        this.dataSource.data = data;
        this.changeDetectorRefs.detectChanges();

      }
    });
  console.log( this.selection.selected);
}

}
