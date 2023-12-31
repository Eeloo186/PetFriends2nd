import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentList from '../../components/comment/CommentList';
import { addCommentLike, deleteComment, deleteCommentLike, getComments, unloadComment } from '../../modules/comment';
import { getLikes } from '../../modules/like';

const CommentListContainer = () => {
  console.log('CommentListContainer 렌더링');
  const postId = useSelector((state) => state.post.post?.post.id);
  const postUser = useSelector((state) => state.post.post?.post.User.id);
  const comments = useSelector((state) => state.comment.comments);
  const user = useSelector((state) => state.user?.user);
  const likes = useSelector((state) => state.like.likes);
  const theme = useSelector((state) => state.theme.theme);

  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const latestComment = useRef(null);

  const dispatch = useDispatch();

  // load comment list
  useEffect(() => {
    if (postId) {
      dispatch(getComments({ postId }));
    }
    return () => {
      dispatch(unloadComment());
    };
  }, [dispatch, postId]);

  // load like list
  useEffect(() => {
    if (user && postId) {
      console.log('getLikes 요청 보냄', user, postId);
      dispatch(getLikes({ userId: user?.id, postId }));
    }
  }, [comments]);

  // delete button clicked
  const handleDeleteClick = (isReply, currentId, parentId) => {
    if (!isReply) {
      console.log(`댓글 ${currentId}의 삭제 버튼 클릭됨`);
      console.log('test/comment', postId, currentId, parentId);
      dispatch(deleteComment({ postId, currentId }));
    } else if (isReply) {
      console.log('test/reply', postId, currentId, parentId);
      console.log(`대댓글 ${currentId}의 삭제 버튼 클릭됨`);
      dispatch(deleteComment({ postId, currentId, parentId }));
    }
  };
  // reply button clicked
  const handleReplyClick = (isReply, commentId) => {
    if (!isReply) {
      console.log(`댓글 ${commentId}의 대댓글 버튼 클릭됨`);
    } else if (isReply) {
      console.log(`대댓글 ${commentId}의 대댓글 버튼 클릭됨`);
    }
    setSelectedCommentId((prevCommentId) => (prevCommentId === commentId ? null : commentId));
  };
  // like button clicked
  const handleLikeClick = (commentId, isReply, userId) => {
    console.log(`추천 버튼 클릭됨`);
    const type = isReply ? 'reply' : 'comment';
    dispatch(addCommentLike({ commentId, type, userId, postId }));
  };
  // unlike button clicked
  const handleUnlikeClick = (userId, likableType, likableId) => {
    console.log('추천 해제 버튼 클릭됨', userId, likableType, likableId);
    dispatch(deleteCommentLike({ userId, likableType, likableId, postId }));
  };

  // isLiked
  const isLiked = (isReply, commentId, userId) => {
    if (!isReply) {
      return !!likes?.find(
        (like) => like['UserId'] === userId && like['likable_type'] === 'comment' && like['likable_id'] === commentId,
      );
    } else {
      return !!likes?.find(
        (like) => like['UserId'] === userId && like['likable_type'] === 'reply' && like['likable_id'] === commentId,
      );
    }
  };

  return (
    <CommentList
      comments={comments}
      loggedInUser={user}
      user={user}
      postUser={postUser}
      selectedCommentId={selectedCommentId}
      handleDeleteClick={handleDeleteClick}
      handleReplyClick={handleReplyClick}
      handleLikeClick={handleLikeClick}
      handleUnlikeClick={handleUnlikeClick}
      setSelectedCommentId={setSelectedCommentId}
      latestComment={latestComment}
      isLiked={isLiked}
      theme={theme}
    ></CommentList>
  );
};

export default CommentListContainer;
