import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketRoutingModule } from './basket-routing.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [BasketRoutingModule, CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  constructor(public basketService: BasketService) {}
}
