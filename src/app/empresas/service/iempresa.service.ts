import { Observable } from 'rxjs';
import { EmpresaDTO } from '../models/empresaDTO.entity';

export interface IEmpresaService {
    list(): Observable<any>;
    insert(empresa: any): Observable<any>;
}
