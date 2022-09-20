import { Handler, Request } from "express"

import User from "../db/entity/User"

export interface AuthInfoRequest extends Request {
  user: User
}
