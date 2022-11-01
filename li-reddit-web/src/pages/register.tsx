import React from 'react'
import {Formik, Form, FormikProps} from 'formik'
import { Box, Button, FormControl, FormLabel,Input } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import InputField from '../components/inputField';

interface registerProps {
    username: string; 
    password: string;
  
}


const Register: React.FC<FormikProps<registerProps>>= ({}) => {

         return( 
               <Wrapper variant='regular'>
           <Formik initialValues={{username: "", password: ""}} onSubmit={(values) => console.log(values)}>
            {({isSubmitting}) =>(
             <Form>
                <Box mt={3}>
                     <InputField  name='username' placeholder='username' label='Username'/>
                <InputField  name='password' placeholder='password' label='password' type="password"/>
                </Box>
               <Button mt={3} variant="teal" isLoading={isSubmitting} type='submit'>Register</Button>
             </Form>
            )}
           </Formik>  
             </Wrapper>
        )

       
}
export default Register;