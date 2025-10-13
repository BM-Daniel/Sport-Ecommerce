import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './shared/models/product';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, HeaderComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'eCommerce';
  products: IProduct[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
