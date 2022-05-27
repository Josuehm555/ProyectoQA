import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private api_url = environment.api_url;
  private headers = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token")});

  constructor(private http: HttpClient) { }

  public consultar_mi_perfil = () => {
    return this.http.get(this.api_url + '/perfil', { headers: this.headers, observe: 'response' })
  }

  public editar_perfil = (info_usuario:any) => {
    return this.http.post(this.api_url + '/editar_usuario', info_usuario, { headers: this.headers, observe: 'response' })
  }

  public cambiar_contrasena = (info_usuario:any) => {
    return this.http.post(this.api_url + '/cambiar_contrasena', info_usuario, { headers: this.headers, observe: 'response' })
  }
}
