import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../service/empresa.service';
import { EmpresaDTO } from '../models/empresaDTO.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {

  loading: boolean = true;
  business: EmpresaDTO[] = [];

  constructor(private service: EmpresaService, private router: Router) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.loading = true;
    this.service.list().subscribe(
        res => {
            this.loading = false;
            this.business = res;
        }, err => {
            console.log(err);
        }
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
        res => {
            this.list();
        }, err => {
            console.log(err)
        }
    );
    return false;
  }

  edit(id: number) {
    this.router.navigate(["empresas", "edit", id]);
  }
}
