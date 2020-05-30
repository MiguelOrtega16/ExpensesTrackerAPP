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
}
