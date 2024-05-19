import {createAction, props} from '@ngrx/store';
import {
  SignInFailed,
  SignInRequest,
  SignInSuccess,
  SignUpFailed,
  SignUpRequest,
  SignUpSuccess
} from "../const/auth.const";
import {UserModel} from "../models/user.model";
import {AuthState} from "../models/auth.model";

export const signInRequest
  = createAction(SignInRequest, props<{ credentials: { username: string, password: string } }>());

export const signInSuccess
  = createAction(SignInSuccess, props<{ user: any }>());

export const signInFailure = createAction(SignInFailed, props<{ error: any }>());

export const signUpRequest
  = createAction(SignUpRequest, props<{
  credentials: { firstName: string, lastName: string, username: string, password: string, confirmPassword: string }
}>());
export const signUpSuccess
  = createAction(SignUpSuccess, props<{ user: any }>());
export const signUpFailure = createAction(SignUpFailed, props<{ error: any }>());
