import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ItemsService } from "src/app/shared/items.service";
import { Items } from "src/app/shared/items.model";
import { EntryLogService } from "src/app/shared/entry-log.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import { UsersService } from "src/app/shared/users.service";
import { UtilitiesService } from "src/app/shared/utilities.service";
import { Users } from "src/app/shared/users.model";
import { IAngularMyDpOptions, IMyDateModel } from "angular-mydatepicker";
import { EntryLog } from 'src/app/shared/entry-log.model';




function splitTotalValidator() {

  return (formGroup: FormGroup) => {
    const splitTotal = formGroup.get('splitGroup.splitTotal');
    const totalPagado = formGroup.get('total');

    if (splitTotal.value !==null && (isNaN(splitTotal.value) || splitTotal.value >= totalPagado.value)) {
      splitTotal.setErrors({ splitTotalValidator: true });

    } else {
      splitTotal.setErrors(null);

    }
}

}

@Component({
  selector: "app-log-entry-new-record",
  templateUrl: "./log-entry-new-record.component.html",
  styleUrls: ["./log-entry-new-record.component.scss"],
})
export class LogEntryNewRecordComponent implements OnInit {
  itemsList: Array<Items>;
  filteredOptions: Items[];
  public myControl: FormControl;
  newEntryForm: FormGroup;
  usrsSplitted: FormArray;
  dataModel: Object;
  submitted = false;
  totalValue = 0;

  myOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: "dd/mm/yyyy",
    // other options...
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<LogEntryNewRecordComponent>,
    private itemService: ItemsService,
    private utilService: UtilitiesService,
    public userService: UsersService,
    public entryLogService: EntryLogService,
    private formBuilder: FormBuilder
  ) {
    this.myControl = new FormControl();
  }


  get description() {
    return this.newEntryForm.get("description");
  }

  get total() {
    return this.newEntryForm.get("total");
  }

  get splitTotal() {
    return this.newEntryForm.get("splitGroup.splitTotal");
  }

  get productId() {
    return this.newEntryForm.get("productId");
  }

  get date() {
    return this.newEntryForm.get("date");
  }

  get splitted(){
    return this.newEntryForm.get("splitted");

  }

  get splitMode(){
    return this.newEntryForm.get("splitMode");

  }

  ngOnInit() {
    this.InitializeDefaults();
    this.getProductFilteredOptions();
  }


  private InitializeDefaults() {
    this.dataModel = Object.create(null);
    this.newEntryForm = this.formBuilder.group({
      whoPaidId: new FormControl(""),
      productId: new FormControl("", [Validators.required]),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(150),
      ]),
      areaName: new FormControl("", []),
      categoryName: new FormControl(""),
      date: new FormControl(null, [Validators.required]),
      splitted: new FormControl(null),
      splitMode: new FormControl("custom"),
      total: new FormControl("0", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      splitGroup: new FormGroup({
        splitTotal: new FormControl(null, [Validators.required]),
        usersSplitted: this.formBuilder.array([]),
      }),
    },
    {
      validator : splitTotalValidator()
    });

    this.itemService.getItems().subscribe((res) => {
      this.itemsList = res as Array<Items>;
    });

    this.userService.getUsers().subscribe((res) => {
      this.userService.UserDataArr = res as Array<Users>;
      this.setDefaultFormValues();
    });

    this.newEntryForm.valueChanges.subscribe((data) => {
      this.dataModel = data;
    });
  }

  private _filter(value): Items[] {
    let filterValue = "";
    if (value.name !== undefined) filterValue = value.name.toLowerCase();
    else filterValue = value.toString().toLowerCase();
    return this.itemsList.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private getProductFilteredOptions() {
    this.myControl.valueChanges.subscribe((newValue) => {
      this.filteredOptions = this._filter(newValue);
    });
  }

  displayFn(item: Items): string {
    if (item !== null) return item.name;
    else return;
  }



  setDefaultFormValues() {
    let d: Date = new Date();
    d.setDate(d.getDate());
    let model: IMyDateModel = {
      isRange: false,
      singleDate: { jsDate: d },
      dateRange: null,
    };

    this.newEntryForm.patchValue({
      whoPaidId: this.userService.UserDataArr[0].userId.toString(),
      date: model,
    });
  }

  onProductChange($event) {
    var productInfo = this.itemsList.find(
      (x) => x.productId === this.myControl.value.productId
    );
    this.newEntryForm.patchValue({
      areaName: productInfo.area.description,
      categoryName: productInfo.category.description,
      productId: productInfo.productId,
    });
  }

  //#region "Splitted Methods"

  getSplittedUsers() {
    this.usrsSplitted = this.newEntryForm.get(
      "splitGroup.usersSplitted"
    ) as FormArray;

    this.usrsSplitted.clear();

    var whoPaidIdId = this.newEntryForm.controls["whoPaidId"].value;
    var SplittedUsersList = this.userService.UserDataArr.filter(
      (x) => x.userId.toString() !== whoPaidIdId
    );

    SplittedUsersList.forEach((element) => {
      this.usrsSplitted.push(
        this.formBuilder.group({
          userId: element.userId,
          nickName: element.nickName,
          checked: true,
          totalSplit: "0",
        })
      );
    });

    return SplittedUsersList;
  }

  UpdateSplittedValues() {

    switch (this.splitMode.value) {
      case "evenly":
        var totalUsers = 1;
        var totalSplit = 0;
        totalUsers += this.usrsSplitted.value.filter((x) => x.checked === true)
          .length;
        this.usrsSplitted.value.forEach((element) => {
          element.totalSplit = 0;
          if (element.checked) {
            element.totalSplit  = +(this.total.value / totalUsers).toFixed(2)
             .replace(/\.00$/, "");

            totalSplit +=  element.totalSplit;
          }
        });

        this.newEntryForm.patchValue(this.dataModel);
        this.splitTotal.patchValue(Math.round(totalSplit));
        this.totalValue = totalSplit;
        break;
      case "custom":
        if (this.usrsSplitted === undefined){
          this.getSplittedUsers();
        }
        this.usrsSplitted.value.forEach((element) => {
          element.totalSplit = 0;
        });
        this.newEntryForm.patchValue(this.dataModel);
        this.splitTotal.patchValue(0);
        this.totalValue = totalSplit;

        break;
      default:
        break;
    }
  }

  //#endregion
  updateSplitTotal(){
    var totalSplit = 0;
    this.usrsSplitted.value.forEach((user) => {
      if (user.checked) {
        totalSplit +=  +(+user.totalSplit).toFixed(2).replace(/\.00$/, "");
      }
    });


    this.splitTotal.patchValue(Math.round(totalSplit));
    this.totalValue = totalSplit;

  }



  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    this.entryLogService.saveEntryRecord(this.newEntryForm.value).subscribe((res : any) => {
     this.dialogRef.close(res.value);
    });


  }
}
