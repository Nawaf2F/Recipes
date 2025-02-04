import { Component, Input, input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
@Input() recipe: Recipe;
@Input() index: number;

constructor(private route: ActivatedRoute) { 
}

ngOnInit() {
}

}
