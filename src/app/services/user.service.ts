import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { CustomResponse } from '../model/CustomResponse';
import { AddUserDTO } from '../model/addUserDTO';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl + "/User"
  constructor(private http : HttpClient) { }

  getAllUser():Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${this.apiUrl}/GetAll`);
  }

  adduser(dto : AddUserDTO):Observable<CustomResponse>{
    return this.http.post<CustomResponse>(`${this.apiUrl}/Registration`,dto);
  }

  deleteUser(id : number):Observable<CustomResponse>{
    return this.http.delete<CustomResponse>(`${this.apiUrl}/Delete/${id}`)
  }

}
