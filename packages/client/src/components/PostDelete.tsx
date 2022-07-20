import { Button, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { useDeleteSinglePost } from '../hooks/useGetSinglePost';

interface Props {
  postId: string;
}

export const PostDelete = (props: Props) => {
  const { postId } = props;
  const [token] = useLocalStorage<string | undefined>('auth');

  const navigate = useNavigate();
  const deletePostMutation = useDeleteSinglePost();

  const deleteFont = useColorModeValue('gray.500', 'gray.200');

  const onDelete = React.useCallback(() => {
    if (token) {
      return deletePostMutation.mutateAsync({ postId: postId, token }).then((res: any) => {
        navigate(`/`, { replace: true });
      });
    }
  }, [deletePostMutation]);

  return (
    <Button
      bg="none"
      pr="50px"
      color={deleteFont}
      _hover={{ textDecoration: 'underline' }}
      _active={{ textDecoration: 'underline' }}
      _focus={{ boxShadow: 0 }}
      onClick={() => onDelete()}
    >
      Delete
    </Button>
  );
};
