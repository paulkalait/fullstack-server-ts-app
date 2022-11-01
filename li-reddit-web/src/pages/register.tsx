import React from "react";
import { Formik, Form, FormikProps } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import InputField from "../components/inputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorsMap } from "../utils/toErrorsMap";

interface registerProps {
  username: string;
  password: string;
}

const REGISTER_MUT = `mutation Register($username:String!, $password:String!){
  register(options: {username: $username, password: $password}){
  errors{
    field,
    message
  }
    user{
      username
      id
      
    }
  }
}
`;

const Register: React.FC<FormikProps<registerProps>> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
         //converts the array of objects into an object and then gets displayed
            setErrors(toErrorsMap(response.data.register.errors));
          }else if (response.data?.register.user){
            //worked navigate to landing page with next js useRouter
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={3}>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Register;
