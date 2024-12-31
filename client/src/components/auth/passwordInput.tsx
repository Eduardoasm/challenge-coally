import React from 'react';
import { useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";

interface PasswordInputProps {
  name: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ name }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name={name}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText textAlign="right">
      </FormHelperText>
    </FormControl>
  );
};