import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleModalClose } from "features/common/commonSlice";
import {
  selectEditedComment,
  editComment,
  fetchAsyncCreateComment,
} from "features/comment/commentSlice";
import { AppDispatch } from "../../app/store";

import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import styles from "./ReplyForm.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(3),
  },
}));

const ReplyForm = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const editedComment = useSelector(selectEditedComment);

  const isDisabled = editedComment.commentContent.length === 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    dispatch(editComment({ ...editedComment, commentContent: value }));
  };

  const createFormData = (): FormData => {
    const uploadData = new FormData();
    uploadData.append("subjectId", String(editedComment.subjectId));
    uploadData.append("uid", editedComment.uid);
    uploadData.append("parentCommentId", String(editedComment.parentCommentId));
    uploadData.append("commentContent", editedComment.commentContent);
    uploadData.append(
      "commentIsSettled",
      String(editedComment.commentIsSettled)
    );

    return uploadData;
  };

  return (
    <>
      <h2 className={styles.reply_form__h2}>返信</h2>
      <FormControl sx={{ m: 1, width: 560 }}>
        <TextField
          id="outlined-multiline-static"
          label="返信内容"
          multiline
          rows={10}
          defaultValue=""
          onChange={handleInputChange}
        />
      </FormControl>
      <Button
        variant="contained"
        color="default"
        onClick={() => {
          dispatch(handleModalClose());
        }}
      >
        キャンセル
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={isDisabled}
        onClick={() => {
          const data = createFormData();
          dispatch(fetchAsyncCreateComment(data));
          dispatch(handleModalClose());
        }}
      >
        投稿
      </Button>
    </>
  );
};

export default ReplyForm;
