
import React from 'react';
import { Flex, Stack, Avatar, Heading, Box } from "@chakra-ui/react";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="gray.200"
    justifyContent="center"
    alignItems="center"
  >
    <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
      <Avatar bg="gray.500" />
      <Heading color="gray.400">Welcome</Heading>
      <Box minW={{ base: "90%", md: "468px" }}>
        {children}
      </Box>
    </Stack>
  </Flex>
);