import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private readonly url = "https://udm-recipe-fc335-default-rtdb.asia-southeast1.firebasedatabase.app";
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(`${this.url}/recipes.json`, recipes)
      .subscribe(res => console.log(res));
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(`${this.url}/recipes.json`)
      .pipe(
        map(recipes => recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] } as Recipe
        })),
        tap(recipes => this.recipeService.setRecipes(recipes))
      );
  }
}
