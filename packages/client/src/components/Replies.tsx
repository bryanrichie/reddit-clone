import { Spinner, UnorderedList, useColorModeValue } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useGetReplies } from '../hooks/useGetReplies';
import { Reply } from './Reply';

interface Props {
  parentId: string;
}

export const Replies = (props: Props) => {
  const { parentId } = props;
  const { data } = useGetReplies(parentId);

  const listBorder = useColorModeValue('black', 'white');

  const replies = _.map(data, (reply) => {
    return (
      <Reply
        id={reply.id}
        username={reply.username}
        comment={reply.comment}
        createdAt={reply.created_at}
      />
    );
  });

  return (
    <UnorderedList borderLeftColor={listBorder} borderLeftWidth={3} pl={5}>
      {replies}
    </UnorderedList>
  );
};
