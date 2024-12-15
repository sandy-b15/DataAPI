export interface User {
  id: string;
  email: string;
  apiKey?: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
}