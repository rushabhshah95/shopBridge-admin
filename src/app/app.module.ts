import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
//import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { EditableComponent } from './common/editable.component';
import { ViewModeDirective } from './directive/view-mode.directive';
import { EditModeDirective } from './directive/edit.mode.directive';
import { FocusableDirective } from './directive/focusable.directive';
// import { EditableOnEnterDirective } from './directive/editable-on-enter.directive';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotfoundComponent } from './components/notfound/notfound.component'
@NgModule({
  declarations: [
    AppComponent,
    ProductCreateComponent,
    ProductListComponent,
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    FocusableDirective,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
