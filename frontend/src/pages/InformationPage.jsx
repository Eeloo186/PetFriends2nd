import React from 'react';
import SearchOptionMenuContainer from '../containers/common/SearchOptionMenuContainer';
import SortOptionMenuContainer from '../containers/common/SortOptionMenuContainer';
import PostButtonContainer from '../containers/posts/PostButtonContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/common/PaginationContainer';
import ApiContainer from '../containers/api/ApiContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
const InformationPage = () => {
  return (
    <>
       <HeaderContainer />
      <SearchOptionMenuContainer></SearchOptionMenuContainer>
      <SortOptionMenuContainer></SortOptionMenuContainer>
      <PaginationContainer />
      <ApiContainer />
      <PostButtonContainer></PostButtonContainer>
      <PostListContainer></PostListContainer>
    </>
  );
};

export default InformationPage;
