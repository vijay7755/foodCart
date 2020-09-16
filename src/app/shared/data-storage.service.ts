import { authService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: authService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipe-395ad.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log("save1",response);
      });
      // this.http
      // .put(
      //   'https://recipe-395ad.firebaseio.com/recipes2.json',
      //   recipes
      // )
      // .subscribe(response => {
      //   console.log("save2",response);
      // });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-395ad.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
