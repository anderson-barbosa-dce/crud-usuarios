import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuarioService } from './service/usuario.service';
import { UsuarioMockService } from './service/usuariomock.service';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioViewComponent } from './usuario-view/usuario-view.component';



@NgModule({
  declarations: [UsuariosComponent, UsuariosListComponent, UsuarioCreateComponent, UsuarioEditComponent, UsuarioViewComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
      {
          provide: UsuarioService,
          useClass: UsuarioMockService
      },
  ]
})
export class UsuariosModule { }
