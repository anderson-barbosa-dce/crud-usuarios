import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDTO } from '../models/usuarioDTO.entity';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  private formGroup: FormGroup;
  private submitted: boolean = false;
  userSelected: UsuarioDTO;
  checkBoxValue: any = false;
  imageSrc: String;

  constructor(private service: UsuarioService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
      this.getUserSelected();
      this.generateForm();
      if(this.imageSrc === "assets/images/avatar-male.svg") {
        this.checkBoxValue = true;
      }
      else {
        this.checkBoxValue = false;
      }
  }

  get form() {
      return this.formGroup.controls;
  }

  generateForm() {
      this.formGroup = this.formBuilder.group(
          {
              name: [this.userSelected.name, [Validators.required]],
              email: [this.userSelected.email, [Validators.email, Validators.required]],
          }
      );
  }

  getUserSelected() {
    this.service.getById(+this.activatedRoute.snapshot.paramMap.get("id")).subscribe (
      res => {
        this.userSelected = res;
        this.imageSrc = this.userSelected.imageSrc;
      }, err => {
          console.log(err)
      }
    );
  }

  onEdit() {
      this.submitted = true;
      if(this.formGroup.invalid) {
          return;
      }
      this.userSelected.name = this.formGroup.controls["name"].value;
      this.userSelected.email = this.formGroup.controls["email"].value;
      this.userSelected.imageSrc = this.imageSrc;

      this.service.edit(this.userSelected).subscribe(
          result => {
              this.route.navigate(['/usuarios/view/', this.userSelected.id]);
          }, err => {

          }
      );
  }

  onSubmit() {
      this.submitted = true;
      if(this.formGroup.invalid) {
          return;
      }

      const user: UsuarioDTO = new UsuarioDTO(
          null,
          this.formGroup.controls["name"].value,
          this.formGroup.controls["email"].value,
          this.imageSrc,
      );

      this.service.insert(user).subscribe(
          result => {
              this.route.navigate(['/usuarios']);
          }, err => {

          }
      );
  }
  onReset() {
      this.submitted = false;
      this.formGroup.reset();
  }

    checkCheckBoxvalue() {
      if (this.checkBoxValue == false) {
        this.imageSrc = "assets/images/avatar-male.svg";
      }
      else {
        this.imageSrc = "assets/images/avatar-female.svg";
      }
    }
}
