import { Injectable } from '@angular/core';
import { IUsuarioService } from './iusuario.service';
import { UsuarioDTO } from '../models/usuarioDTO.entity';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioMockService implements IUsuarioService {

    usuarios: UsuarioDTO[] = [
        new UsuarioDTO(1, "Gustavo Maciel", "gustavo@mail.com", "assets/images/avatar-male.svg"),
        new UsuarioDTO(2, "Vinnicius", "vinnicius@mail.com", "assets/images/avatar-male.svg"),
    ]

    lastId: number = this.usuarios[this.usuarios.length - 1].id;

    list(): Observable<any> {
        return new Observable<any>(
            (obs) => {
                obs.next(this.usuarios);
                obs.complete();
            }
        );
    }
    getById(id: number): Observable<any> {
      let aux: UsuarioDTO = null;
      this.usuarios.forEach((user) => {
        if(user.id == id) {
          aux = user;
        }
      });
      return new Observable<UsuarioDTO> (
        (obs) => {
            obs.next(aux);
            obs.complete();
        }
      );
    }
    insert(usuario: any): Observable<any> {
        this.usuarios.push(usuario);
        usuario.id = ++this.lastId;
        return new Observable<any> (
            (obs) => {
                obs.next(usuario);
                obs.complete();
            }
        );
    }
    edit(userSelected: UsuarioDTO): Observable<any> {
        this.usuarios.forEach((user) => {
          if(user.id == userSelected.id) {
              user = userSelected;
          }
        });
        return new Observable<any>(
            (obs) => {
                obs.next(userSelected);
                obs.complete();
            }
        );
    }
    delete(id: number): Observable<any> {
        const aux: UsuarioDTO[] = []
        this.usuarios.forEach((user) => {
            if(user.id != id) {
                aux.push(user);
            }
        });
        this.usuarios = aux;
        this.lastId -= 1;
        return new Observable<any>(
            (obs) => {
                obs.next(true);
                obs.complete();
            }
        );
    }

    constructor() { }
}
