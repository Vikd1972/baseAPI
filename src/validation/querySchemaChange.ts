import { object, string, date, number } from 'yup';

const querySchemaChange = object({  
    fullname: string().min(2).max(70).required(),
    dob: date().required(),
    pass: string().min(8).max(32).required(),
});

export default querySchemaChange