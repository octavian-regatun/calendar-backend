import { IUser } from '../models/user';
export interface DoneFunction {
  (err: unknown, user: IUser | null): void;
}
