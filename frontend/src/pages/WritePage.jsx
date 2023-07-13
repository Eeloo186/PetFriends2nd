import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonContainer from '../containers/write/WriteActionButtonContainer';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer></EditorContainer>
      <TagBoxContainer></TagBoxContainer>
      <WriteActionButtonContainer></WriteActionButtonContainer>
    </Responsive>
  );
};

export default WritePage;
