import { Injectable } from '@angular/core';
import { IEmpresaService } from './iempresa.service';
import { EmpresaDTO } from '../models/empresaDTO.entity';
import { UsuarioDTO } from 'src/app/usuarios/models/usuarioDTO.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmpresaMockService implements IEmpresaService {

    business: EmpresaDTO[] = [
        new EmpresaDTO(1, "99825645000120", "GuiaDeRodas", "acessibilidade", "Para testes", "conseguir", [new UsuarioDTO(2, "Vinnicius", "vinnicius@mail.com", "assets/images/avatar-male.svg")])
    ]

    lastId: number = this.business[this.business.length - 1].id;

    list(): Observable<any> {
        return new Observable<any>(
            (obs) => {
                obs.next(this.business);
                obs.complete();
            }
        );
    }

    insert(empresa: any): Observable<any> {
        this.business.push(empresa);
        empresa.id = ++this.lastId;
        return new Observable<any> (
            (obs) => {
                obs.next(empresa);
                obs.complete();
            }
        );
    }
}  