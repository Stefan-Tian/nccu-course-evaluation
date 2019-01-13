import React from 'react';
import styled, { css } from 'styled-components';
import Text from './Text';

const CommentContainer = styled.div`
  background-color: #fff;
  box-shadow: var(--shadow);
  border-radius: 4px;
  min-width: 32rem;
  max-width: 32rem;
  min-height: 62rem;
  max-height: 62rem;
  padding: 2rem;
  overflow: scroll;
`;

const Comment = styled.div`
  background-color: #eeeeee;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  max-width: 28rem;
  border-radius: 4px;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const NewComment = styled.textarea`
  resize: none;
  background-color: #eeeeee;
  padding: 0.5rem 1rem;
  border: none;
  margin-right: 1rem;
  border-radius: 4px;
  font-size: 1.6rem;
`;

const Vote = styled.button`
  font-size: 1.2rem;
  padding: 0.2rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 1rem;

  &:not(:last-of-type) {
    margin-right: 1rem;
  }

  ${({ up }) =>
    up &&
    css`
      background-color: var(--color-teal-light);
      color: white;
      border: 1.5px solid var(--color-teal-light);

      &:hover {
        color: var(--color-teal-light);
        background-color: transparent;
      }
    `}

  ${({ down }) =>
    down &&
    css`
      background-color: var(--color-alert);
      color: white;
      border: 1.5px solid var(--color-alert);

      &:hover {
        color: var(--color-alert);
        background-color: transparent;
      }
    `}
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const VoteContainer = styled(Flex)`
  justify-content: flex-end;
  margin-bottom: 0.5rem;
`;

const Review = styled.button`
  border: 1.5px solid var(--color-teal-light);
  border-radius: 4px;
  color: var(--color-teal-light);
  padding: 1.3rem 1rem;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: var(--color-teal);
    border-color: var(--color-teal);
  }
`;

const comments = [
  '期中考寫到手酸',
  '都不點名超讚',
  '心很累心很累心很累心很累心很累心很累心很累心很累心很累心很累心很累心很累心很累心很累心很累心很累心很累心很累心很累心很累',
  '微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分我討厭微積分'
];

const CommentSection = ({
  comment,
  onCommentChange,
  onUpvote,
  onDownvote,
  onSubmitComment
}) => (
  <CommentContainer>
    <Flex>
      <NewComment value={comment} onChange={onCommentChange} />
      <Review onClick={onSubmitComment}>留言</Review>
    </Flex>
    <Comment>
      <Text sm>期中考寫到手酸</Text>
      <VoteContainer>
        <Vote down onClick={onDownvote}>
          噓
        </Vote>
        <Vote up onClick={onUpvote}>
          讚
        </Vote>
      </VoteContainer>
    </Comment>
    {comments.map(comment => (
      <Comment>
        <Text sm>{comment}</Text>
        <VoteContainer>
          <Vote down>噓</Vote>
          <Vote up>讚</Vote>
        </VoteContainer>
      </Comment>
    ))}
  </CommentContainer>
);

export default CommentSection;
