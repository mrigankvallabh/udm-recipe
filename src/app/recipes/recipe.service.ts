import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [
    // new Recipe(
    //   "Aloo Matar",
    //   "Traditional Peas and Potato curried with spices",
    //   "aloo-matar-480x480.jpeg",
    //   [
    //     new Ingredient("Potato", 1, "kg"),
    //     new Ingredient("Peas", 2, "kg"),
    //   ]
    // ),
    // new Recipe(
    //   "Bharia Machli",
    //   "Rohu Fish cooked in spicy Goan sauce",
    //   "bharia-machli-480x480.jpeg",
    //   [
    //     new Ingredient("Rohu Fish", 2, "whole")
    //   ]
    // ),
    // new Recipe(
    //   "Chicken Peratal",
    //   "A Keralan chicken delight",
    //   "chicken-peratal-480x480.jpeg",
    //   [
    //     new Ingredient("Chicken", 1, "kg"),
    //     new Ingredient("Bay Leaves", 100, "g")
    //   ]
    // ),
    // new Recipe(
    //   "Dal Makhani",
    //   "A blend of lentils cooked with butter and spices",
    //   "dal-makhani-480x480.jpeg",
    //   [
    //     new Ingredient("Mixed Lentils", 1, "lb")
    //   ]
    // ),
    // new Recipe(
    //   "Indian Baked Potato",
    //   "Whole Potatoes baked with spices",
    //   "indian-baked-potato-480x480.jpeg",
    //   []
    // ),
  ];

  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.getRecipes());
  }
}
