import React, { useState } from "react";
import { NextPage } from "next";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import InputField from "../../components/inputField";
import Wrapper from "../../components/Wrapper";
import { toErrorsMap } from "../../utils/toErrorsMap";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Link from "next/link";

interface Props {
  token: string;
}
export const ChangePassword: NextPage<Props> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenErrors]  = useState("")
  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorsMap(response.data.changePassword.errors)
            if("token" in errorMap){
              setTokenErrors(errorMap.token)
            }
            setErrors(errorMap)
            setErrors(toErrorsMap(response.data.changePassword.errors));
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
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
            {tokenError ? (
              <Flex>
                    <Box color='red' mr={5}>{tokenError}</Box>
                    <Link href="/forgot-password">Try again</Link>
              </Flex>
            ) :  null }
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
export default withUrqlClient(createUrqlClient, {ssr: false})(ChangePassword);
