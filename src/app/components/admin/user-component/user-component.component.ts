import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { environment } from '../../../../environment';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { CustomResponse } from '../../../model/CustomResponse';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../model/role';
import { DropdownModule } from 'primeng/dropdown';
import { Select } from 'primeng/select';
import { AddUserDTO } from '../../../model/addUserDTO';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-user-component',
  imports: [
    CommonModule,Breadcrumb,TableModule,Dialog, ButtonModule, InputTextModule,
    FloatLabelModule,FormsModule,DropdownModule,ReactiveFormsModule,Select
  ],
  templateUrl: './user-component.component.html',
  styleUrl: './user-component.component.css'
})
export class UserComponentComponent implements OnInit {
    constructor(private userService:UserService,private roleService:RoleService,private fb: FormBuilder) {}
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    Users : User[] = [];
    roles: Role[] = [];
    visible: boolean = false;
    adduser: AddUserDTO = new AddUserDTO();
    userForm! : FormGroup;
    

    ngOnInit() {
      this.userForm = this.fb.group({
        userId: [null], 
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        role: [null, Validators.required]
      },
      { validator: this.passwordMatchValidator}
    );
      this.getAllUser();
      this.getAllRoles();
        this.items = [
            { label: 'Dashboard' },
            { label: 'User List' }
        ];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

    passwordMatchValidator(form: AbstractControl) {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { mismatch: true };
    }

    mapFormWithUser() {
      this.adduser.userName = this.userForm.get('username')?.value;
      this.adduser.email = this.userForm.get('email')?.value;
      this.adduser.passwordHash = this.userForm.get('password')?.value;
      this.adduser.roleId = this.userForm.get('role')?.value;
    }
    
    
    
    onSubmit() {
      debugger;
      if (this.userForm.invalid) {
        this.userForm.markAllAsTouched(); 
        return;
      }
      this.mapFormWithUser();
      this.userService.adduser(this.adduser).subscribe({
        next : (res:CustomResponse) => {
          console.log(res)
          if(res.success) {
            Swal.fire({
            title: "Good job!",
            text: "User Added Successfully!",
            icon: "success"
           });
            this.getAllUser();
          }
          this.visible = false;
        },
        error : (res: CustomResponse) => {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User Already Exists!",
          });
        }
      })
      
    }

    confirmDelete(id : any) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.isConfirmed) {
          this.userService.deleteUser(id).subscribe({
            next : (res : CustomResponse) => {
              if(res.success) {
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
                this.getAllUser();
              }
              else {
                Swal.fire('Oops!', 'User cannot be Deleted.', 'error');
              }
            },
            error : (e:any) => Swal.fire('Oops!', 'User cannot be Deleted.', 'error')
          })
        }
      });
    }
    
    showDialog() {
      this.visible = true;
    }

    getAllRoles(){
      this.roleService.getAllRole().subscribe(
        (res:CustomResponse) => {
          if(res.success){
            this.roles = res.data;
            console.log(res);
            
          }
        }
      )
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
