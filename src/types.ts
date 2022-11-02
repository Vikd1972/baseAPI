import type { User } from './db/entity/User';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
      user?: User;
    }
  }
}
