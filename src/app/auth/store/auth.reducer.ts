import { User } from '../user.model';
import * as fromAuthAction from './authAction';

export interface State {
    user: User,
    authError: string,
    loading: boolean
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export function AuthReducer(state: State = initialState, action: fromAuthAction.AuthActions) {
    switch (action.type) {
        case fromAuthAction.AUTHENTICATE_SUCCESS:
            const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate)
            return {
                ...state,
                user: user,
                authError: null,
                loading: false
            };
        case fromAuthAction.AUTHENTICATE_FAIL:
            return {
                ...state,
                authError: action.payload,
                loading: false
            };
        case fromAuthAction.LOGOUT:
            return {
                ...state,
                user: null
                // loading: false
            };
        case fromAuthAction.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            };
        case fromAuthAction.SIGNUP_START:
            return{
                ...state,
                authError: null,
                loading: true
            };
        case fromAuthAction.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            };
        default:
            return state;
    }
}