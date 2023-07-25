import React, { useCallback, useEffect } from 'react';
import Post from '../../components/post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPostAsync, initPost } from '../../modules/post';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const PostContainer = ({ postId }) => {
  // 필요 state 값
  const post = useSelector((state) => state.post.post);  
  const likes = useSelector((state) => state.like?.likes);

  const [likeCount, setLikeCount] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const boardName = location.pathname.split('/')[1];
  const getPost = useCallback((postId, boardName) => dispatch(getPostAsync({ postId, boardName })), [dispatch]);

  // useEffect에 넣어야 하는 값
  useEffect(() => {
    console.log('게시글 정보를 불러옵니다');
    getPost(postId, boardName);
    // 게시글 상세정보 페이지 언마운트되면 post 정보도 초기화
    return () => dispatch(initPost());
  }, [postId, getPost, dispatch, boardName]);
  useEffect(() => {
    console.log('likes 정보 갱신됨');
    setLikeCount(likes?.filter((like) => like.likable_id.toString() === postId && like.likable_type === 'post').length);
  }, [likes]);

  return <Post post={post} boardName={boardName} likeCount={likeCount} ></Post>;
};

export default PostContainer;
