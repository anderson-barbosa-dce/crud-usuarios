import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isCNPJ, formatToCNPJ } from 'brazilian-values';
import { EmpresaDTO } from '../models/empresaDTO.entity';
import { EmpresaService } from '../service/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/usuarios/models/usuarioDTO.entity';
import { UsuarioService } from 'src/app/usuarios/service/usuario.service';

@Component({
  selector: 'app-empresa-edit',
  templateUrl: './empresa-edit.component.html',
  styleUrls: ['./empresa-edit.component.css']
})
export class EmpresaEditComponent implements OnInit {

  private formGroup: FormGroup;
  private submitted: boolean = false;
  companySelected: EmpresaDTO;
  private imageSrc: String = "assets/images/business.svg";
  public cnpj = [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  
  public users: Array<UsuarioDTO>;

  constructor(private serviceUser: UsuarioService, private service: EmpresaService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.getCompanySelected();
    this.generateForm();
    this.listUsers();
  }

  get form() {
    return this.formGroup.controls;
  }

  get verifyCNPJ():boolean {
    return isCNPJ(this.formGroup.controls["cnpj"].value);
  }

  generateForm() {
    this.formGroup = this.formBuilder.group(
        {
            name: [this.companySelected.nomeFantasia, [Validators.required]],
            cnpj: [this.companySelected.cnpj, [Validators.required]],
            razaoSocial: [this.companySelected.razaoSocial, [Validators.required]],
            missao: [this.companySelected.missao, [Validators.required]],
            visao: [this.companySelected.visao, [Validators.required]],
            funcionarios: [this.companySelected.funcionarios, [Validators.required]]
        }
    );
  }

  listUsers() {
    this.serviceUser.list().subscribe(
        res => {
            this.users = res;
        }, err => {
            console.log(err);
        }
    );
  }

  getCompanySelected() {
    this.service.getById(+this.activatedRoute.snapshot.paramMap.get("id")).subscribe (
      res => {
        this.companySelected = res;
      }, err => {
          console.log(err)
      }
    );
  }

  onEdit() {
    this.submitted = true;
    if(this.formGroup.invalid || !isCNPJ(this.formGroup.controls["cnpj"].value)) {
        return;
    }
    this.companySelected.cnpj = this.formGroup.controls["cnpj"].value,
    this.companySelected.nomeFantasia = this.formGroup.controls["name"].value,
    this.companySelected.razaoSocial = this.formGroup.controls["razaoSocial"].value,
    this.companySelected.missao = this.formGroup.controls["missao"].value,
    this.companySelected.visao = this.formGroup.controls["visao"].value,
    this.companySelected.funcionarios = this.formGroup.controls["funcionarios"].value

    this.service.edit(this.companySelected).subscribe(
        result => {
            this.route.navigate(['/empresas']);
        }, err => {

        }
    );
  }

  onReset() {
    this.submitted = false;
    this.formGroup.reset();
  }

}
