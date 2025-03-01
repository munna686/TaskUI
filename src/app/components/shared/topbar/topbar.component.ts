import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-topbar',
  imports: [MenubarModule,AvatarModule,OverlayBadgeModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit{
    items: MenuItem[]|undefined;
    ngOnInit(): void {
        this.items = [
          
          {
              label: 'Home',
              icon: 'pi pi-home',
              routerLink : '/admin/taskms/dashboard'

          },
          {
              label: 'Users',
              icon: 'pi pi-users',
              routerLink: '/admin/taskms/user'
          },
          {
              label: 'Task Opeartion',
              icon: 'pi pi-server',
              items: [
                  {
                      label: 'Components',
                      icon: 'pi pi-bolt'
                  },
                  {
                      label: 'Blocks',
                      icon: 'pi pi-server'
                  },
                  {
                      label: 'UI Kit',
                      icon: 'pi pi-pencil'
                  },
                  {
                      label: 'Templates',
                      icon: 'pi pi-palette',
                      items: [
                          {
                              label: 'Apollo',
                              icon: 'pi pi-palette'
                          },
                          {
                              label: 'Ultima',
                              icon: 'pi pi-palette'
                          }
                      ]
                  }
              ]
          },
          {
              label: 'Notification',
              icon: 'pi pi-bell'
          }
      ]
    }
}
