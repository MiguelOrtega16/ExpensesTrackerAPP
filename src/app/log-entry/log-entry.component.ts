import { Component, OnInit } from "@angular/core";
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
    "whopaid",
    "item",
    "date",
    "area",
    "category",
    "total",
    "issplitted",
    "notes",
    "receipt",
    "status",
  ];
  dataSource: any;
  expandedElement: any | null;

  constructor(
    private entryLogService: EntryLogService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.entryLogService.getExpensesLogRecords().subscribe((res) => {
      console.log(res as Array<EntryLog>);
      this.dataSource = res as Array<EntryLog>;
    });
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
      return this.dataSource
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
      .subscribe((res) => {
        this.getTotalCost();
      });
  }

  getAreaColor(color) {
    console.log("asd");
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
