import React from 'react';
import { Box, Link, useToast } from "@chakra-ui/react";
import { AuthLayout } from "./authLayout";
import { LoginForm } from "./loginForm";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

export const LoginPage = () => {
  const navigate = useNavigate();

  const { login, isLoading, error } = useAuth();
  const toast = useToast();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await login(credentials);
      navigate('/tasks');
    } catch (err) {
      toast({
        title: 'Error',
        description: error || 'Login failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <AuthLayout>
      <LoginForm onSubmit={handleLogin} />
    </AuthLayout>
  );
};