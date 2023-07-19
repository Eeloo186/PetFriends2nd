import React, { useCallback, useEffect, useRef } from 'react';
import PictureList from '../../components/posts/PictureList';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAsync } from '../../modules/posts';

const PictureListContainer = () => {
  // limit 초기값, 추가 로드 갯수 유동적으로 불러오게 조절
  const limit = useRef(15);
  let column = useRef(6);

  // backend에 요청시 필요 정보
  // 1. sortType : state에서 꺼냄.
  // 2. boardId or boardName : 특정 컴포넌트 내부이므로 수동으로 지정.
  // 3. limit : 화면의 사이즈와 사진div 크기에 따라서 유동적으로 결정.
  const posts = useSelector((state) => state.posts.posts);
  const sortType = useSelector((state) => state.searchOption.sortType);
  const searchCategory = useSelector((state) => state.searchOption.searchCategory);
  const searchKeyword = useSelector((state) => state.searchOption.searchKeyword);
  const loading = useSelector((state) => state.loading['posts/GET_POSTS']);
  const dispatch = useDispatch();
  const getPosts = useCallback(
    ({ sortType, boardName, limit, searchCategory, searchKeyword }) =>
      dispatch(getPostsAsync({ sortType, boardName, limit, searchCategory, searchKeyword })),
    [dispatch],
  );

  // useEffect
  // fetch pictureList on mount
  useEffect(() => {
    console.log('사진 리스트 불러옵니다');
    getPosts({ sortType, boardName: 'picture', limit: limit.current, searchCategory, searchKeyword });
  }, [getPosts, searchCategory, searchKeyword, sortType]);

  // fetch additional pictureList on scroll to bottom
  useEffect(() => {
    const handleScroll = () => {
      // 한번에 불러올 Item 수 결정
      // 반응형 디자인에 따라 PictureListBlock이 3가지 경우로 나뉨
      // 150은 ItemWidth, 30은 ItemMargin
      // 16은 PictureListBlock Padding
      if (window.innerWidth > 1024) {
        column.current = Math.floor(1024 / 180);
      } else if (window.innerWidth < 768) {
        column.current = Math.floor((window.innerWidth - 16) / 180);
      } else {
        column.current = Math.floor(768 / 180);
      }
      // 스크롤바 바닥에 닿았는지 감지
      const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
      if (clientHeight + scrollTop + 1 >= scrollHeight) {
        // 필요한 만큼의 데이터만 추가로 요청함
        if (posts?.length + column.current > limit.current) {
          limit.current += column.current;
        }
        console.log(`사진 ${column.current}개를 추가로 불러옵니다`);
        getPosts({ sortType: sortType, boardName: 'picture', limit: limit.current });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [getPosts, posts, sortType]);

  return <PictureList posts={posts} loading={loading}></PictureList>;
};

export default React.memo(PictureListContainer);
