import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ItemsComponent } from "./items/items.component";
import { ItemComponent } from "./item/item.component";
import { AppComponent } from "./app.component";
import { SettlementComponent } from './settlement/settlement.component';
import { LogEntryComponent } from './log-entry/log-entry.component';

const routes: Routes = [
  {
    path: "home",
    component: AppComponent,
  },
  {
    path: "expenses",
    component: LogEntryComponent,
  },
  { path: "settlement",
  component: SettlementComponent
  },
  { path: '',  redirectTo: '/expenses', pathMatch: 'full' },

  {
    path: "item",
    children: [
      { path: "", component: ItemComponent },
      { path: "edit/:id", component: ItemComponent },
    ],
  },
  {
    path: "settlement",
    children: [
      { path: "", component: SettlementComponent },
      { path: "user/:id", component: SettlementComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
