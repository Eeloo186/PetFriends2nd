import React from 'react';
import styled from 'styled-components';

const CommentListBlock = styled.div`
  border: 1px solid greenyellow;
`;
const Wrapper = styled.div`
border: 1px solid rgb(186, 186, 186);
width: 95%;
padding: 10px;
margin: 15px;
`;
const FirstBox = styled.div`
display: flex;
width: 100%; 
align-items: center;
justify-content: left;
padding-bottom: 5px;
font-weight: bold;
& div:first-child {
  font-size: 25px;
  padding: 10px;
}

& div:nth-child(2) {
width: 600px;
padding: 10px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
`;
const SecondBox = styled.div`
display: flex;
align-items: center;
justify-content: space-between;

& :nth-child(2) {
font-size: 20px;
}
`;

const Comment = ({ comment }) => {
  const date = new Date(comment.createdAt);
  const showDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`

  return (
    <Wrapper>
    <FirstBox>
      <div>{comment.id}</div>
      <div>{showDate}</div>      
    </FirstBox>
    <SecondBox><div>{comment.content}</div></SecondBox>
    </Wrapper>
  );
};

const CommentList = ({ comments }) => {
  return (
    <CommentListBlock>
      {comments && comments.map((comment) => <Comment key={comment.id} comment={comment}></Comment>)}
    </CommentListBlock>
  );
};

export default CommentList;
