import { NgModule } from "@angular/core";

import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    imports: [
        ShoppingListRoutingModule,
        ShoppingListComponent,
        ShoppingListEditComponent,
    ]
})
export class ShoppingListModule { }