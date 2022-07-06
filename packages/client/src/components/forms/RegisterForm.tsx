import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '../../context/AuthContext';

interface FormValues {
  email: string;
  username: string;
  password: string;
}

const validationSchema = yup
  .object({
    email: yup.string().email('Email is invalid').required('Email is required'),
    username: yup
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username can not exceed 20 characters')
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  })
  .required();

export const RegisterForm = () => {
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register: registerUser } = useAuthContext();
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const navigate = useNavigate();

  const onSubmit = React.useCallback(
    (data: FormValues) => {
      registerUser
        .registerAsync(data)
        .then(() => {
          toast({
            position: 'top',
            title: 'Registration successful, logging in!',
            status: 'success',
            duration: 5000,
          });
          navigate('/', { replace: true });
        })
        .catch((error) => {
          toast({
            position: 'top',
            title: `${error.response.data.message}!`,
            description: 'Please try using a different email or username.',
            status: 'error',
            duration: 5000,
          });
        });
    },
    [registerUser]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <Input
          {...register('email')}
          id="email"
          type="email"
          placeholder="Email"
          _placeholder={{ color: 'gray' }}
          bg="white"
          color="black"
        />
        <Text fontWeight="bold" color="red.200">
          {errors.email?.message}
        </Text>
        <Input
          {...register('username')}
          id="username"
          type="username"
          placeholder="Username"
          _placeholder={{ color: 'gray' }}
          bg="white"
          color="black"
        />
        <Text fontWeight="bold" color="red.200">
          {errors.username?.message}
        </Text>
        <InputGroup>
          <Input
            {...register('password')}
            id="password"
            type={show ? 'text' : 'password'}
            placeholder="Password"
            _placeholder={{ color: 'gray' }}
            bg="white"
            color="black"
          />
          <InputRightElement>
            <Button
              color={'black'}
              bg="gray.300"
              size="sm"
              mr={10}
              minW="75px"
              onClick={handleClick}
              _hover={{ bg: 'gray.400' }}
              _active={{ bg: 'gray.400' }}
              _focus={{ boxShadow: 0 }}
            >
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text fontWeight="bold" color="red.200">
          {errors.password?.message}
        </Text>
        <Input
          type="submit"
          value="Register"
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
