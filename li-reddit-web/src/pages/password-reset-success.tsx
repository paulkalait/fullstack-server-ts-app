import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Wrapper from "../components/Wrapper";

export const PasswordResetSuccess: React.FC<{}> = ({}) => {
  return (
    <Wrapper variant="regular">
      <Flex
        justifyContent="center"
        bg="gray.100"
        h="300px"
        borderRadius={15}
        alignItems="center"
        flexDirection="column"
      >
        <Box>
          <Image src="/Mail.svg" alt="mail" width="160" height="100" />
        </Box>
        <Text fontSize="larger" fontWeight={"bold"} mt={3}>
         If an account with that email exists, we have sent an email.
        </Text>
        <Text fontSize="large">Please check your inbox.</Text>
      </Flex>
    </Wrapper>
  );
};

export default PasswordResetSuccess;
