import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
@ViewChild('f') slForm: NgForm;

subscription: Subscription;
editMode: boolean = false;
editedItemIndex: number;

editedItem: Ingredient;

constructor(private slService: ShoppingListService){}

ngOnInit() {
  console.log('SL Edit Started')
this.subscription = this.slService.startedEditing.subscribe(
  (index: number) => {
  this.editedItemIndex = index;
  this.editMode = true;
  console.log('We are here')

  this.editedItem = this.slService.getIngredient(index)
  console.log('after:', this.editedItem)
  
  this.slForm.setValue({
    name: this.editedItem.name,
    amount: this.editedItem.amount
  })
})
console.log('After Edit');

}
onSubmit(form: NgForm){
  const value = form.value;
  const newIngredient = new Ingredient(value.name,value.amount);
  console.log(newIngredient)

  if(this.editMode){
    this.slService.updateIngredient(this.editedItemIndex, newIngredient);
  }else{
    this.slService.addIngredient(newIngredient);
  }
  this.editMode = false;
  form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear();

  }

  ngOnDestroy() {
this.subscription.unsubscribe()
  }


}
