import { Text } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';

interface Props {
  createdAt: string;
}

export const Timestamp = (props: Props) => {
  const timeNow = Date.now();
  const createdAt = _.toInteger(props.createdAt);
  const age = Math.abs(timeNow - createdAt) / 1000;
  const days = Math.floor(age / 86000);
  const hours = Math.floor(age / 3600) % 24;
  const minutes = Math.floor(age / 60) % 60;
  const seconds = Math.floor(age % 60);

  const totalAge = () => {
    if (days <= 0 && hours <= 0 && minutes <= 0) {
      return `${seconds} seconds`;
    } else if (days <= 0 && hours <= 0) {
      return `${minutes} minutes`;
    } else if (days <= 0) {
      return `${hours} hours`;
    } else {
      return `${days} days`;
    }
  };

  return <Text fontSize="xs"> {totalAge()} ago</Text>;
};
