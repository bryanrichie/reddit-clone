import React from 'react';
import { Flex, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRegisterUser } from '../hooks/useRegisterUser';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  email: string;
  username: string;
  password: string;
}

const validationSchema = yup
  .object()
  .shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    username: yup
      .string()
      .min(5, 'Username must be at least 5 characters')
      .max(20, 'Username can not exceed 20 characters')
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(12, 'Password must be at least 12 characters'),
  })
  .required();

export const Login = () => {
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const registerUserMutation = useRegisterUser();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    registerUserMutation.mutateAsync(data).then((res) => {
      console.log(res);
      navigate('/', { replace: true });
    });
  };

  return (
    <Flex justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input {...register('email')} id="email" type="email" placeholder="Email" />
          <Text>{errors.email?.message}</Text>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input {...register('username')} id="username" type="username" placeholder="Username" />
          <Text>{errors.username?.message}</Text>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input {...register('password')} id="password" type="password" placeholder="Password" />
          <Text>{errors.password?.message}</Text>
          <Input type="submit" />
        </VStack>
      </form>
    </Flex>
  );
};
