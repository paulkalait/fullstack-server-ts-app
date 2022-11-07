import React from "react";
import { Formik, Form, FormikProps } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import InputField from "../components/inputField";
import { useLoginMutation, } from "../generated/graphql";
import { toErrorsMap } from "../utils/toErrorsMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";


const Login: React.FC<FormikProps<{}>> = ({}) => {
  const [, login] = useLoginMutation();

  const router = useRouter();


  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
         //converts the array of objects into an object and then gets displayed
            setErrors(toErrorsMap(response.data.login.errors));
            
          }else if (response.data?.login.user){
            //worked navigate to landing page with next js useRouter
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={3}>
              <InputField
                name="usernameOrEmail"
                placeholder="username or email"
                label="UsernameOrEmail"
              />
              <InputField
                name="password"
                placeholder="password"
                label="password"
                type="password"
              />
            </Box>
            <Button
              mt={3}
              variant="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient)(Login);
