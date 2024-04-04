import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { NotFoundComponent } from "./not-found/not-found.component";
import { RecipeStartComponent } from "./recipe/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe/recipe-edit/recipe-edit.component";
import { AuthComponent } from "./auth/auth.component";
import { RecipeResolverService } from "./recipe/recipes-resolver.service";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes : Routes = [
    {path:'', redirectTo: '/recipes', pathMatch:'full'},
    {path:'recipes',component: RecipeComponent, 
    canActivate: [AuthGuard],
    children: [
      {path:'',component: RecipeStartComponent},
      {path:'new', component: RecipeEditComponent},  
      {path:':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
      {path:':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
    ]},
    {path:'auth', component: AuthComponent},
    {path:'shopping-list', component: ShoppingListComponent},
    {path:'**', component: NotFoundComponent }
  ]
  

@NgModule({
imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})
export class AppRoutingModule{

}