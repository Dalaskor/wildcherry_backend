import { Role } from '@app/database';

export interface JwtPayload {
  id: number;
  email: string;
  roles: Role[];
}
