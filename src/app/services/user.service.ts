import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { CustomResponse } from '../model/CustomResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl + "/User"
  constructor(private http : HttpClient) { }

  getAllUser():Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${this.apiUrl}/Getall`);
  }

}
