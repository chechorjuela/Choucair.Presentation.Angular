import {UserModel} from "../models/user.model";
import {AuthState} from "../models/auth.model";


export const initialAuthState: AuthState = {
  user: null,
  error: null,
  loading: false,
};
