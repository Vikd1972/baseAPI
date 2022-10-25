import type { Request } from 'express';

import type User from '../db/entity/User';

export default interface IAuthInfoRequest extends Request {
  user?: User;
}
