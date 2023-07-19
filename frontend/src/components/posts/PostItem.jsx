import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineComment, AiFillHeart } from 'react-icons/ai';

// const PostItemBlock = styled.div`
// display: flex;
// border: 1px solid green;
// width: 100%;
// height: 100px;
// margin: 0;
// cursor: pointer;
// `;

const Wrapper = styled.div`
width: 100%;
margin: 15px;
`;
const FirstBox = styled.div`
display: flex;
width: 100%; 
align-items: center;
justify-content: left;
padding-bottom: 20px;
font-weight: bold;
color: ${({ theme }) => (theme === 'true' ? 'white' : 'rgb(50,50,50)')};
& div:first-child {
font-size: 30px;
padding: 10px;
}

& div:nth-child(2) {
font-size: 25px;
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

const ThirdBox = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
& :first-child {
font-size: 22px;
padding: 0 20px;
margin: 10px;
color: rgb(179, 132, 255);
}
& :nth-child(2) {
font-size: 16px;
padding: 0px 20px;
border-left: 1px solid rgb(192, 192, 192); 
}
& :nth-child(3) {
padding: 0 20px; 
box-sizing: content-box; 
}
& :nth-child(4) {
padding: 0 20px; 
box-sizing: content-box; 
} 
`;

const PostItem = ({ post, loading }) => {   
const date = new Date(post.createdAt); 
const showDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
const theme = useSelector((state) => state.theme.theme);
return (
<>
<Wrapper>
<Link to={`/community/${post.id}`}>
<FirstBox theme={String(theme)}> 
<div>{post.id}.</div>
<div>{post.CommunityInfo.title}</div>
</FirstBox>
</Link>
<SecondBox>
<ThirdBox>
<div>{post.User.nickname}</div>
<div>{showDate}</div> 
<AiOutlineEye style={{ color: 'rgb(255, 140, 0)' }}/> {post.view} 
<AiOutlineComment style={{ color: 'rgb(255, 140, 0)' }}/> {post.comment} 
</ThirdBox>
<AiFillHeart style={{ color: 'rgb(255, 140, 0)' }}/>
</SecondBox>
</Wrapper>
</>
);
};

export default PostItem;