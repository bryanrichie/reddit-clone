import { HStack, IconButton, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import { MdArrowCircleDown, MdArrowCircleUp } from 'react-icons/md';
import { useAuthContext } from '../context/AuthContext';
import {
  useAddCommentVote,
  useDeleteCommentVote,
  useUpdateCommentVote,
} from '../hooks/useCommentVotes';
import { useAddPostVote, useDeletePostVote, useUpdatePostVote } from '../hooks/usePostVote';
import { VoteCount } from './VoteCount';

interface Props {
  postId: string;
  parentId: string;
  commentId: string;
  voteStatus: boolean | null;
  upvotes: string;
  downvotes: string;
}

export const CommentVoteButtons = (props: Props) => {
  const { authToken } = useAuthContext();
  const addVoteMutation = useAddCommentVote(props.parentId, props.postId);
  const updateVoteMutation = useUpdateCommentVote(props.parentId, props.postId);
  const deleteVoteMutation = useDeleteCommentVote(props.parentId, props.postId);

  const voteButtonHoverBg = useColorModeValue('gray.100', 'gray.600');
  const upvoteButtonColorScheme = useColorModeValue('green', 'teal');
  const downvoteButtonColorScheme = useColorModeValue('red', 'red');

  const onUpvote = React.useCallback(() => {
    if (authToken && props.voteStatus == null) {
      const request = {
        commentId: props.commentId,
        vote: true,
      };

      return addVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    } else if (authToken && props.voteStatus == false) {
      const request = {
        commentId: props.commentId,
        vote: true,
      };

      return updateVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    } else if (authToken && props.voteStatus == true) {
      const request = {
        commentId: props.commentId,
      };

      return deleteVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    }
  }, [addVoteMutation, updateVoteMutation, deleteVoteMutation]);

  const onDownvote = React.useCallback(() => {
    if (authToken && props.voteStatus == null) {
      const request = {
        commentId: props.commentId,
        vote: false,
      };

      return addVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    } else if (authToken && props.voteStatus == true) {
      const request = {
        commentId: props.commentId,
        vote: false,
      };

      return updateVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    } else if (authToken && props.voteStatus == false) {
      const request = {
        commentId: props.commentId,
      };

      return deleteVoteMutation.mutateAsync({ ...request, token: authToken }).then((res) => {});
    }
  }, [addVoteMutation, updateVoteMutation, deleteVoteMutation]);

  return (
    <HStack alignSelf="flex-start" spacing={1} fontSize="sm">
      <IconButton
        aria-label="Upvote"
        variant="outline"
        colorScheme={props.voteStatus === true ? upvoteButtonColorScheme : 'black'}
        border="none"
        _focus={{ boxShadow: '0' }}
        _hover={{ bg: voteButtonHoverBg }}
        _active={{ bg: 'none' }}
        icon={<MdArrowCircleUp size="20px" />}
        onClick={() => onUpvote()}
        size="xs"
      />
      <VoteCount upvotes={props.upvotes} downvotes={props.downvotes} />
      <IconButton
        aria-label="Downvote"
        variant="outline"
        colorScheme={props.voteStatus === false ? downvoteButtonColorScheme : 'black'}
        border="none"
        _focus={{ boxShadow: '0' }}
        _hover={{ bg: voteButtonHoverBg }}
        _active={{ bg: 'none' }}
        icon={<MdArrowCircleDown size="20px" />}
        onClick={() => onDownvote()}
        size="xs"
      />
    </HStack>
  );
};
