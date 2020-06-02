import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // RouterModule.forChild([
    //   { path: 'shopping-list', component: ShoppingListComponent }
    // ])
    ShoppingListRoutingModule
  ]
  // exports: [RouterModule]
})
export class ShoppingListModule { }
