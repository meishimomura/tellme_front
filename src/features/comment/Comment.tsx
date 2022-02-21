import React, { useState, useEffect } from "react";
import { AppDispatch } from "../../app/store";

import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import Default from "features/common/Default";
import {
  selectCommentDetails,
  selectTextpearComments,
  selectEditedComment,
  fetchAsyncGetComment,
  fetchAsyncUpdateComment,
  fetchAsyncCreateVote,
  fetchAsyncDeleteVote,
  fetchAsyncGetTextpearComments,
  editComment,
} from "./commentSlice";
import { selectLoginUser } from "features/auth/authSlice";
import { handleModalOpen } from "features/common/commonSlice";

import { Link } from "react-router-dom";
import styles from "./Comment.module.css";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import StarsIcon from "@mui/icons-material/Stars";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ButtonBase from "@mui/material/ButtonBase";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(1, 3),
    margin: theme.spacing(2),
    color: "#fff",
    fontWeight: "bold",
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(8),
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
}));

type CommentProps = RouteComponentProps<{
  commentId: string;
}>;

const Comment: React.FC<CommentProps> = (props) => {
  const commentId = props.match.params.commentId as unknown as number;
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const loginUser = useSelector(selectLoginUser);
  const commentDetails = useSelector(selectCommentDetails);
  const textpearComments = useSelector(selectTextpearComments);
  const editedComment = useSelector(selectEditedComment);

  const formatDatetime = (createdAt: string) => {
    return createdAt.replace(
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})\+(\d{2}):(\d{2})/g,
      "$1/$2/$3 $4:$5:$6"
    );
  };

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetComment(commentId));
      await dispatch(fetchAsyncGetTextpearComments(commentId));
    };
    fetchBootLoader();
  }, [dispatch, commentId]);

  return (
    <Default>
      <div className={styles.comment__wrap}>
        <Paper className={classes.paper}>
          <div className={styles.comment__head}>
            <div
              className={[
                styles.comment__answer,
                commentDetails.data[0].commentIsSettled
                  ? styles.comment__answered
                  : styles.comment__not_answered,
              ].join(" ")}
            >
              <p>
                {commentDetails.data[0].commentIsSettled ? "解決済" : "未解決"}
              </p>
            </div>
            <div className={styles.comment__subject}>
              <p>{commentDetails.data[0].subjectName}</p>
            </div>
            <p>{formatDatetime(commentDetails.data[0].createdAt)}</p>
          </div>
          <div className={styles.comment__content_box}>
            <IconButton
              color={commentDetails.data[0].voted ? "primary" : "default"}
              className={styles.comment__vote_button}
              aria-label="vote"
              onClick={() => {
                commentDetails.data[0].voted
                  ? dispatch(fetchAsyncDeleteVote(commentDetails.data[0].id))
                  : dispatch(
                      fetchAsyncCreateVote({
                        commentId: commentDetails.data[0].id,
                        uid: loginUser.data.uid,
                      })
                    );
              }}
            >
              <StarsIcon />
            </IconButton>
            <div
              className={[
                styles.comment__vote_box,
                commentDetails.data[0].voted && styles.comment__voted,
              ].join(" ")}
            >
              <p className={styles.comment__vote_number}>
                {commentDetails.data[0].voteCount}
              </p>
              <p>知りたい！</p>
            </div>
            <p>{commentDetails.data[0].commentContent}</p>
          </div>
          {commentDetails.data[0].commentImagePath?.url ? (
            <Card sx={{ maxWidth: 345 }}>
              <ButtonBase
                className={classes.cardAction}
                onClick={() => {
                  dispatch(
                    handleModalOpen({
                      formNumber: 3,
                      targetImageSrc:
                        commentDetails.data[0].commentImagePath.url,
                    })
                  );
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  src={commentDetails.data[0].commentImagePath.url}
                  alt="image"
                  className={styles.comment__image}
                />
              </ButtonBase>
            </Card>
          ) : null}
          {!loginUser.data.userIsStudent && (
            <Button
              className={classes.button}
              variant="contained"
              size="small"
              color="primary"
              startIcon={<ChatBubbleIcon />}
              onClick={() => {
                dispatch(
                  editComment({
                    ...editedComment,
                    subjectId: commentDetails.data[0].subjectId,
                    uid: loginUser.data.uid,
                    parentCommentId: commentDetails.data[0].id,
                  })
                );
                dispatch(
                  handleModalOpen({
                    formNumber: 2,
                    targetImageSrc: "",
                  })
                );
              }}
            >
              返信する
            </Button>
          )}
          {loginUser.data.userIsStudent &&
            commentDetails.data[0].uid === loginUser.data.uid && (
              <Button
                className={classes.button}
                variant="contained"
                size="small"
                color={
                  commentDetails.data[0].commentIsSettled
                    ? "default"
                    : "primary"
                }
                startIcon={<AutoAwesomeIcon />}
                onClick={() => {
                  dispatch(
                    fetchAsyncUpdateComment({
                      id: commentDetails.data[0].id,
                      subjectId: commentDetails.data[0].subjectId,
                      uid: commentDetails.data[0].uid,
                      parentCommentId: commentDetails.data[0].parentCommentId,
                      commentContent: commentDetails.data[0].commentContent,
                      commentIsSettled:
                        !commentDetails.data[0].commentIsSettled,
                    })
                  );
                }}
              >
                解決した
              </Button>
            )}
        </Paper>
        <h2 className={styles.comment__h2}>回答</h2>
        {commentDetails.data.length <= 1 ? (
          <p>回答はまだありません</p>
        ) : (
          <>
            {commentDetails.data.map((comment, index) =>
              index === 0 ? null : (
                <Paper className={classes.paper}>
                  {!comment.userIsStudent && (
                    <div className={styles.comment__head}>
                      <p>{comment.userName}先生</p>
                    </div>
                  )}
                  <div className={styles.comment__content_box}>
                    <p>{comment.commentContent}</p>
                  </div>
                </Paper>
              )
            )}
          </>
        )}
        {textpearComments.data.length > 0 ? (
          <>
            <h2 className={styles.comment__h2}>似ている投稿</h2>
            {textpearComments.data.map((textpearComment) => (
              <Paper className={classes.paper}>
                <Link
                  to={"/comment/" + textpearComment.id}
                  className={styles.comment__nav}
                >
                  <div className={styles.comment__head}>
                    <div
                      className={[
                        styles.comment__answer,
                        textpearComment.commentIsSettled
                          ? styles.comment__answered
                          : styles.comment__not_answered,
                      ].join(" ")}
                    >
                      <p>
                        {textpearComment.commentIsSettled ? "解決済" : "未解決"}
                      </p>
                    </div>
                    <div className={styles.comment__subject}>
                      <p>{textpearComment.subjectName}</p>
                    </div>
                    <p>{formatDatetime(textpearComment.createdAt)}</p>
                  </div>
                  <div className={styles.comment__content_box}>
                    <IconButton
                      color={textpearComment.voted ? "primary" : "default"}
                      className={styles.comment__vote_button}
                      aria-label="vote"
                      onClick={() => {
                        textpearComment.voted
                          ? dispatch(fetchAsyncDeleteVote(textpearComment.id))
                          : dispatch(
                              fetchAsyncCreateVote({
                                commentId: textpearComment.id,
                                uid: loginUser.data.uid,
                              })
                            );
                      }}
                    >
                      <StarsIcon />
                    </IconButton>
                    <div
                      className={[
                        styles.comment__vote_box,
                        textpearComment.voted && styles.comment__voted,
                      ].join(" ")}
                    >
                      <p className={styles.comment__vote_number}>
                        {textpearComment.voteCount}
                      </p>
                      <p>知りたい！</p>
                    </div>
                    <p>{textpearComment.commentContent}</p>
                  </div>
                  {textpearComment.commentImagePath?.url ? (
                    <Card sx={{ maxWidth: 345 }}>
                      <ButtonBase
                        className={classes.cardAction}
                        onClick={() => {
                          dispatch(
                            handleModalOpen({
                              formNumber: 3,
                              targetImageSrc:
                                textpearComment.commentImagePath.url,
                            })
                          );
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="250"
                          src={textpearComment.commentImagePath.url}
                          alt="image"
                          className={styles.comment__image}
                        />
                      </ButtonBase>
                    </Card>
                  ) : null}
                </Link>
              </Paper>
            ))}
          </>
        ) : null}
      </div>
    </Default>
  );
};

export default Comment;
