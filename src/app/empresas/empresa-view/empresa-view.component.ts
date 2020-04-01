import { Component, OnInit } from '@angular/core';
import { EmpresaDTO } from '../models/empresaDTO.entity';
import { UsuarioDTO } from 'src/app/usuarios/models/usuarioDTO.entity';
import { UsuarioService } from 'src/app/usuarios/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../service/empresa.service';

@Component({
  selector: 'app-empresa-view',
  templateUrl: './empresa-view.component.html',
  styleUrls: ['./empresa-view.component.css']
})
export class EmpresaViewComponent implements OnInit {

  private formGroup: FormGroup;
  isLoading: boolean = true;
  companySelected: EmpresaDTO;
  public users: Array<UsuarioDTO>;
  private imageSrc: String = "assets/images/business.svg";

  constructor(private serviceUser: UsuarioService, private service: EmpresaService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getCompanySelected();
    this.generateForm();
    this.listUsers();
  }

  get form() {
    return this.formGroup.controls;
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

}
