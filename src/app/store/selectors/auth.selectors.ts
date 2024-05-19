import { createFeatureSelector, createSelector } from '@ngrx/store';
import {UserModel} from "../models/user.model";

export const selectAuthState = createFeatureSelector<UserModel>('auth');

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: UserModel) => state as UserModel
);



