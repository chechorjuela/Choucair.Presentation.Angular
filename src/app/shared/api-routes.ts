import {environment} from "../../environments/environment";

const BASE_API_URL = environment.apiUrl;

export const API_ROUTES = {
  AUTH: {
    BASE: `${BASE_API_URL}/auth`,
    SIGNIN: `${BASE_API_URL}/auth/signin`,
    SIGNUP: `${BASE_API_URL}/auth/signup`,
    LOGOUT: `${BASE_API_URL}/auth/logout`,
  },
  TASK: {
    BASE: `${BASE_API_URL}/TaskUser`,
    GET_TASKS: `${BASE_API_URL}/TaskUser`,
    GET_TASKS_BY_USER: (userId: string) => `${BASE_API_URL}/TaskUser/getByUser/${userId}`,
    POST_TASK: `${BASE_API_URL}/TaskUser`,
    PUT_TASK: (taskId: string) => `${BASE_API_URL}/TaskUser/${taskId}`,
    DELETE_TASK: (taskId: string) => `${BASE_API_URL}/TaskUser/${taskId}`,
  },
};
