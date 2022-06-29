import React from 'react';
import _ from 'lodash';
import { Text } from '@chakra-ui/react';

interface Props {
  commentCount: string;
}

export const CommentCount = (props: Props) => {
  if (_.toInteger(props.commentCount) < 1) {
    return <Text color={'gray.500'}>Comment</Text>;
  } else if (_.toInteger(props.commentCount) == 1) {
    return <Text color={'gray.500'}>{props.commentCount} Comment</Text>;
  }
  return <Text color={'gray.500'}>{props.commentCount} Comments</Text>;
};
