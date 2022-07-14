import {
  Collapse,
  HStack,
  ListItem,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { MdOutlineModeComment } from 'react-icons/md';
import { Replies } from './Replies';
import { ReplyForm } from './ReplyForm';
import { Timestamp } from './Timestamp';

interface Props {
  id: string;
  username: string;
  comment: string;
  createdAt: string;
}

export const Reply = (props: Props) => {
  const { id, username, comment, createdAt } = props;
  const { isOpen, onToggle } = useDisclosure();

  const replyHover = useColorModeValue('gray.200', 'gray.500');

  return (
    <ListItem listStyleType="none">
      <VStack align="flex-start" spacing={0} mb={2}>
        <HStack align="baseline">
          <Text fontWeight="bold" fontSize="lg">
            {username}
          </Text>
          <Timestamp createdAt={createdAt} />
        </HStack>
        <Text fontSize="sm">{comment}</Text>
      </VStack>
      <HStack
        spacing={0.5}
        _hover={{ bg: replyHover, borderRadius: 5 }}
        w="60px"
        p={1}
        mb={2}
        onClick={onToggle}
      >
        <MdOutlineModeComment size="15px" />
        <Text fontSize="xs" cursor="default">
          Reply
        </Text>
      </HStack>
      <Collapse in={isOpen}>
        <ReplyForm parentId={id} />
      </Collapse>
      <Replies parentId={id} />
    </ListItem>
  );
};
