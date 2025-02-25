import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { Page404Component } from './components/public/page404/page404.component';
import { LoginComponent } from './components/public/login/login.component';

export const routes: Routes = [
   {path:'',redirectTo : '/login',pathMatch : 'full'},
   {path:'login', component : LoginComponent},
   {
    path : 'admin',component:LayoutComponent,canActivate: [authGuard],children:[
       {
        path : 'taskms',loadChildren:() => import('./routes/taskms.routes').then(r => r.adminRoutes)
       }
        
    ]
   },
   { path: '**', component: Page404Component },
];
