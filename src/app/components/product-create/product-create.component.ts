/* This is a component for create product funcationality */
/* This component is used for form validation and call service to interact with backend APIs */

/* Import statements */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/* Selector, view and style configuration for this component */
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})

/* Export Component class */
export class ProductCreateComponent implements OnInit {
  formGroup: FormGroup;
  formSubmitted = false;
  addIcon = faPlus;
  showProductCreateSuccessMsg: boolean;
  showProductCreateFailMsg: boolean;
  productCreateSuccessMsg: string;
  productCreateFailMsg: string;
  constructor(private productService: ProductService, private formBuilder: FormBuilder,public router: Router) { }

  ngOnInit()  {
    // intializing form on page load
    this.addProduct();
  }

  // Add product form validation
  addProduct(){
    let productNameregex = /^[a-zA-Z ]*$/;
    let productDescregex = /^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/;
    let productPriceregex = /^(\d+\.\d{1,2})/;
    this.formGroup = this.formBuilder.group({
      productName: [null, [Validators.required, Validators.maxLength(20), Validators.pattern(productNameregex)]],
      productDesc: [null, [Validators.required, Validators.maxLength(50), Validators.pattern(productDescregex)]],
      productPrice: [null, [Validators.required, Validators.pattern(productPriceregex)]],
    });
  }

  //calling on submit of Add Product form
  onSubmit(product) {
    // checking form validation
    if(this.formGroup.valid){
      // subscribing to create product service
      this.productService.create(product)
      .subscribe(
        response => {
          // handling successful response and displaying validation message
          this.showProductCreateSuccessMsg = true;
          this.formSubmitted = true;
          this.productCreateSuccessMsg = "You have successfully added New Product";
          // disappearing validation message after 15 seconds
          setTimeout(() => this.showProductCreateSuccessMsg = false, 15000);
          this.formGroup.reset(this.formGroup.value);
        },
        error => {
          // handling failure response and displayinf validation message
          this.showProductCreateFailMsg = true
          this.productCreateFailMsg = "Unfortunately New Product is not added. Try Again!";
          // disappearing validation message after 15 seconds
          setTimeout(() => this.showProductCreateFailMsg = false, 15000);
          this.formGroup.reset(this.formGroup.value);
        }
      )
    }
  }
} 