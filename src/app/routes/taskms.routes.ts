import { Routes } from "@angular/router";
import { WelcomeComponent } from "../components/dashboard/welcome/welcome.component";
import { UserComponentComponent } from "../components/admin/user-component/user-component.component";


export const adminRoutes: Routes = [
    {path:'dashboard',component:WelcomeComponent},
    {path : 'user',component:UserComponentComponent}
  ];