import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ItemsComponent } from "./items/items.component";
import { ItemComponent } from "./item/item.component";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: "home",
    component: AppComponent,
  },
  {
    path: "expenses",
    component: AppComponent,
  },
  { path: "items",
    component: ItemsComponent
  },
  {
    path: "", redirectTo: "/", pathMatch: "full"
  },
  {
    path: "item",
    children: [
      { path: "", component: ItemComponent },
      { path: "edit/:id", component: ItemComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
