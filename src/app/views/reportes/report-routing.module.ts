import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BitacorasComponent } from "./bitacoras/bitacoras.component";
import { CreateOrEditComponent } from "./create-or-edit/create-or-edit.component";

// import { DashboardComponent } from '../dashboard/dashboard.component';
import { IndexComponent } from "./index/index.component";

const routes: Routes = [
  {
    path: "index",
    component: IndexComponent,
    data: {
      title: "Report",
    },
  },
  {
    path: "create",
    component: CreateOrEditComponent,
    data: {
      title: "Create",
    },
  },
  {
    path: "bitacoras",
    component: BitacorasComponent,
    data: {
      title: "Create",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
