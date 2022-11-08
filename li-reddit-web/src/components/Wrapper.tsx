import { Box, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface WrapperProps {
  children: React.ReactNode;
  variant?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Flex justifyContent={"center"}>
      <Box mt={8} maxW={variant === "regular" ? "800px" : "400px"} w="100%">
        {children}
      </Box>
    </Flex>
  );
};

export default Wrapper;
