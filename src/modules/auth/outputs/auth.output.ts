export interface AuthOutput {
  user: {
    id: string;
    name: string;
    email: string;
    cpf: string;
  };
  token: string;
}
