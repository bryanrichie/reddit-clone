import { IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdArrowCircleDown, MdArrowCircleUp } from 'react-icons/md';
import { DatabasePost } from '../../server/services/database.service';
import { useAuthContext } from '../context/AuthContext';
import { useAddPostVote, useDeletePostVote, useUpdatePostVote } from '../hooks/usePostVote';
import { useRequiredParams } from '../utils/useRequiredParams';
import { VoteCount } from './VoteCount';

interface Props {
  voteStatus: boolean | null;
  upvotes: string;
  downvotes: string;
}

export const VoteButtons = (props: Props) => {
  const { postId } = useRequiredParams<{ postId: string }>();
  const { authToken } = useAuthContext();
  const addVoteMutation = useAddPostVote(postId);
  const updateVoteMutation = useUpdatePostVote(postId);
  const deleteVoteMutation = useDeletePostVote(postId);

  const onUpvote = React.useCallback(() => {
    if (authToken && props.voteStatus == null) {
      const request = {
        postId,
        vote: true,
      };

      return addVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    } else if (authToken && props.voteStatus == false) {
      const request = {
        postId,
        vote: true,
      };

      return updateVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    } else if (authToken && props.voteStatus == true) {
      const request = {
        postId,
      };

      return deleteVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    }
  }, [addVoteMutation, updateVoteMutation, deleteVoteMutation]);

  const onDownvote = React.useCallback(() => {
    if (authToken && props.voteStatus == null) {
      const request = {
        postId,
        vote: false,
      };

      return addVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    } else if (authToken && props.voteStatus == true) {
      const request = {
        postId,
        vote: false,
      };

      return updateVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    } else if (authToken && props.voteStatus == false) {
      const request = {
        postId,
      };

      return deleteVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    }
  }, [addVoteMutation, updateVoteMutation, deleteVoteMutation]);

  return (
    <>
      <IconButton
        aria-label="Upvote"
        variant={'outline'}
        colorScheme={props.voteStatus === true ? 'teal' : 'black'}
        border="none"
        _focus={{ boxShadow: '0' }}
        _hover={{ bg: 'gray.100' }}
        _active={{ bg: 'none' }}
        icon={<MdArrowCircleUp size={'40px'} />}
        onClick={() => onUpvote()}
      />
      <VoteCount upvotes={props.upvotes} downvotes={props.downvotes} />
      <IconButton
        aria-label="Downvote"
        variant={'outline'}
        colorScheme={props.voteStatus === false ? 'red' : 'black'}
        border="none"
        _focus={{ boxShadow: '0' }}
        _hover={{ bg: 'gray.100' }}
        _active={{ bg: 'none' }}
        icon={<MdArrowCircleDown size={'40px'} />}
        onClick={() => onDownvote()}
      />
    </>
  );
};
