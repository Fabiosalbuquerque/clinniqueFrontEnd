import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'app/config/api.config';
import { PacienteDTO } from 'app/models/paciente.dto';
import { MatPaginator } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  getAllPacientesPage(nome: string, pagina: number, linhas: number) {
    return this.http.get<PacienteDTO[]>(`${API_CONFIG.baseUrl}/paciente/?nome=${nome}&empresaid=&page=${pagina}&linerperpage=${linhas}`);
  }
}
