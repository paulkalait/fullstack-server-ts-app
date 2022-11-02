import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer()
  });
  const [{fetching: logoutFetching},logout] = useLogoutMutation();

  console.log("data", data);


  let body = null;
  //data is loading
  if (fetching) {
    body = null;
  }
  //user not logged in
  else if (!data?.me) {
    body = (
         <Flex ml={"auto"}>
      <Box mr={4}>
        <Link href="/login">Login</Link>
      </Box>
      <Box>
        <Link href="/register">Register</Link>
      </Box>
    </Flex>
    )
   
  }
  //user is loogged in
  else {
    body = (
      <Flex>
        <Box ml={"auto"} mr={3}>
          {data?.me.username}
        </Box>
        <Button isLoading={logoutFetching} variant={"link"} onClick={() =>{
          logout()}
        } >logout</Button>
      </Flex>
    );
  }

  return (
    <Flex bg="778da9" p={4} borderBottom='1px' borderBottomColor="0d1b2a">
      {body}
    </Flex>
  );
};
