import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SortOptionMenuContainer from '../containers/common/SortOptionMenuContainer';
import PictureListContainer from '../containers/posts/PictureListContainer';
// import SearchOptionMenuContainer from '../containers/common/SearchOptionMenuContainer';
import PictureButtonContainer from '../containers/posts/PictureButtonContainer';

const PicturePage = () => {
  return (
    <>
      <HeaderContainer />
      {/* <SearchOptionMenuContainer></SearchOptionMenuContainer> */}
      <SortOptionMenuContainer></SortOptionMenuContainer>
      <PictureButtonContainer></PictureButtonContainer>
      <PictureListContainer></PictureListContainer>
    </>
  );
};

export default PicturePage;
