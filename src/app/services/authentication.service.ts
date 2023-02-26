import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as moment from "moment"; 
import { APIUrl } from '../../environments/environment';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(public http: HttpClient, private storage : Storage )  {
    this.loadToken();
   } 
   
  async loadToken() {
    const token = await this.storage.get(TOKEN_KEY ); 
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: {email, password}){
    return new Promise<any>((resolve, reject) =>{
      const formData  = new FormData();
      formData.append('email',credentials.email);
      formData.append('password',credentials.password);
      this.http.post(APIUrl + 'login',formData).toPromise().then(res =>{
        let result:any = res;
        if(result.response == true){
          this.isAuthenticated.next(true)
          this.storage.set(TOKEN_KEY, result.data.jwt).then(res =>{
            resolve(res);
          }).catch(error =>{
            reject(error);
          })
        }
        else{
          resolve(res);
        }        
      }).catch(error =>{
        reject(error);
      })
    })    
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return this.storage.remove(TOKEN_KEY);
  }
  
  register(user:any){
    return new Promise<any>((resolve, reject) =>{ 
      const formData  = new FormData();
      formData.append('firstname',user.firstname);
      formData.append('lastname',user.lastname);
      formData.append('birthdate',moment(user.birthdate).format('YYYY-MM-DD'));
      formData.append('email',user.email);
      formData.append('password',user.password);

      this.http.post(APIUrl + 'registro',formData).toPromise().then(res =>{
        resolve(res); 
      }).catch(error =>{
        reject(error);
      })
    });
  }
}
