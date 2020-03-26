import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isCNPJ, formatToCNPJ } from 'brazilian-values';
import { EmpresaService } from '../service/empresa.service';
import { Router } from '@angular/router';
import { EmpresaDTO } from '../models/empresaDTO.entity';
import { UsuarioService } from 'src/app/usuarios/service/usuario.service';
import { UsuarioDTO } from 'src/app/usuarios/models/usuarioDTO.entity';

@Component({
  selector: 'app-empresa-create',
  templateUrl: './empresa-create.component.html',
  styleUrls: ['./empresa-create.component.css']
})

export class EmpresaCreateComponent implements OnInit {

  private formGroup: FormGroup;
  private submitted: boolean = false;
  private imageSrc: String = "assets/images/business.svg";
  public cnpj = [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];

  public users: Array<UsuarioDTO>;
  
  constructor(private serviceUser: UsuarioService, private service: EmpresaService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.generateForm();
    this.listUsers();
  }

  get form() {
    return this.formGroup.controls;
  }
  
  get verifyCNPJ():boolean {
    return isCNPJ(this.formGroup.controls["cnpj"].value);
  }

  get employess() {
    return this.formGroup.get('funcionarios');
  } 

  generateForm() {
      this.formGroup = this.formBuilder.group(
          {
              name: ['', [Validators.required]],
              cnpj: ['', [Validators.required]],
              razaoSocial: ['', [Validators.required]],
              missao: ['', [Validators.required]],
              visao: ['', [Validators.required]],
              funcionarios: ['', [Validators.required]]
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

  onSubmit() {
      this.submitted = true;
      if(this.formGroup.invalid || !isCNPJ(this.formGroup.controls["cnpj"].value)) {
          return;
      }

      const company: EmpresaDTO = new EmpresaDTO(
          null,
          this.formGroup.controls["cnpj"].value,
          this.formGroup.controls["name"].value,
          this.formGroup.controls["razaoSocial"].value,
          this.formGroup.controls["missao"].value,
          this.formGroup.controls["visao"].value,
          this.formGroup.controls["funcionarios"].value
      );
      console.log(company);

      this.service.insert(company).subscribe(
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
