export type IRegister = {
  email: string;
  username: string;
  password: string;
};

export type ILogin = {
  email: string;
  password: string;
};

export type IAuthResponse = {
  message: string;
  isAuthenticated: boolean;
  errors: string[];
  roles: string[];
  token: string;
  expiresAt: Date;
  user: { email: string; username: string; id: string };
};
