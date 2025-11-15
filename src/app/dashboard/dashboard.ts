import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../shared/navbar/navbar";
import { Sidebar } from "../shared/sidebar/sidebar";
import { Footer } from "../shared/footer/footer";

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Sidebar, RouterOutlet, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
