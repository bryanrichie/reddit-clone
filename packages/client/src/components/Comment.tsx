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
import { CommentVoteButtons } from './CommentVoteButtons';
import { Replies } from './Replies';
import { ReplyForm } from './ReplyForm';
import { Timestamp } from './Timestamp';

interface Props {
  postId: string;
  id: string;
  username: string;
  comment: string;
  createdAt: string;
  voteStatus: boolean | null;
  upvotes: string;
  downvotes: string;
}

export const Comment = (props: Props) => {
  const { id, username, comment, createdAt } = props;
  const { isOpen, onToggle } = useDisclosure();

  const replyHover = useColorModeValue('gray.200', 'gray.500');

  return (
    <ListItem listStyleType="none" p={2}>
      <VStack align="flex-start" spacing={0} mb={2}>
        <HStack align="baseline">
          <Text fontWeight="bold" fontSize="lg">
            {username}
          </Text>
          <Timestamp createdAt={createdAt} />
        </HStack>
        <Text fontSize="sm">{comment}</Text>
      </VStack>
      <HStack>
        <CommentVoteButtons
          parentId={props.id}
          postId={props.postId}
          commentId={props.id}
          voteStatus={props.voteStatus}
          upvotes={props.upvotes}
          downvotes={props.downvotes}
        />
        <HStack
          spacing={0.5}
          _hover={{ bg: replyHover, rounded: 5 }}
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
      </HStack>
      <Collapse in={isOpen}>
        <ReplyForm parentId={id} />
      </Collapse>
      <Replies parentId={id} />
    </ListItem>
  );
};
