import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
 private  myAppUrl = 'https://localhost:44306/';
 private myApiUrl='api/tarjeta/';
  constructor( private http:HttpClient) { }

  getListTarjeta():Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteTarjeta(id:number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl+id)
  }

  saveTarjeta(tarjeta:any) :Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl,tarjeta);
  }
  updateTarjeta(id:number,tarjeta:any):Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl,id,tarjeta);
  }
}
