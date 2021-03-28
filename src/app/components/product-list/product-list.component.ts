/* This is a component to list products and edit/delete products funcationality */
/* This component is used for form validation in edit mode and call service to interact with backend APIs to perform edit/delete operation */

/* Import statements */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

/* Selector, view and style configuration for this component */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

/*Export Component class */
export class ProductListComponent implements OnInit {
  products: any;
  productName = '';
  controls: FormArray;
  saveIcon = faSave;
  deleteIcon = faTrash;
  showListProductFailMsg: boolean;
  ListProductFailMsg: string;
  productNameValidationMsg: boolean;
  productDescValidationMsg: boolean;
  productPriceValidationMsg: boolean;
  productUpdateSuccessMsg: string;
  productUpdateFailMsg: string;
  showProductUpdateSuccessMsg: boolean;
  showProductUpdateFailMsg: boolean
  showProductdeleteSuccessMsg: boolean;
  productDeleteSuccessMsg: string;
  showProductDeleteFailMsg: boolean;
  productDeleteFailMsg: string;
  constructor(private productService: ProductService,public router: Router) { }

  ngOnInit(): void {
    // getting products on intialization of this component
    this.readProducts();
  }

  // function to get product data from backend bind it to form control and error handling
  readProducts(): void {
    this.productService.readAll()
      .subscribe(
        products => {
          this.products = products;
          let productNameregex = /^[a-zA-Z ]*$/;
          let productDescregex = /^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/;
          let productPriceregex = /^(\d+\.\d{1,2})/;
          const toGroups = this.products.map(product => {
            return new FormGroup({
              productId: new FormControl(product.productId, Validators.required),
              productName: new FormControl(product.productName, [Validators.required, Validators.maxLength(20), Validators.pattern(productNameregex)]),
              productDesc: new FormControl(product.productDesc, [Validators.required, Validators.maxLength(50), Validators.pattern(productDescregex)]),
              productPrice: new FormControl(product.productPrice, [Validators.required, Validators.maxLength(50), Validators.pattern(productPriceregex)]),
            });
          });
          this.controls = new FormArray(toGroups);
        },
        error => {
          this.showListProductFailMsg = true;
        });
  }

  // getting controls of field in update mode
  getControl(index: number, field: string) : FormControl {
    return this.controls.at(index).get(field) as FormControl;
  }

  // getting field and index of which is inedit mode 
  updateField(index: number, field: string) {
    const control = this.getControl(index, field);
    // checking validation for field in edit mode
    if (control.valid) {
      // Updating prducts array
      this.products = this.products.map((p, i) => {
        if (index === i) {
          return {
            ...p,
            [field]: control.value
          }
        }
        return p;
      })
    }else {
      // if form's field is not valid
      if (field == "productName")
        this.productNameValidationMsg = true;
      else if (field == "productDesc")
        this.productDescValidationMsg = true;
      else (field == "productPrice")
        this.productPriceValidationMsg = true;
    }
  }

  //On refresh getting products from backend
  refresh(): void {
    this.readProducts();
  }

  // Calling On click of Save button  
  saveCurrentProduct(product): void {
    this.productService.update(product.id, product)
    .subscribe(
      response => {
        this.showProductUpdateSuccessMsg = true;
        this.productUpdateSuccessMsg = "Successfully saved updated details of product Id: " + product.productId;
        // disappearing validation message after 15 seconds
        setTimeout(() => this.showProductUpdateSuccessMsg = false, 15000);
      },
      error => {
        this.showProductUpdateFailMsg = true;
        this.productUpdateFailMsg = "Unfortunately unable to update details of product Id: " + product.productId + ". Try Again to save the details!";
        // disappearing validation message after 15 seconds
        setTimeout(() => this.showProductUpdateFailMsg = false, 15000);
      }
    )
  }

  // Calling On click of Delete button
  deleteCurrentProduct(product): void {
    this.productService.delete(product.id)
      .subscribe(
        response => {
          this.showProductdeleteSuccessMsg = true;
          this.productDeleteSuccessMsg = "Successfully deleted product Id: " + product.productId;
          // disappearing validation message after 15 seconds
          setTimeout(() => this.showProductdeleteSuccessMsg = false, 15000);
        },
        error => {
          this.showProductDeleteFailMsg = true;
          this.productDeleteFailMsg = "Unfortunately unable to delete product Id: " + product.productId + ". Try Again!";
          // disappearing validation message after 15 seconds
          setTimeout(() => this.showProductDeleteFailMsg = false, 15000);
        });
  }

}