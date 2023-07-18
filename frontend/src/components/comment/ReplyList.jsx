import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

const ReplyListBlock = styled.div`
  border: 1px solid pink;
`;

const ReplyBlock = styled.div`
  padding-left: 10%;
  border: 1px solid purple;
  margin: 0.5rem;
`;

const ReplyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const ReplyContent = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const ReplyNickname = styled.span`
  font-weight: bold;
  margin-right: 1rem;
`;

const ReplyCreatedAt = styled.span`
  margin-right: 1rem;
`;

const ReplyDeleteButton = styled.button`
  background-color: transparent;
  /* border: none; */
  cursor: pointer;
`;

const Reply = ({ reply, user, handleDeleteClick }) => {
  return (
    <ReplyBlock>
      {/* comment description + delete button */}
      <ReplyHeader>
        <div>
          <ReplyNickname>{reply.User?.nickname}</ReplyNickname>
          <ReplyCreatedAt>{reply.createdAt}</ReplyCreatedAt>
        </div>
        {user && reply.UserId === user.id && (
          <ReplyDeleteButton onClick={() => handleDeleteClick(reply.id)}>
            <AiOutlineClose />
          </ReplyDeleteButton>
        )}
      </ReplyHeader>
      {/* comment content + reply button */}
      <ReplyContent>
        <span>{reply.content}</span>
      </ReplyContent>
    </ReplyBlock>
  );
};

const ReplyList = ({ replies, user, handleDeleteClick }) => {
  return (
    <ReplyListBlock>
      {replies &&
        replies.map((reply) => (
          <Reply key={reply.id} reply={reply} user={user} handleDeleteClick={handleDeleteClick}></Reply>
        ))}
    </ReplyListBlock>
  );
};

export default ReplyList;
