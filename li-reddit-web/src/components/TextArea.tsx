import React, { InputHTMLAttributes } from 'react'
import { useField} from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Textarea, ResponsiveValue } from '@chakra-ui/react';

type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    focusBorderColor: string;
    label: string;
    placeholder: string
    type?: string;
    width?: string;
    variant?: string;
    height?: string;
    resize?: any ;
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
    const [field, {error}] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        <Textarea resize={props.resize} focusBorderColor={props.focusBorderColor} variant={props?.variant} height={props?.height} {...field} id={field.name} placeholder={props.placeholder}/>
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    );
}