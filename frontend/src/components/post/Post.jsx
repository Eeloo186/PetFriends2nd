import React from 'react';
import { styled } from 'styled-components';
import Responsive from '../common/Responsive';
import { AiOutlineEye, AiOutlineComment, AiFillHeart } from 'react-icons/ai';

const PostBlock = styled(Responsive)`
margin-top: 20px;
border: 1px solid tomato;
display: block;
object-fit: cover;
.test img {
max-width: 100%;
}
`;
const TitleCss = styled.div`
display: flex;
align-items: center;
justify-content: space-between; 
`;
const SecondBox = styled.div`
display: flex;
align-items: center;
font-size: 17px; 
& :nth-child(1) {
  margin-top: 5px;
  font-size: 16px;
  padding: 0px 20px;
  
  }
  & :nth-child(2) {
  padding: 0 20px; 
  box-sizing: content-box; 
  }
`;
const ThirdBox = styled.div`
border: 1px solid rgb(186, 186, 186);
padding: 20px;
margin-top: 20px;
margin-right: 20px;
div {
overflow: hidden;
display: flex;
flex-wrap: wrap;
height: 200px;
}
`;
const Post = ({ post, likeCount, boardName }) => {
if( !post ){
  return null;
}
const date = new Date(post.post.createdAt);
const showDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`

return (
<PostBlock>
{post && (
<>
  {boardName === 'community' ? (
    <div>{`타이틀 : ${post.post.CommunityDetail.title}`}</div>
  ) : boardName === 'information' ? (
    <div>{`타이틀 : ${post.post.InfoDetail.title}`}</div>
  ) : boardName === 'notice' ? (
    <div>{`타이틀 : ${post.post.NoticeDetail.title}`}</div>
  ) : (
    '존재하지 않는 게시판'
  )}
<SecondBox>
<div>{post.post.User.userId}</div>
<div>{showDate}</div>
</SecondBox> 
<ThirdBox> 
<div className="test" dangerouslySetInnerHTML={{ __html: post.post.Content.content }} />
</ThirdBox>
<SecondBox>
<div><AiFillHeart style={{ color: 'rgb(255, 140, 0)' }}/> {likeCount}</div>
<div> <AiOutlineEye style={{ color: 'rgb(255, 140, 0)' }}/> {post.post.view}</div>
<div><AiOutlineComment style={{ color: 'rgb(255, 140, 0)' }}/> {post.commentCount}</div> 
</SecondBox> 
</>
)}
</PostBlock>
);
};

export default React.memo(Post);