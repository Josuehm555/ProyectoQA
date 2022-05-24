import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private api_url = environment.api_url;
  private headers = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") });

  constructor(private http: HttpClient) { }

  public consultar_productos_sin_blogs = () => {
    return this.http.get(this.api_url + '/mis_productos_sin_blog', { headers: this.headers, observe: 'response' })
  }

  public consultar_un_blog = (id_blog:any) => {
    return this.http.get(this.api_url +'/blogs/'+id_blog, { observe: 'response' })
  }

  public eliminar_un_blog = (id_blog:any) => {
    return this.http.get(this.api_url +'/eliminar_blog/'+id_blog, { headers: this.headers, observe: 'response' })
  }

  public eliminar_un_blog_creador = (id_blog:any) => {
    return this.http.get(this.api_url +'/eliminar_mi_blog/'+id_blog, { headers: this.headers, observe: 'response' })
  }

  public consultar_blogs_por_creador = (id_creador:any) => {
    return this.http.get(this.api_url +'/thumbnail_blogs_por_creador/'+id_creador, { headers: this.headers, observe: 'response' })
  }

  public consultar_mis_blogs = () => {
    return this.http.get(this.api_url +'/mis_blogs', { headers: this.headers, observe: 'response' })
  }

  public consultar_blogs_admin = () => {
    return this.http.get(this.api_url +'/blogs', { headers: this.headers, observe: 'response' })
  }

  public consultar_blogs = () => {
    return this.http.get(this.api_url +'/thumbnail_blogs', { headers: this.headers, observe: 'response' })
  }

  public crear_un_blog = (blog_info:any) => {
    return this.http.post(this.api_url +'/crear_blog', blog_info, {  headers: this.headers, observe: 'response' })
  }

  public modificar_un_blog = (blog_info:any) => {
    return this.http.post(this.api_url +'/modificar_blog', blog_info, {  headers: this.headers, observe: 'response' })
  }

}
