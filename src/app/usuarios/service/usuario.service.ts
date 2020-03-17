import { Injectable } from '@angular/core';
import { IUsuarioService } from './iusuario.service';
import { UsuarioDTO } from '../models/usuarioDTO.entity';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements IUsuarioService {
    list(): import("rxjs").Observable<any> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): import("rxjs").Observable<any> {
        throw new Error("Method not implemented.");
    }
    getUserSelected(): import("rxjs").Observable<any> {
        throw new Error("Method not implemented.");
    }
    insert(usuario: any): import("rxjs").Observable<any> {
        throw new Error("Method not implemented.");
    }
    edit(user: UsuarioDTO): import("rxjs").Observable<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): import("rxjs").Observable<any> {
        throw new Error("Method not implemented.");
    }

  constructor() { }
}
