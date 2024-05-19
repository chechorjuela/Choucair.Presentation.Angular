import { createReducer, on } from '@ngrx/store';
import {signInFailure, signInRequest, signInSuccess, signUpRequest, signUpSuccess} from '../actions/auth.actions';
import {initialAuthState} from "../state/auth.state";

const _authReducer = createReducer(
  initialAuthState,
  on(signInRequest, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(signInSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),
  on(signInFailure, (state, { error }) => ({
    ...state,
    user: null,
    loading: false,
    error
  })),
  on(signUpRequest, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(signUpSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    error: null
  })),
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
