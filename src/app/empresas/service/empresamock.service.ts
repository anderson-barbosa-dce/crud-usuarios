import { Injectable } from '@angular/core';
import { IEmpresaService } from './iempresa.service';
import { EmpresaDTO } from '../models/empresaDTO.entity';
import { UsuarioDTO } from 'src/app/usuarios/models/usuarioDTO.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmpresamockService implements IEmpresaService {

    empresas: EmpresaDTO[] = [
        new EmpresaDTO(1, "99825645000120", "GuiaDeRodas", "acessibilidade", "Para testes", "conseguir", [new UsuarioDTO(2, "Vinnicius", "vinnicius@mail.com", "assets/images/avatar-male.svg")])
    ]

    lastId: number = this.empresas[this.empresas.length - 1].id;

    insert(empresa: any): Observable<any> {
        this.empresas.push(empresa);
        empresa.id = ++this.lastId;
        return new Observable<any> (
            (obs) => {
                obs.next(empresa);
                obs.complete();
            }
        );
    }
}  