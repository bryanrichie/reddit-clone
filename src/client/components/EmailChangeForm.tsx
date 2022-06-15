import { Input, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = yup
  .object({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

export const EmailChangeForm = () => {
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <Input
          {...register('email')}
          id="email"
          type="email"
          placeholder="New email"
          _placeholder={{ color: 'gray' }}
          bg="white"
          color="black"
        />
        <Text>{errors.email?.message}</Text>
        <Input
          {...register('password')}
          id="password"
          type="password"
          placeholder="Password"
          _placeholder={{ color: 'gray' }}
          bg="white"
          color="black"
        />
        <Input
          type="submit"
          value="Submit"
          fontSize={'lg'}
          bg="blue.700"
          color="blue.100"
          fontWeight="bold"
          _hover={{ color: 'blue.700', bg: 'blue.100' }}
          _focus={{ boxShadow: 0 }}
          border={0}
        />
      </VStack>
    </form>
  );
};
