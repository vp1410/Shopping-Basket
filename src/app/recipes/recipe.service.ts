import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Subject }from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
//    private recipes: Recipe[] = [
//         new Recipe(
//             'Strawberry Cheesecake',
//         'A super tasty cheesecake',
//         'https://www.seriouseats.com/2019/05/20190520-cheesecake-vicky-wasik-34-1500x1125.jpg',
//     [
//         new Ingredient('Strawberry',5),
//         new Ingredient('Cheese',3)
//     ]),
//         new Recipe(
//             'Chicken Burger',
//         'Burger you cannot resist',
//         'https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Crispy-Chicken-Burger-updated-square-Nov2019-500x375.jpg',
//     [
//         new Ingredient('Buns',2),
//         new Ingredient('Chicken',1)
//     ])
      
//       ];
    private recipes: Recipe[]=[];
      constructor(private slService : ShoppingListService){}
      setRecipe(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
      getRecipes(){
          return this.recipes.slice();
      }
      getRecipe(index:number){
          return this.recipes[index];
      }
      addIngredientsToShoppingList(ingredients : Ingredient[]){
          this.slService.addIngredients(ingredients);
      }
      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}