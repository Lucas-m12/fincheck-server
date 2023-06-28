import { compareSync, hashSync } from 'bcryptjs';
import { randomUUID } from 'crypto';

interface Props {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
}

export class User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  passwordHash: string;

  constructor(props: Props) {
    this.id = props.id ?? randomUUID();
    this.email = props.email;
    this.name = props.name;
    this.cpf = props.cpf;
    this.password = props.password;
    this.passwordHash = this.generatePasswordHash();
  }

  public isValidPassword(password: string) {
    return compareSync(password, this.password);
  }

  private generatePasswordHash() {
    const passwordHash = hashSync(this.password, 10);
    return passwordHash;
  }
}
