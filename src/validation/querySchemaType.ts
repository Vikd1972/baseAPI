import type * as yup from 'yup';

export type QuerySchemaUserType = {
  fullname?: string;
  email?: string;
  password?: string;
};
export type QuerySchemaLoginType = {
  email: string;
  password: string;
};

export type SchemaItemType = Record<string, yup.StringSchema | yup.NumberSchema | yup.DateSchema>;

export type SchemaType = {
  body?: SchemaItemType;
  params?: SchemaItemType;
  query?: SchemaItemType;
};
