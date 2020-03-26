import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaService } from './service/empresa.service';
import { EmpresaMockService } from './service/empresamock.service';
import { EmpresasRoutingModule } from './empresa-routing.module';
import { EmpresaCreateComponent } from './empresa-create/empresa-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { UsuarioService } from '../usuarios/service/usuario.service';
import { UsuarioMockService } from '../usuarios/service/usuariomock.service';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { EmpresaViewComponent } from './empresa-view/empresa-view.component';

@NgModule({
  declarations: [EmpresaListComponent, EmpresaCreateComponent, EmpresaEditComponent, EmpresaViewComponent],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgSelectModule
  ],
  providers: [
    {
      provide: EmpresaService,
      useClass: EmpresaMockService
    },
    {
      provide: UsuarioService,
      useClass: UsuarioMockService
    }
  ]
})
export class EmpresasModule { }
