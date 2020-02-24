import { Component, OnInit,Output,EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  @Output() recipewasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[]; 
  subscription : Subscription;
  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) { }
   
  ngOnInit() {
    this.subscription=this.recipeService.recipesChanged.subscribe(
      (recipes:Recipe[])=>{
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }
  onRecipeSelected(recipe:Recipe){
    this.recipewasSelected.emit(recipe);
  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
