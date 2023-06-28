import { randomUUID } from 'crypto';

export class Category {
  id: string;
  userId: string;
  name: string;
  icon: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: Props) {
    this.id = props.id ?? randomUUID();
    this.userId = props.userId;
    this.name = props.name;
    this.icon = props.icon;
    this.type = props.type;
    this.createdAt = props?.createdAt ?? new Date();
    this.updatedAt = props?.updatedAt ?? new Date();
  }
}

interface Props {
  id?: string;
  userId: string;
  name: string;
  icon: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}
