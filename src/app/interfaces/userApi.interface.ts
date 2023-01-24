import { UserEntityApiName } from './userApiName.interface';

export interface UserEntityApi {
  id: number;
  fakeToken: string;
  name: UserEntityApiName;
  login: string;
  password: string;
}
