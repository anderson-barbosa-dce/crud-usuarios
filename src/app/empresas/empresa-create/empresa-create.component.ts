import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isCNPJ, formatToCNPJ } from 'brazilian-values';
import { EmpresaService } from '../service/empresa.service';
import { Router } from '@angular/router';
import { EmpresaDTO } from '../models/empresaDTO.entity';

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
  
  constructor(private service: EmpresaService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.generateForm();
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
              name: ['', [Validators.required]],
              cnpj: ['', [Validators.required]],
              razaoSocial: ['', [Validators.required]],
              missao: ['', [Validators.required]],
              visao: ['', [Validators.required]]
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
          null
      );

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
