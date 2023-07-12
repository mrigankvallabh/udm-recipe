import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgFor]
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id!: number;
  editMode = false;
  paramsSubscription!: Subscription;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        this.id = +params["id"];
        // this.editMode = (params["id"] !== undefined);
        this.editMode = !isNaN(this.id);
        this.initForm();
      });
  }

  onSubmit() {
    if (this.editMode) {

      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel(); // * Go back to previous page
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  get controls() {
    return (this.recipeForm.get("ingredients") as FormArray).controls;
  }

  onAddIngredient() {
    (this.recipeForm.get("ingredients") as FormArray).push(
      new FormGroup({
        "name": new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
        "amount": new FormControl(0, [Validators.required, Validators.min(0)]),
        "unit": new FormControl("pc", Validators.required),
      })
    );
  }

  onDeleteIngredient(id: number) {
    (this.recipeForm.get("ingredients") as FormArray).removeAt(id);
  }

  private initForm() {
    let recipeName = "";
    let recipeImageUrl = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray<any>([]);

    if (this.editMode) {
      const theRecipe = this.recipeService.getRecipe(this.id);
      recipeName = theRecipe.name;
      recipeImageUrl = theRecipe.imageUrl;
      recipeDescription = theRecipe.description;
      if (theRecipe.ingredients.length > 0) {
        for (const ing of theRecipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            "name": new FormControl(ing.name, [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
            "amount": new FormControl(ing.amount, [Validators.required, Validators.min(0)]),
            "unit": new FormControl(ing.unit, Validators.required)
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imageUrl": new FormControl(recipeImageUrl, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "ingredients": recipeIngredients
    });
  }
}
