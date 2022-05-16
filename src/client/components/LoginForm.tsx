import { Input, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '../context/authContext';

interface FormValues {
  username: string;
  password: string;
}

const validationSchema = yup
  .object()
  .shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

export const LoginForm = () => {
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const navigate = useNavigate();
  const { login } = useAuthContext();

  const onSubmit = (data: FormValues) => {
    login.loginAsync(data).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <Input
          {...register('username')}
          id="username"
          type="username"
          placeholder="Username"
          bg="white"
        />
        <Text>{errors.username?.message}</Text>
        <Input
          {...register('password')}
          id="password"
          type="password"
          placeholder="Password"
          bg="white"
        />
        <Text>{errors.password?.message}</Text>
        <Input type="submit" value="Login" bg="gray.400" color="white" />
      </VStack>
    </form>
  );
};
