import React from 'react';
import { Flex, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useLoginUser } from '../hooks/useLoginUser';
import { useLocalStorage } from 'react-use';

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
  const [token, setToken] = useLocalStorage<string | undefined>('auth');
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const loginUserMutation = useLoginUser();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    loginUserMutation.mutateAsync(data).then((res) => {
      setToken(res);
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
