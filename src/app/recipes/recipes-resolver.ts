import { inject } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

export function RecipesResolver() {
  const recipeService = inject(RecipeService);
  if (recipeService.getRecipes().length === 0) {
    return inject(DataStorageService).fetchRecipes()
  } else {
    return recipeService.getRecipes();
  }
}