import { Injectable } from '@angular/core';
import { IEmpresaService } from './iempresa.service';
import { EmpresaDTO } from '../models/empresaDTO.entity';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService implements IEmpresaService {
  list(): import("rxjs").Observable<any> {
    throw new Error("Method not implemented.");
  }
  insert(empresa: any): import("rxjs").Observable<any> {
      throw new Error("Method not implemented.");
  }
  getById(id: number): import("rxjs").Observable<any> {
    throw new Error("Method not implemented.");
  }
  edit(empresa: EmpresaDTO): import("rxjs").Observable<any> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): import("rxjs").Observable<any> {
      throw new Error("Method not implemented.");
  }

  constructor() { }
}