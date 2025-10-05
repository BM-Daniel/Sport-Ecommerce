import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IProduct } from './shared/models/product';
import { IPagination } from './shared/models/pagination';
import { StoreComponent } from './store/store.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, StoreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'eCommerce';
  products: IProduct[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http
    //   .get<IPagination<IProduct[]>>(
    //     'http://localhost:8000/api/v1/Catalog/GetAllProducts'
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       this.products = response.data;
    //       console.log(response);
    //     },
    //     error: (error: any) => console.log(error),
    //     complete: () => console.log('Catalog API call completed'),
    //   });
  }
}
