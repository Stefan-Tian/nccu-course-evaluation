import React, { Component } from 'react';
import axios from 'axios';
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

const VoteScore = styled.span`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: bold;
  align-self: flex-end;
  margin-bottom: -2px;
  margin-left: 1.2rem;
  color: #787878;
  min-width: 1.5rem;
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

class CommentSection extends Component {
  state = {
    comments: [],
    update: false
  };

  getData = async () => {
    const { classId } = this.props;
    const result = await axios.post('http://localhost:9999/getVoteData', {
      classId,
      commentNum: 0
    });
    const commentLen = result.data[3];
    if (commentLen === this.state.comments.length) {
      return;
    }
    let updatedComments = [];
    for (let i = 0; i < commentLen; i++) {
      const result = await axios.post('http://localhost:9999/getVoteData', {
        classId,
        commentNum: i
      });
      const text = result.data[1];
      const votes = result.data[2];
      const commentData = {
        commentId: i,
        text,
        votes
      };
      updatedComments.push(commentData);
    }

    this.setState({ comments: updatedComments });
  };

  async componentDidMount() {
    const { classId } = this.props;
    const result = await axios.post('http://localhost:9999/getVoteData', {
      classId,
      commentNum: 0
    });
    const commentLen = result.data[3];
    if (commentLen === this.state.comments.length) {
      return;
    }
    const updatedComments = [...this.state.comments];
    for (let i = 0; i < commentLen; i++) {
      const result = await axios.post('http://localhost:9999/getVoteData', {
        classId,
        commentNum: i
      });
      const text = result.data[1];
      const votes = result.data[2];
      const commentData = {
        commentId: i,
        text,
        votes
      };
      updatedComments.push(commentData);
    }

    this.setState({ comments: updatedComments });
  }

  render() {
    const {
      comment,
      onCommentChange,
      onUpvote,
      onDownvote,
      onSubmitComment
    } = this.props;
    const { comments } = this.state;
    return (
      <CommentContainer>
        <Flex>
          <NewComment value={comment} onChange={onCommentChange} />
          <Review
            onClick={() => {
              onSubmitComment();
              setTimeout(() => this.getData(), 5000);
            }}
          >
            留言
          </Review>
        </Flex>
        {comments.map(comment => (
          <Comment key={comment.text}>
            <Text sm>{comment.text}</Text>
            <VoteContainer>
              <Vote
                down
                onClick={async () => {
                  await onDownvote(comment.commentId);
                  setTimeout(() => this.getData(), 5000);
                }}
              >
                噓
              </Vote>
              <Vote
                up
                onClick={async () => {
                  await onUpvote(comment.commentId);
                  setTimeout(() => this.getData(), 5000);
                }}
              >
                讚
              </Vote>
              <VoteScore>{comment.votes}</VoteScore>
            </VoteContainer>
          </Comment>
        ))}
      </CommentContainer>
    );
  }
}

export default CommentSection;
