

/*Modules*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MaterialModule } from './material.module';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';


/*Components*/
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { ItemsComponent } from './items/items.component';
import { LogEntryComponent } from './log-entry/log-entry.component';
import { ItemComponent } from './item/item.component';
import { EntryLogService } from './shared/entry-log.service';
import { LogEntryNewRecordComponent } from './log-entry/log-entry-new-record/log-entry-new-record.component';


/*Configs*/
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ItemsService } from './shared/items.service';
import { UsersService } from './shared/users.service';
import { UtilitiesService } from './shared/utilities.service';
import { NumbersOnlyDirective } from './shared/directives/numeric.directive';
import { MatCheckboxModule, MatRadioModule, MatSortModule } from '@angular/material';
import { SettlementComponent } from './settlement/settlement.component';
import { FilterEntryLogTableComponent } from './shared/filter-entry-log-table/filter-entry-log-table.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    LogEntryComponent,
    ItemComponent,
    SidebarComponent,
    LogEntryNewRecordComponent,
    NumbersOnlyDirective,
    SettlementComponent,
    FilterEntryLogTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatInputModule,
    AngularMyDatePickerModule,
    ReactiveFormsModule,
    MatSortModule
  ],
  providers: [ {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
  EntryLogService,
  ItemsService,
  UtilitiesService,
  UsersService,
  ],
  entryComponents: [LogEntryNewRecordComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
