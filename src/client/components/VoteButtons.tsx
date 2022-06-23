import { IconButton, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import { MdArrowCircleDown, MdArrowCircleUp } from 'react-icons/md';
import { useAuthContext } from '../context/AuthContext';
import { useAddPostVote, useDeletePostVote, useUpdatePostVote } from '../hooks/usePostVote';
import { VoteCount } from './VoteCount';

interface Props {
  postId: string;
  voteStatus: boolean | null;
  upvotes: string;
  downvotes: string;
}

export const VoteButtons = (props: Props) => {
  const { authToken } = useAuthContext();
  const addVoteMutation = useAddPostVote(props.postId);
  const updateVoteMutation = useUpdatePostVote(props.postId);
  const deleteVoteMutation = useDeletePostVote(props.postId);
  const voteButtonHoverBg = useColorModeValue('gray.100', 'gray.600');
  const upvoteButtonColorScheme = useColorModeValue('green', 'teal');
  const downvoteButtonColorScheme = useColorModeValue('red', 'red');

  const onUpvote = React.useCallback(() => {
    if (authToken && props.voteStatus == null) {
      const request = {
        postId: props.postId,
        vote: true,
      };

      return addVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    } else if (authToken && props.voteStatus == false) {
      const request = {
        postId: props.postId,
        vote: true,
      };

      return updateVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    } else if (authToken && props.voteStatus == true) {
      const request = {
        postId: props.postId,
      };

      return deleteVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    }
  }, [addVoteMutation, updateVoteMutation, deleteVoteMutation]);

  const onDownvote = React.useCallback(() => {
    if (authToken && props.voteStatus == null) {
      const request = {
        postId: props.postId,
        vote: false,
      };

      return addVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    } else if (authToken && props.voteStatus == true) {
      const request = {
        postId: props.postId,
        vote: false,
      };

      return updateVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    } else if (authToken && props.voteStatus == false) {
      const request = {
        postId: props.postId,
      };

      return deleteVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    }
  }, [addVoteMutation, updateVoteMutation, deleteVoteMutation]);

  return (
    <VStack alignSelf="flex-start">
      <IconButton
        aria-label="Upvote"
        variant={'outline'}
        colorScheme={props.voteStatus === true ? upvoteButtonColorScheme : 'black'}
        border="none"
        _focus={{ boxShadow: '0' }}
        _hover={{ bg: voteButtonHoverBg }}
        _active={{ bg: 'none' }}
        icon={<MdArrowCircleUp size={'40px'} />}
        onClick={() => onUpvote()}
      />
      <VoteCount upvotes={props.upvotes} downvotes={props.downvotes} />
      <IconButton
        aria-label="Downvote"
        variant={'outline'}
        colorScheme={props.voteStatus === false ? downvoteButtonColorScheme : 'black'}
        border="none"
        _focus={{ boxShadow: '0' }}
        _hover={{ bg: voteButtonHoverBg }}
        _active={{ bg: 'none' }}
        icon={<MdArrowCircleDown size={'40px'} />}
        onClick={() => onDownvote()}
      />
    </VStack>
  );
};
