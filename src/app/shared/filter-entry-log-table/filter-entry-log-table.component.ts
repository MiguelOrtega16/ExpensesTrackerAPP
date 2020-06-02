import { Component, OnInit, Input } from '@angular/core';
import {EntryLogStatusEnum} from '../enums/entry-log-status-enum.model'
import { UtilitiesService } from '../utilities.service';
import { MatTableDataSource } from '@angular/material';
import { EntryLog } from '../entry-log.model';

@Component({
  selector: 'app-filter-entry-log-table',
  templateUrl: './filter-entry-log-table.component.html',
  styleUrls: ['./filter-entry-log-table.component.scss']
})
export class FilterEntryLogTableComponent implements OnInit {
  @Input() FilterSelectObj  : [];
  @Input() TableDataSource : MatTableDataSource<EntryLog>;

  filterValues = {};
  entryLogStatusEnum = EntryLogStatusEnum;

  constructor(private utilServices : UtilitiesService) { }

  ngOnInit() {
  }


  filterChange(filter, event) {
    //let filterValues = {}
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.TableDataSource.filter = JSON.stringify(this.filterValues)
  }



     // Custom filter method fot Angular Material Datatable
     createFilter() {
      let _this = this;
     let filterFunction = function (data: any, filter: string): boolean {
       let searchTerms = JSON.parse(filter);
       let isFilterSet = false;
       for (const col in searchTerms) {
         if (searchTerms[col].toString() !== '') {
           isFilterSet = true;
         } else {
           delete searchTerms[col];
         }
       }

       let nameSearch = (_this) => {
         let found = false;
         if (isFilterSet) {
           let totalFiltersFound = 0;
           let totalFilters = 0;
           totalFilters = Object.keys(searchTerms).length;
           for (const col in searchTerms) {
             let phrase = searchTerms[col].trim().toLowerCase()
             if(col == 'splitted'){
               phrase = phrase == 'yes' ? 1 : 0;
             } else if (col == 'status'){
               phrase = phrase == 'not paid' ?  0 : phrase == 'paid' ? 1 : 2;
             }
               let filterValue = _this.utilServices.fetchFromObject(data, col);
               if (filterValue.toString().toLowerCase().indexOf(phrase) != -1 && isFilterSet){
                 totalFiltersFound++
               }
               if (totalFilters == totalFiltersFound)
               found = true;
           }
           return found
         } else {
           return true;
         }
       }
       return nameSearch(_this)
     }
     return filterFunction
   }


   // Reset table filters
   resetFilters() {
     this.filterValues = {}
     this.FilterSelectObj.forEach((value, key) => {
       console.log("El rese");
     })
     this.TableDataSource.filter = "";
   }

   // Get Uniqu values from columns to build filter
   getFilterObject(fullObj, key) {
     console.log("filterobject");
     const uniqChk = [];
     fullObj.filter((obj) => {
       let objValue = this.utilServices.fetchFromObject(obj, key);
       if (key === "splitted"){
         objValue = objValue == 1 ? 'Yes' : 'No';
       } else
       if (key === "status"){
         objValue = objValue == this.entryLogStatusEnum.NotPaid ? 'Not Paid' : objValue == this.entryLogStatusEnum.Paid ? 'Paid' : 'Not Fully Paid'
       }
         if (!uniqChk.includes(objValue)) {
           uniqChk.push(objValue);
         }


       return obj;
     });
     return uniqChk;
   }

}
