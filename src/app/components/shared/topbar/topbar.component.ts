import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-topbar',
  imports: [Toolbar,MenubarModule,AvatarModule,OverlayBadgeModule,ButtonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
    constructor(private router:Router) {}
    myFunc(){
        this.router.navigate(['admin/taskms/user'])
    }
    goToDashBoard(){
        this.router.navigate(['admin/taskms/dashboard'])
    }
    goToTask(){
        this.router.navigate(['admin/taskms/task'])
    }
}
