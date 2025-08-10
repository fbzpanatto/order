// environment.ts (desenvolvimento)
import { ENVIRONMENT_COMMON } from "./environment.common";

export const environment = {
  ...ENVIRONMENT_COMMON,
  production: false,
  API_URL: 'http://localhost:3000/api/',
  ROOT_URL: 'http://localhost:3000/'
};
