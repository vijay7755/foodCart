import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipeModule'},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
  // { path: 'shopping-list', loadChildren:() => import('./shopping-list/shopping-list.module').then(m=>m.ShoppingListModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
