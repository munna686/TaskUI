import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page404',
  imports: [CommonModule],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.css'
})
export class Page404Component implements OnInit{
ngOnInit(): void {
   console.log("hello");
}
}
