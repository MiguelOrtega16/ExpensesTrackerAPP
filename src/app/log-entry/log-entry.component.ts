import { Component, OnInit, ViewChild, ɵConsole } from "@angular/core";
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
import { MatTable, MatSort, MatTableDataSource } from '@angular/material';
import { UtilitiesService } from '../shared/utilities.service';

@Component({
  selector: "app-log-entry",
  templateUrl: "./log-entry.component.html",
  styleUrls: ["./log-entry.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
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
  filterValues = {};
  dataSource = new MatTableDataSource<EntryLog>();
  expandedElement: any | null;
  filterSelectObj = [];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, { static: false }) logTable: MatTable<any>;


  constructor(
    private entryLogService: EntryLogService,
    private utilServices : UtilitiesService,
    private dialog: MatDialog
  ) {

    this.filterSelectObj = [
      {
        name: 'Paid By',
        columnProp: 'whoPaid.nickName',
        options: []
      }, {
        name: 'Item Name',
        columnProp: 'product.name',
        options: []
      }, {
        name: 'Date',
        columnProp: 'date',
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
        name: 'Total',
        columnProp: 'total',
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

  ngOnInit() {
    this.dataSource.filterPredicate = this.utilServices.createFilter();
    this.entryLogService.getExpensesLogRecords().subscribe((res) => {
      console.log(res as Array<EntryLog>);
      this.dataSource.data = res as Array<EntryLog>;
      this.filterSelectObj.filter((o) => {
        o.options = this.getFilterObject(res, o.columnProp);
      });
    });
  }

  ngAfterViewInit() {
    this.setSorteableColumns();
    this.dataSource.sort = this.sort;
  }


  filterChange(filter, event) {
    //let filterValues = {}
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }



    // Reset table filters
    resetFilters() {
      this.filterValues = {}
      this.filterSelectObj.forEach((value, key) => {
        value.modelValue = undefined;
      })
      this.dataSource.filter = "";
    }

    // Get Uniqu values from columns to build filter
    getFilterObject(fullObj, key) {
      console.log("filterobject");
      const uniqChk = [];
      fullObj.filter((obj) => {
        let objValue = this.utilServices.fetchFromObject(obj, key);
        if (!uniqChk.includes(objValue)) {
          uniqChk.push(objValue);
        }
        return obj;
      });
      return uniqChk;
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
          this.dataSource.data.push(newExpensesLog);
          console.log( this.dataSource);
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
}
