import React from 'react';
import { InputGroup, InputLeftElement, Input, FormControl } from "@chakra-ui/react";

interface FormInputProps {
  icon: React.ReactElement;
  type: string;
  placeholder: string;
  name: string;
}

export const FormInput = ({ icon, type, placeholder, name }: FormInputProps) => (
  <FormControl>
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={icon} />
      <Input type={type} placeholder={placeholder} name={name} />
    </InputGroup>
  </FormControl>
);