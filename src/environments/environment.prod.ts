// environment.prod.ts
import { ENVIRONMENT_COMMON } from "./environment.common";

export const environment = {
  ...ENVIRONMENT_COMMON,
  production: true,
  API_URL: '/api/',           // Com barra inicial para caminhos absolutos
  ROOT_URL: '/'
};
