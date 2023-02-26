import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIUrl } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(public http: HttpClient, private storage: Storage) { }

  getCarts(page:number){
    return new Promise <any>((resolve, reject) =>{ 
      this.storage.get('auth-token').then(token =>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          })
        }
        this.http.get(APIUrl + 'lista?page='+page,httpOptions).toPromise().then(res =>{
          resolve(res);
        }).catch(error =>{
          reject(error);
        })
      }).catch(error =>{
        reject(error);
      })    
    })
  }
}
