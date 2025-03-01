import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { environment } from '../../../../environment';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { CustomResponse } from '../../../model/CustomResponse';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule,Breadcrumb,TableModule],
  templateUrl: './user-component.component.html',
  styleUrl: './user-component.component.css'
})
export class UserComponentComponent implements OnInit {
    constructor(private userService:UserService) {}
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    Users : User[] = [];
    ngOnInit() {
      this.getAllUser()
        this.items = [
            { label: 'Dashboard' },
            { label: 'User List' }
        ];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

    getAllUser(){
      this.userService.getAllUser().subscribe(
        (res:CustomResponse) => {
          if(res.success){
            this.Users = res.data;
            console.log(res.data);
          }
          else{
            alert("No data found")
          }
        }
      )
    }
}
