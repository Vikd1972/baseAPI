interface QuerySchemaUser {
  fullname?: string,
  email?: string,
  pass?: string,
}
interface QuerySchemaLogin {
  email: string,
  pass: string,
}

export { QuerySchemaUser, QuerySchemaLogin };