import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaCreateComponent } from './empresa-create/empresa-create.component';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { EmpresaViewComponent } from './empresa-view/empresa-view.component';
const routes: Routes = [
    {
        path: '',
        component: EmpresaListComponent
    },
    {
        path: "create",
        component: EmpresaCreateComponent
    },
    {
        path: "edit/:id",
        component: EmpresaEditComponent
    },
    {
        path: "view/:id",
        component: EmpresaViewComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpresasRoutingModule { }