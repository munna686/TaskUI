import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule],
  templateUrl: './user-component.component.html',
  styleUrl: './user-component.component.css'
})
export class UserComponentComponent implements OnInit {
  ngOnInit(): void {
    console.log("Hello froom Users")
  }
}
