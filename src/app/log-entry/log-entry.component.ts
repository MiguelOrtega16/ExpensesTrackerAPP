import { Component, OnInit, ViewChild, ɵConsole, DebugElement } from "@angular/core";
import { EntryLog } from "../shared/entry-log.model";
import { EntryLogService } from "../shared/entry-log.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { LogEntryNewRecordComponent } from "./log-entry-new-record/log-entry-new-record.component";
import { AreaCategoryEnumColors } from "../shared/enums/area-category-enum.model";
import { EntryLogStatusEnum } from "../shared/enums/entry-log-status-enum.model";
import { MatTable, MatSort, MatTableDataSource } from '@angular/material';
import { UtilitiesService } from '../shared/utilities.service';
import { FilterEntryLogTableComponent } from '../shared/filter-entry-log-table/filter-entry-log-table.component';

@Component({
  selector: "app-log-entry",
  templateUrl: "./log-entry.component.html",
  styleUrls: ["./log-entry.component.scss"],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LogEntryComponent implements OnInit {
  displayedColumns: string[] = [
    "whoPaid.nickName",
    "product.name",
    "date",
    "product.area.description",
    "product.category.description",
    "total",
    "splitted",
    "notes",
    "receipt",
    "status",
  ];

  isExpansionDetailRow = (i: number, row: Object) => true;
  expandedElement: any;

  entryLogStatusEnum = EntryLogStatusEnum;

  dataSource : MatTableDataSource<EntryLog>;
  filterSelectObj = [];

  title = 'Expenses Tracker APP';
  description = 'This platform will let you have a record of the money you and your family/friends have spent in something';

  @ViewChild(FilterEntryLogTableComponent, {static: false}) filterEntryLog: FilterEntryLogTableComponent;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, { static: false }) logTable: MatTable<EntryLog>;


  constructor(
    private entryLogService: EntryLogService,
    private utilServices : UtilitiesService,
    private dialog: MatDialog
  ) {
    this.setFilterObject();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<EntryLog>();
    this.entryLogService.getExpensesLogRecords().subscribe((res) => {
      console.log(res as Array<EntryLog>);
      this.dataSource.data = res as Array<EntryLog>;
      this.filterSelectObj.filter((o) => {
        o.options = this.filterEntryLog.getFilterObject(res, o.columnProp);
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = this.filterEntryLog.createFilter();
    this.setSorteableColumns();
    this.dataSource.sort = this.sort;
  }

  setSorteableColumns(){
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'product.name': return item.product.name;
        case 'whoPaid.nickName' : return item.whoPaid.nickName;
        case 'product.area.description': return item.product.area.description;
        case 'product.category.description': return item.product.category.description;
        default: return item[property];

      }
    };
  }

  isPaymentCompleted(logEntry: any): boolean {
    let totalPaid = 0;
    logEntry.expensesLogDetail.forEach((element) => {
      if (element.isPaid === 1) totalPaid += element.value;
    });
    return totalPaid === logEntry.total;
  }

  getTotalCost() {
    if (this.dataSource !== undefined)
      return this.dataSource.data
        .map((t) => t.total)
        .reduce((acc, value) => acc + value, 0);
    else return 0;
  }

  AddOrEditOrderItem(entryLogItemIndex, entryId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    dialogConfig.data = { entryLogItemIndex, entryId };
    this.dialog
      .open(LogEntryNewRecordComponent, dialogConfig)
      .afterClosed()
      .subscribe((newExpensesLog) => {
        if(newExpensesLog != undefined){
          var data = this.dataSource.data;
          data.push(newExpensesLog);
          this.dataSource.data = data;
          this.logTable.renderRows();
        }
      });
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


  setFilterObject(){
    this.filterSelectObj = [
      {
        name: 'Paid By',
        columnProp: 'whoPaid.nickName',
        options: []
      }, {
        name: 'Area',
        columnProp: 'product.area.description',
        options: []
      }, {
        name: 'Category',
        columnProp: 'product.category.description',
        options: []
      }, {
        name: 'Splitted?',
        columnProp: 'splitted',
        options: []
      }, {
        name: 'Status',
        columnProp: 'status',
        options: []
      }
    ]
  }
}
