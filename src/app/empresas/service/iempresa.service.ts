import { Observable } from 'rxjs';
import { EmpresaDTO } from '../models/empresaDTO.entity';

export interface IEmpresaService {
    insert(empresa: any): Observable<any>;
}
