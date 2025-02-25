import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from "../topbar/topbar.component";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, TopbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {
    console.log("Hello World")
  }
}
