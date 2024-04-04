import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
ingredients: Ingredient[];
private igChangeSub: Subscription

constructor(private slService: ShoppingListService){}

ngOnInit(){
  console.log('SL Starting')
this.ingredients = this.slService.getIngredients();
console.log('ingredients:',this.ingredients)
this.igChangeSub = this.slService.ingredientChanged.subscribe((ing: Ingredient[]) => {
  this.ingredients = ing;
  console.log(this.ingredients)
})
console.log('after changed',this.ingredients)
}

OnEdit(index: number){
  console.log('onEdit', index)
this.slService.startedEditing.next(index);
}

ngOnDestroy() {
this.igChangeSub.unsubscribe();
}

}
