import { ActionReducerMap } from '@ngrx/store';

import * as fromAuthReducer from './../auth/store/auth.reducer';
import * as fromShoppingListReducer from './../shopping-list/store/shoppig-list.reducer';


export interface AppState {
    shoppingList: fromShoppingListReducer.State,
    auth: fromAuthReducer.State
}

export const AppReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingListReducer.shoppingListReducer,
    auth: fromAuthReducer.AuthReducer
}