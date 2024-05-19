import {UserModel} from "./user.model";

export interface AuthState {
  user: UserModel | null;
  error: string | null;
  loading: boolean;
}
