import React, { useCallback, useEffect, useState } from 'react';
import Post from '../../components/post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPostAsync, initPost } from '../../modules/post';
import { useLocation } from 'react-router-dom';

const PostContainer = ({ postId }) => {
  // 필요 state 값
  const post = useSelector((state) => state.post.post);
  const loading = useSelector((state) => state.loading['post/GET_POST']);

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

  return <Post post={post} loading={loading}></Post>;
};

export default PostContainer;
