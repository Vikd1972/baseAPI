interface QuerySchemaUser {
  fullname?: string,
  email?: string,
  password?: string,
}
interface QuerySchemaLogin {
  email: string,
  password: string,
}

export { QuerySchemaUser, QuerySchemaLogin };