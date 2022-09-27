interface QuerySchemaAdd {
  fullname: string,
  email: string,
  dob: Date,
  pass: string,
}
interface QuerySchemaLogin {
  email: string,
  pass: string,
}

export { QuerySchemaAdd, QuerySchemaLogin };