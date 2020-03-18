import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioDTO } from '../models/usuarioDTO.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-view',
  templateUrl: './usuario-view.component.html',
  styleUrls: ['./usuario-view.component.css']
})
export class UsuarioViewComponent implements OnInit {

  private formGroup: FormGroup;
  isLoading: boolean = true;
  usuario: UsuarioDTO;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private service: UsuarioService, private router: Router) { }

  ngOnInit() {
    const id: number = +this.activatedRoute.snapshot.paramMap.get("id");
    this.service.getById(id).subscribe((
      result) => {
        this.usuario = result;
        this.isLoading = false;
    });
    this.generateForm();
  }
  generateForm() {
    this.formGroup = this.formBuilder.group(
        {
            name: [this.usuario.name, [Validators.required]],
            email: [this.usuario.email, [Validators.email, Validators.required]],
        }
    );
  }

}
