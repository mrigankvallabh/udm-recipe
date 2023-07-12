import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.css'],
    standalone: true,
    imports: [RouterLinkActive, RouterLink]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Input() id!: number;

  ngOnInit(): void { }

}
