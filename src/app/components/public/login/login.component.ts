import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from "primeng/floatlabel"
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
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
        ReactiveFormsModule,PasswordModule,NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  user!:loginDTO;
  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.spinner.show();
    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      this.authService.login(this.user).subscribe({
        next: (res:CustomResponse) => {
          console.log(res);
          this.spinner.hide();
          this.router.navigate(['admin/taskms/dashboard']);
        },
        error: (er:any) => {
          this.spinner.hide();
          alert(er);
        }
      })
    }
  }
}
