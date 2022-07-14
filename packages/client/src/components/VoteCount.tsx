import { Text } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';

interface Props {
  upvotes: string;
  downvotes: string;
}

export const VoteCount = (props: Props) => {
  if (_.toInteger(props.upvotes) > _.toInteger(props.downvotes)) {
    const voteCount = Math.abs(_.toInteger(props.upvotes) - _.toInteger(props.downvotes));

    return <Text fontWeight="extrabold">+{voteCount}</Text>;
  }

  if (_.toInteger(props.downvotes) > _.toInteger(props.upvotes)) {
    const voteCount = Math.abs(_.toInteger(props.downvotes) - _.toInteger(props.upvotes));

    return <Text fontWeight="extrabold">-{voteCount}</Text>;
  } else return <Text fontWeight="extrabold">0</Text>;
};
