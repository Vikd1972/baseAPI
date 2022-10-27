import type * as yup from 'yup';

export type SchemaItemType = Record<string, yup.StringSchema | yup.NumberSchema>;

export type SchemaType = {
  body?: SchemaItemType;
  params?: SchemaItemType;
  query?: SchemaItemType;
};
