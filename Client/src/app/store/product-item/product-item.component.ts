import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CurrencyPipe, NgIf],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product?: IProduct;
}
