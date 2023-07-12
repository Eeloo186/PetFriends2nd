import React, { useEffect, useRef } from 'react';
import PostList from '../../components/posts/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAsync } from '../../modules/posts';
import { useLocation } from 'react-router-dom';
import { selectSortType } from '../../modules/sort';
import { changePageNumber } from '../../modules/pagination';
import { changeSearchOptions } from '../../modules/search';

const PostListContainer = () => {
  const location = useLocation();

  const searchCategory = useSelector((state) => state.search.searchCategory);
  const searchKeyword = useSelector((state) => state.search.searchKeyword);
  const sortType = useSelector((state) => state.sort.sortType);
  const currPageNum = useSelector((state) => state.pagination.pageNumber);
  const boardName = location.pathname.split('/')[1];

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.loading['posts/GET_POSTS']);

  const limit = useRef(10);
  const dispatch = useDispatch();

  // post list 렌더링, 리렌더링
  useEffect(() => {
    if (searchCategory === null && searchKeyword === null && sortType === null && currPageNum === null) {
      console.log('SearchOptionMenuContainer 첫 렌더링. 초기화 시작.');
      dispatch(selectSortType('newest'));
      dispatch(changePageNumber(1));
      dispatch(changeSearchOptions({ searchCategory: 'titleDetail', searchKeyword: '' }));
      dispatch(
        getPostsAsync({
          searchCategory: 'titleDetail',
          searchKeyword: '',
          sortType: 'newest',
          currPageNum: 1,
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
          boardName,
          limit: limit.current,
        }),
      );
    }

    // post list 사라질 때 searchCategory, searchKeyword, sortType, pageNumber 초기화
    // return () => {
    //   dispatch(changeSearchOptions({ searchCategory: null, searchKeyword: null }));
    //   dispatch(selectSortType(null));
    //   dispatch(changePageNumber(null));
    // };
  }, [boardName, dispatch]);

  return <PostList posts={posts} boardName={boardName} loading={loading}></PostList>;
};

export default PostListContainer;
