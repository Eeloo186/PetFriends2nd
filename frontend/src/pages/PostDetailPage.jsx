import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Responsive from '../components/common/Responsive';
import ActionButtonContainer from '../containers/post/ActionButtonContainer';
import TagContainer from '../containers/common/TagContainer';
import PictureContainer from '../containers/post/PictureContainer';
import PostContainer from '../containers/post/PostContainer';
import CommentListContainer from '../containers/comment/CommentListContainer';
import CommentInputContainer from '../containers/comment/CommentInputContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
const PostDetailPage = () => {
  const location = useLocation();
  const params = useParams();
  const postId = params.postId;
  const boardName = location.pathname.split('/')[1];
  // 사진글 상세 정보 페이지, 나머지 게시글 상세 정보 페이지 구분
  return (
    <>
    <HeaderContainer />
    <Responsive>      
      {boardName === 'picture' ? <PictureContainer postId={postId} /> : <PostContainer postId={postId} />}
      <TagContainer />
      <ActionButtonContainer />
      <CommentInputContainer></CommentInputContainer>
      <CommentListContainer></CommentListContainer>
    </Responsive>
    </>
  );
};

export default PostDetailPage;
