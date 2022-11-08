
import React from "react";
import { NextPage } from "next";
import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import router from "next/router";
import InputField from "../../components/inputField";
import Wrapper from "../../components/Wrapper";
import { toErrorsMap } from "../../utils/toErrorsMap";



interface Props { 
    token: string;
}
export const ChangePassword: NextPage<Props> = ({ token }) => {
  return (
    <Wrapper variant="regular">
    <Formik
      initialValues={{ newPassword: ""}}
      onSubmit={async (values, { setErrors }) => {
    //     const response = await login(values);
    //     if (response.data?.login.errors) {
    //    //converts the array of objects into an object and then gets displayed
    //       setErrors(toErrorsMap(response.data.login.errors));
          
    //     }else if (response.data?.login.user){
    //       //worked navigate to landing page with next js useRouter
    //       router.push('/')
    //     }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
        
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />
          <Button
            mt={3}
            variant="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Confirm
          </Button>
        </Form>
      )}
    </Formik>
  </Wrapper>
  );
};

ChangePassword.getInitialProps = async ({ query }) => {
  return {
    token: query.token as string, 
  };
};
export default ChangePassword;
