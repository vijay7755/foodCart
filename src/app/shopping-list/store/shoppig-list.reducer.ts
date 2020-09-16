import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShopphingListAction from './shopping-list.action';

export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export function shoppingListReducer(state: State = initialState, action: ShopphingListAction.ShoppingListActions) {
  switch (action.type) {
    case ShopphingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShopphingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShopphingListAction.UPDATE_IGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      }
      const UpdatedIngredients = [...state.ingredients];
      UpdatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: UpdatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShopphingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        // ingredients: [...state.ingredients.splice(action.payload, 1)]
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex != state.editedIngredientIndex
        }),
        editedIngredient: null,
        editedIngredientIndex: -1
      };

      case ShopphingListAction.START_EDIT:
        return{
          ...state,
          editedIngredientIndex: action.payload,
          editedIngredient: {...state.ingredients[action.payload]}
        }

        case ShopphingListAction.STOP_EDIT:
          return{
            ...state,
            editedIngredientIndex: -1,
            editedIngredient: null
          }

    default:
      return state;
  }
}