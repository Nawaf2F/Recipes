import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
recipe: Recipe
id: number

constructor(private recipeService: RecipeService, 
  private route: ActivatedRoute,
  private router: Router,
  private ds: DataStorageService){

}

ngOnInit() {
this.route.params.subscribe((params: Params) => {
  this.id = +params['id'];
  this.recipe = this.recipeService.getById(this.id);
})
}
onAddToShoppingList(){
this.recipeService.addIngToShopList(this.recipe.ingredient)
}

onEditRecipe(){
this.router.navigate(['edit'], {relativeTo: this.route})
}

onDelete(){
this.recipeService.deleteRecipe(this.id)
this.router.navigate(['../'], {relativeTo: this.route})
}

}
