import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ListProductsComponent implements OnInit {
  products: any
  panelOpenState = false;
  constructor(private productService: ProductsService) { }

  async ngOnInit(): Promise<void>{
    await this.getAllProducts()
    console.log(this.products);
    
  }


  async getAllProducts() {
    this.productService.getAllUsers().subscribe(
      data => {
        this.products = data;
        console.log(data);
        
        if (this.products.status_code == 200) {
          this.products = this.products.products;
        } else {
          this.products = [];
        }
      },
      error => {
        this.products = [];
      });
  }
}
