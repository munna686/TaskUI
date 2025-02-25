import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { loginDTO } from '../model/loginDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl : string = environment.apiUrl+"/Auth";
  constructor(private http:HttpClient) { }

  login(dto:loginDTO){
    return this.http.post(`${this.apiUrl}/Login`,dto)
  }
}
