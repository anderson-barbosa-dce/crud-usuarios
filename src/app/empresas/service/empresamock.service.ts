import { Injectable } from '@angular/core';
import { IEmpresaService } from './iempresa.service';
import { EmpresaDTO } from '../models/empresaDTO.entity';
import { UsuarioDTO } from 'src/app/usuarios/models/usuarioDTO.entity';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/usuarios/service/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class EmpresaMockService implements IEmpresaService {

    servicecompany: UsuarioService;

    business: EmpresaDTO[] = [
        new EmpresaDTO(1, "99.825.645/0001-20", "GuiaDeRodas", "acessibilidade", "Para testes", "conseguir", [new UsuarioDTO(2, "Vinnicius", "vinnicius@mail.com", "assets/images/avatar-male.svg")])
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

    getById(id: number): Observable<any> {
        let aux: EmpresaDTO = null;
        this.business.forEach((company) => {
            if(company.id == id) {
                aux = company;
            }
        });
        return new Observable<EmpresaDTO> (
            (obs) => {
                obs.next(aux);
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

    edit(companySelected: EmpresaDTO): Observable<any> {
        this.business.forEach((company) => {
          if(company.id == companySelected.id) {
              company = companySelected;
          }
        });
        return new Observable<any>(
            (obs) => {
                obs.next(companySelected);
                obs.complete();
            }
        );
    }

    delete(id: number): Observable<any> {
        const aux: EmpresaDTO[] = []
        this.business.forEach((company) => {
            if(company.id != id) {
                aux.push(company);
            }
        });
        this.business = aux;
        this.lastId -= 1;
        return new Observable<any>(
            (obs) => {
                obs.next(true);
                obs.complete();
            }
        );
    }
}  