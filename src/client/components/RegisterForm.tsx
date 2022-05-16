import { Input, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '../context/authContext';

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

export const RegisterForm = () => {
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const navigate = useNavigate();
  const { register: registerUser } = useAuthContext();

  const onSubmit = React.useCallback(
    (data: FormValues) => {
      registerUser.registerAsync(data).then(() => {
        navigate('/', { replace: true });
      });
    },
    [registerUser]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <Input {...register('email')} id="email" type="email" placeholder="Email" bg="white" />
        <Text>{errors.email?.message}</Text>
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
        <Input type="submit" value="Register" bg="gray.400" color="white" />
      </VStack>
    </form>
  );
};
