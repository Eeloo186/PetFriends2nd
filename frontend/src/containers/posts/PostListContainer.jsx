import React, { useEffect, useRef } from 'react';
import PostList from '../../components/posts/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAsync } from '../../modules/posts';
import { useLocation } from 'react-router-dom';
import { selectPageNumber, selectSearchOptions, selectSortType, selectTag } from '../../modules/searchOption';

const PostListContainer = () => { 
  const location = useLocation();
  const searchCategory = useSelector((state) => state.searchOption.searchCategory);
  const searchKeyword = useSelector((state) => state.searchOption.searchKeyword);
  const sortType = useSelector((state) => state.searchOption.sortType);
  const currPageNum = useSelector((state) => state.searchOption.pageNumber);
  const tag = useSelector((state) => state.searchOption.tag);
  const boardName = location.pathname.split('/')[1];

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.loading['posts/GET_POSTS']);

  const limit = useRef(10);
  const dispatch = useDispatch();
  console.log('posts===>',posts);
  // post list 렌더링, 리렌더링
  useEffect(() => {
    if (searchCategory === null && searchKeyword === null && sortType === null && currPageNum === null) {
      dispatch(selectSortType('newest'));
      dispatch(selectPageNumber(1));
      dispatch(selectSearchOptions({ searchCategory: 'titleDetail', searchKeyword: '' }));
      dispatch(
        getPostsAsync({
          searchCategory: 'titleDetail',
          searchKeyword: '',
          sortType: 'newest',
          currPageNum: 1,
          tag,
          boardName,
          limit: limit.current,
        }),
      );
    } else {
      console.log('SearchOptionMenuContainer 리렌더링. 초기화 시작.');
      dispatch(
        getPostsAsync({
          searchCategory,
          searchKeyword,
          sortType,
          currPageNum,
          tag,
          boardName,
          limit: limit.current,
        }),
      );
    }

    // post list 사라질 때 searchCategory, searchKeyword, sortType, pageNumber 초기화
    // return () => {
    //   dispatch(selectSearchOptions({ searchCategory: null, searchKeyword: null }));
    //   dispatch(selectSortType(null));
    //   dispatch(selectPageNumber(null));
    //   dispatch(selectTag(null));
    // };
  }, [boardName, dispatch]);

  return <PostList posts={posts} boardName={boardName} loading={loading}></PostList>;
};

export default PostListContainer;
