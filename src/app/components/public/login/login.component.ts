import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { loginDTO } from '../../../model/loginDTO';
import { CustomResponse } from '../../../model/CustomResponse';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ButtonModule,FloatLabelModule,InputTextModule,CardModule,
        ReactiveFormsModule,PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  user!:loginDTO;
  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      this.authService.login(this.user).subscribe({
        next: (res:CustomResponse) => {
          console.log(res);
          this.router.navigate(['admin/taskms/dashboard']);
        },
        error: (er:any) => {
          alert(er);
        }
      })
    }
  }
}
