import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import PostItem from './PostItem';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
  border: 1px solid red;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const PostList = ({ posts, boardName, loading }) => {  
  return (
    <>
      {/* 로딩중... 부분 추후 loading spiiner 이미지로 대체 */}
      {loading && <PostListBlock>{'로딩중.......'}</PostListBlock>}
      {!loading && (
        <PostListBlock>
          {posts && posts.map((post) => <PostItem key={post.id} post={post} boardName={boardName}></PostItem>)}
        </PostListBlock>
      )}
    </>
  );
};

export default PostList;
