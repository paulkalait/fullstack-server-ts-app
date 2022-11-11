import { Box, Button } from '@chakra-ui/react';
import { Formik, Form} from 'formik';
import { withUrqlClient } from 'next-urql';
import{ useRouter } from 'next/router';
import React from 'react'
import InputField from '../components/inputField';
import Wrapper from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';




const ForgotPassword: React.FC<{}> = ({}) => {
  const router = useRouter();
    const [, forgotPassword] = useForgotPasswordMutation();
        return (
            <Wrapper variant="regular">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values,) => {
          try {
            console.log(values)
            await forgotPassword(values)
            router.push('/password-reset-success')
          } catch (error) {
            console.log(error.message)
          }
         
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={3}>
              <InputField
                name="email"
                placeholder="Email"
                label="email"

              />
            </Box>
            <Button
              mt={3}
              variant="teal"
              isLoading={isSubmitting}
              type="submit"
            >
             Send
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
        );
};

export default (withUrqlClient)(createUrqlClient)(ForgotPassword);