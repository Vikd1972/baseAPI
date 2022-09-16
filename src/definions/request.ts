import { Handler, Request } from "express"

  export interface AuthInfoRequest extends Request {
    User: {
      id: number,
      fullname: string,
      email: string,
      dob: string,
      isAdmin: boolean,
      hash: string
    }
  }
