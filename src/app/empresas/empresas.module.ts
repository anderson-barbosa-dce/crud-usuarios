import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaService } from './service/empresa.service';
import { EmpresaMockService } from './service/empresamock.service';
import { EmpresasRoutingModule } from './empresa-routing.module';
import { EmpresaCreateComponent } from './empresa-create/empresa-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [EmpresaListComponent, EmpresaCreateComponent],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [
    {
      provide: EmpresaService,
      useClass: EmpresaMockService
    }
  ]
})
export class EmpresasModule { }
