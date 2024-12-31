import React from 'react';
import { Stack, Button } from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { FormInput } from "./formInput";
import { PasswordInput } from "./passwordInput";

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => (
  <form onSubmit={(e) => { e.preventDefault(); const form = e.target as HTMLFormElement; onSubmit({ email: form.email.value, password: form.password.value }); }}>
    <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
      <FormInput
        icon={<FaUserAlt color="gray.300" />}
        type="email"
        placeholder="email address"
        name="email"
      />
      <PasswordInput name="password" />
      <Button
        borderRadius={0}
        type="submit"
        variant="solid"
        colorScheme="gray"
        width="full"
      >
        Login
      </Button>
    </Stack>
  </form>
);
