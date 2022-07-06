import React from 'react';
import _ from 'lodash';
import { Text, useColorModeValue } from '@chakra-ui/react';

interface Props {
  commentCount: string;
}

export const CommentCount = (props: Props) => {
  const commentFont = useColorModeValue('gray.500', 'gray.200');

  if (_.toInteger(props.commentCount) < 1) {
    return <Text color={commentFont}>Comment</Text>;
  } else if (_.toInteger(props.commentCount) == 1) {
    return <Text color={commentFont}>{props.commentCount} Comment</Text>;
  }
  return <Text color={commentFont}>{props.commentCount} Comments</Text>;
};
