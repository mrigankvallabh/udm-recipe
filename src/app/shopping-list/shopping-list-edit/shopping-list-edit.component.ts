import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgIf } from '@angular/common';

interface ingFormInput {
  ["ingName"]: string;
  ["ingAmount"]: number;
  ["ingUnit"]: string;
};

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild("ingForm", { static: false }) ingForm!: NgForm;
  public editMode = false;
  private inredientIdToEdit!: number;
  private inredientToEdit!: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  private ingredientEditSubscription!: Subscription;

  ngOnInit(): void {
    this.ingredientEditSubscription = this.shoppingListService.initiateIngredientEdit.subscribe(
      id => {
        this.inredientIdToEdit = id;
        this.inredientToEdit = this.shoppingListService.getIngredient(id);
        this.editMode = true;
        const value: ingFormInput = {
          "ingName": this.inredientToEdit.name,
          "ingAmount": this.inredientToEdit.amount,
          "ingUnit": this.inredientToEdit.unit,
        }
        this.ingForm.setValue(value);
      }
    );
  }

  onSubmit(ingForm: NgForm) {
    const value = ingForm.value as ingFormInput;
    const newIngredient = new Ingredient(value.ingName, value.ingAmount, value.ingUnit);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.inredientIdToEdit, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    ingForm.reset();
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.inredientIdToEdit);
    this.onClear();
  }

  onClear() {
    this.ingForm.reset();
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.ingredientEditSubscription.unsubscribe();
  }
}
