import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
const currentDate = new Date();

@Injectable({
  providedIn: "root",
})
export class UtilitiesService {
  constructor(private http: HttpClient) {}

  getCurrentDate() {
    let sCurrentDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
    };

    return sCurrentDate;
  }


  fetchFromObject(obj, prop){
    //property not found
    if(typeof obj === 'undefined') return false;

    //index of next property split
    var _index = prop.indexOf('.')

    //property split found; recursive call
    if(_index > -1){
        //get object at property (before split), pass on remainder
        return this.fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index+1));
    }

    //no split; get property
    return obj[prop];
}

   // Custom filter method fot Angular Material Datatable
   createFilter() {
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


      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }

}
