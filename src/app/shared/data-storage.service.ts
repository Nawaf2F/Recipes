import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { map } from 'rxjs-compat/operator/map';
import { Ingredient } from './ingredient.model';
import { exhaustMap, tap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authServ: AuthService) {}

  storingRecipe() {
    const recipes = this.recipeService.getRecipes();
    console.log(recipes);

      this.http.put('https://recipes-4ef75-default-rtdb.firebaseio.com/recipes.json',recipes)
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
   
  }

  fetchRecipe() {

        return this.http.get<Recipe[]>('https://recipes-4ef75-default-rtdb.firebaseio.com/recipes.json').pipe(tap(recipes => this.recipeService.setRecipes(recipes)))

  }
}

