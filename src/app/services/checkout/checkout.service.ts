import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private api_url = environment.api_url;
  private headers = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") });

  constructor(private http: HttpClient) { }

  public consultar_tipos_de_pago = () => {
    return this.http.get(this.api_url + '/tipos_de_pago', { observe: 'response' })
  }

  public realizar_checkout = (info_pedido: any) => {
    return this.http.post(this.api_url + '/checkout', info_pedido, { headers: this.headers, observe: 'response' })
  }

  public realizar_pago = (info_pago: any) => {
    return this.http.post(this.api_url + '/pagar', info_pago, { headers: this.headers, observe: 'response' })
  }

}
