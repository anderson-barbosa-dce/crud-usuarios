import { UsuarioDTO } from "src/app/usuarios/models/usuarioDTO.entity";

export class EmpresaDTO {
    id: number;
    cnpj: string;
    nomeFantasia: string;
    razaoSocial: string;
    missao: string;
    visao: string;
    funcionarios: UsuarioDTO[];

    constructor(id: number, cnpj: string, nomeFantasia: string, razaoSocial: string, missao: string, visao: string, funcionarios: UsuarioDTO[]) {
        this.id = id;
        this.cnpj = cnpj;
        this.nomeFantasia = nomeFantasia;
        this.razaoSocial = razaoSocial;
        this.missao = missao;
        this.visao = visao;
        this.funcionarios = funcionarios;
    }
}