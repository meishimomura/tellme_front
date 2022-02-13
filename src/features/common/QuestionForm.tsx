import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncCreateComment,
  selectEditedComment,
  editComment,
} from "features/comment/commentSlice";
import { selectLoginUser } from "features/auth/authSlice";
import { selectSubjects, handleModalClose } from "features/common/commonSlice";
import { AppDispatch } from "../../app/store";

import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import styles from "./QuestionForm.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(3),
  },
}));

const QuestionForm = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const subjects = useSelector(selectSubjects);
  const editedComment = useSelector(selectEditedComment);
  const loginUser = useSelector(selectLoginUser);

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(
        editComment({ ...editedComment, uid: loginUser.data.uid })
      );
    };
    fetchBootLoader();
  }, [dispatch]);

  const isDisabled =
    editedComment.subjectId === 0 || editedComment.commentContent.length === 0;

  const handleSelectSubjectChange = (e: SelectChangeEvent<number>) => {
    const value = e.target.value as unknown as number;
    dispatch(editComment({ ...editedComment, subjectId: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    dispatch(editComment({ ...editedComment, commentContent: value }));
  };

  let subjectsOptions = subjects.data.map((subject) => (
    <MenuItem key={subject.id} value={subject.id}>
      {subject.subjectName}
    </MenuItem>
  ));

  return (
    <>
      <h2 className={styles.question_form__h2}>質問投稿</h2>
      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="demo-multiple-name-label">科目</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={editedComment.subjectId}
          onChange={handleSelectSubjectChange}
          input={<OutlinedInput label="Name" />}
        >
          {subjectsOptions}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 560 }}>
        <TextField
          id="outlined-multiline-static"
          label="質問内容"
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
          dispatch(fetchAsyncCreateComment(editedComment));
          dispatch(handleModalClose());
        }}
      >
        投稿
      </Button>
    </>
  );
};

export default QuestionForm;
