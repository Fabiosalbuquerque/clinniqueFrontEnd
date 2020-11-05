import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PacienteService } from 'app/services/paciente.service';
import { PacienteDTO } from 'app/models/paciente.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { MDCRipple } from '@material/ripple';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})

export class PacienteComponent implements AfterViewInit, OnInit {
  pacientes: PacienteDTO[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sort: MatSort;
  filtro: string;

  numPaciente;
  dataSource;
  displayedColumns: string[] = ['id', 'nome', 'email', 'idade'];
  constructor(private pacienteService: PacienteService) {
    this.filtro = '';

   }

  ngOnInit(): void {
    this.pacienteService.getAllPacientesPage('', 0, 10)
    .subscribe(response => {
      this.pacientes = response['content'];
      this.numPaciente = response['totalElements'];
      this.dataSource = new MatTableDataSource(this.pacientes);

    });
  }
  ngAfterViewInit() {
    const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));
    this.paginator.page
    .pipe(
        tap(() => this.CarregaPacientesPage(this.filtro))
    )
    .subscribe();
    }
    aplicarFiltro() {
      const filterValue = this.filtro;
      this.CarregaPacientesPage(filterValue);
     }
  CarregaPacientesPage(filtro: string) {
    return this.pacienteService.getAllPacientesPage(filtro, this.paginator.pageIndex, this.paginator.pageSize)
    .subscribe(response => {
      this.pacientes = response['content']
      this.numPaciente = response['totalElements'];
      this.dataSource = new MatTableDataSource(this.pacientes);
      this.dataSource.filter = filtro.trim().toLowerCase();
    });
  }
}


