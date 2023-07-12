import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    imports: [
        SharedModule,
        ShoppingListRoutingModule,
        ShoppingListComponent,
        ShoppingListEditComponent,
    ]
})
export class ShoppingListModule { }