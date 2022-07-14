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
  username: string;
  password: string;
}

const validationSchema = yup
  .object({
    username: yup.string().required('Please enter your username'),
    password: yup.string().required('Please enter your password'),
  })
  .required();

export const LoginForm = () => {
  const formOptions = { resolver: yupResolver(validationSchema) };
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const navigate = useNavigate();
  const { login } = useAuthContext();

  const onSubmit = (data: FormValues) => {
    login
      .loginAsync(data)
      .then((res: any) => {
        toast({
          position: 'top',
          title: 'Logging in, welcome back!',
          status: 'success',
          duration: 5000,
        });
        navigate('/', { replace: true });
      })
      .catch((error) => {
        toast({
          position: 'top',
          title: `${error.response.data.message}`,
          description: 'Please make sure your username and password are correct.',
          status: 'error',
          duration: 5000,
        });
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
              color="black"
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
          value="Login"
          fontSize="lg"
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
