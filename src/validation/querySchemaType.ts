interface QuerySchemaAdd {
  fullname: string,
  email: string,
  dob: Date,
  pass: string,
}

interface QuerySchemaChange {
  fullname?: string,
  email: string,
  pass?: string,
}
interface QuerySchemaLogin {
  email: string,
  pass: string,
}

export { QuerySchemaAdd, QuerySchemaChange, QuerySchemaLogin };