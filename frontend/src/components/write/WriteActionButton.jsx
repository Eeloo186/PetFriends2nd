import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../common/AlertModal';
import Button from '../common/Button';

const WriteActionButtonBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  padding: 10px 30px;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButton = ({ boardType, title, content, post, postError, boardName, onSubmit, onUpdate, isEdit }) => {
  const navigate = useNavigate();

  const modalRef = useRef(null);
  const [visible, setVisible] = useState(false); // for model on-off
  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    confirmText: '확인',
    cancelText: '취소',
    onConfirm: null,
    onCancel: null,
  });
  const hasImgTag = content.includes('<img');

  // 글쓰기 버튼 클릭
  const onSubmitClick = () => {
    // 글쓰기 버튼 정상 동작
    if (boardType === 'post') {
      if (title.trim() && content.trim()) {
        if (isEdit) {
          setModalData({
            title: '게시글 수정',
            description: '입력하신 내용으로 게시글을 수정하시겠습니까?',
            confirmText: '수정',
            cancelText: '취소',
            onConfirm: onModalUpdateClick,
            onCancel: onModalCancelClick,
          });
        } else {
          setModalData({
            title: '게시글 작성',
            description: '입력하신 내용으로 게시글을 작성하시겠습니까?',
            confirmText: '글쓰기',
            cancelText: '취소',
            onConfirm: onModalSubmitClick,
            onCancel: onModalCancelClick,
          });
        }
      } else {
        // 경고 : title or content null
        setModalData({
          title: '필수 정보 입력',
          description: '제목 또는 본문을 마저 입력해주세요.',
          confirmText: '확인',
          cancelText: '',
          onConfirm: onModalCancelClick,
          onCancel: null,
        });
      }
    } else if (boardType === 'picture') {
      if (content.trim() && hasImgTag) {
        if (isEdit) {
          setModalData({
            title: '게시글 수정',
            description: '입력하신 내용으로 게시글을 수정하시겠습니까?',
            confirmText: '수정',
            cancelText: '취소',
            onConfirm: onModalUpdateClick,
            onCancel: onModalCancelClick,
          });
        } else {
          setModalData({
            title: '게시글 작성',
            description: '입력하신 내용으로 게시글을 작성하시겠습니까?',
            confirmText: '글쓰기',
            cancelText: '취소',
            onConfirm: onModalSubmitClick,
            onCancel: onModalCancelClick,
          });
        }
      } else if (!hasImgTag) {
        // 경고 : <img /> not inclueded
        setModalData({
          title: '이미지 누락',
          description: '사진 게시판에는 반드시 이미지를 등록하셔야합니다.',
          confirmText: '확인',
          cancelText: '',
          onConfirm: onModalCancelClick,
          onCancel: null,
        });
      }
    }
    setVisible(true);
  };

  // 취소 버튼 클릭
  const onCancelClick = () => {
    // 취소 버튼 정상 동작
    if (!(title.trim() || content.trim())) {
      navigate(-1, { replace: true });
    } else {
      // 경고 : title or content not null
      setModalData({
        title: '게시글 작성 취소',
        description: '작성중인 내용이 존재합니다. 정말 돌아가시겠습니까?',
        confirmText: '돌아가기',
        cancelText: '취소',
        onConfirm: onModalBackClick,
        onCancel: onModalCancelClick,
      });
      setVisible(true);
    }
  };

  // modal창의 글쓰기 버튼
  const onModalSubmitClick = () => {
    setVisible(false);
    onSubmit();
  };
  // modal창의 수정 버튼
  const onModalUpdateClick = () => {
    setVisible(false);
    onUpdate();
  };
  // modal창의 뒤로가기 버튼
  const onModalBackClick = () => {
    setVisible(false);
    navigate(-1, { replace: true });
  };
  // modal창의 취소 버튼
  const onModalCancelClick = () => {
    setVisible(false);
  };
  // modal창이 떴을 때 클릭 이벤트
  const onModalOutSideClick = (event) => {
    // target과 currentTarget이 같을 때 모달창 꺼짐(=모달창 외부 클릭)
    if (modalRef.current === event.target) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (post && postError === null) {
      // 글 작성 성공, 이전 페이지로
      if (boardName === 'picture') {
        console.log('boardName이 picture임');
        navigate(`/${boardName}`, { replace: true });
      } else {
        navigate(`/${boardName}/${post.id}`, { replace: true });
      }
    } else if (postError && post === null) {
      // 서버에서 에러 발생
      // TODO :  postError 메세지의 종류에 따라 다른 description
      setModalData({
        title: '에러',
        description: `글 작성 실패. 잠시 후 다시 시도해주세요.\n${postError}`,
        confirmText: '확인',
        cancelText: null,
        onConfirm: onModalCancelClick,
        onCancel: null,
      });
      setVisible(true);
    }
  }, [boardName, navigate, post, postError]);

  return (
    <>
      <WriteActionButtonBlock>
        <StyledButton onClick={onSubmitClick}>{isEdit ? '수정' : '글쓰기'}</StyledButton>
        <StyledButton onClick={onCancelClick}> 취소 </StyledButton>
      </WriteActionButtonBlock>
      <AlertModal
        modalRef={modalRef}
        visible={visible}
        modalData={modalData}
        onModalOutSideClick={onModalOutSideClick}
      ></AlertModal>
    </>
  );
};

export default WriteActionButton;
