import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentariosCalificacionesService {

  private api_url = environment.api_url;
  private headers = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") });

  constructor(private http: HttpClient) { }

  public crear_calificacion_blog = (calificacion_info:any) => {
    return this.http.post(this.api_url + '/crear_calificacion_blog', calificacion_info, { headers: this.headers, observe: 'response' })
  }

  public mi_calificacion_blog = (id_blog: number) => {
    return this.http.get(this.api_url + '/calificacion_blog/'+ id_blog, { headers: this.headers, observe: 'response' })
  }

  public crear_comentario_blog = (comentario_info:any) => {
    return this.http.post(this.api_url + '/crear_comentario_blog/', comentario_info, { headers: this.headers, observe: 'response' })
  }

  public modificar_comentario_blog = (comentario_info:any) => {
    return this.http.post(this.api_url + '/modificar_comentario_blog', comentario_info, { headers: this.headers, observe: 'response' })
  }

  public consultar_comentarios_blog_publico = (id_blog: number, cantidad_a_traer:number, pagina:number) => {
    return this.http.get(this.api_url + '/comentarios_blog/' + id_blog + '/' + cantidad_a_traer + '/' + pagina, { observe: 'response' })
  }

  public consultar_comentarios_blog = (id_blog: number, cantidad_a_traer:number, pagina:number) => {
    return this.http.get(this.api_url + '/comentarios_blog/' + id_blog + '/' + cantidad_a_traer + '/' + pagina, { headers: this.headers, observe: 'response' })
  }

  public eliminar_comentario_blog = (id_comentario:number, id_blog: number) => {
    return this.http.get(this.api_url + '/eliminar_comentario_blog/' + id_comentario + '/' + id_blog, { headers: this.headers, observe: 'response' })
  }

  public crear_resena_producto = (resena_info:any) => {
    return this.http.post(this.api_url + '/crear_resena_producto', resena_info, { headers: this.headers, observe: 'response' })
  }

  public consultar_resenas_producto_publico = (id_producto: number, cantidad_a_traer:number, pagina:number) => {
    return this.http.get(this.api_url + '/resenas_producto/' + id_producto +'/' + cantidad_a_traer + '/' + pagina, { observe: 'response' })
  }

  public consultar_resenas_producto = (id_producto: number, cantidad_a_traer:number, pagina:number) => {
    return this.http.get(this.api_url + '/resenas_producto/' + id_producto +'/' + cantidad_a_traer + '/' + pagina, { headers: this.headers, observe: 'response' })
  }

  public eliminar_resena_producto = (id_producto: number) => {
    return this.http.get(this.api_url + '/eliminar_resena_producto/' + id_producto, { headers: this.headers, observe: 'response' })
  }
  
}
