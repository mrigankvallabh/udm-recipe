import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  imageUrl = "";
  constructor(public name = "", public description = "", imageUrl = "", public ingredients: Ingredient[] = []) {
    this.imageUrl = 'assets/images/' + imageUrl;
  }
}
