export interface AuthResponse {
    body: {
      user: User;
      accessToken: string;
      refreshToken: string;
    };
  }

  export interface AuthResponseError {
    body: {
      error: string;
    };
  }
  export interface User {
    _id: string;
    nombre: string;
    rut: string;
    email: string;
    telefono: string;
  }  

  export interface AccessTokenResponse{
    statusCode: number;
    body: {
      accessToken: string;
    },
    error?: string;
  }
  export interface Vehiculo {
    placa: string;
    marca: string;
    modelo: string;
    color: string;
  }