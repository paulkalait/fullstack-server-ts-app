import React, { InputHTMLAttributes } from 'react'
import { useField} from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

type inputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    placeholder: string
    type?: string;
};

export const InputField: React.FC<inputFieldProps> = (props) => {
    const [field, {error}] = useField(props);
        return (
            <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <Input {...field} id={field.name} placeholder={props.placeholder} type={props?.type}/>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
          </FormControl>
        );
}

export default InputField