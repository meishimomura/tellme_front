import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncCreateComment,
  selectEditedComment,
  editComment,
} from "features/comment/commentSlice";
import { selectLoginUser } from "features/auth/authSlice";
import { selectSubjects, handleModalClose } from "features/common/commonSlice";
import { AppDispatch } from "../../app/store";
import { UploadButton } from "features/common/UploadButton";

import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import styles from "./QuestionForm.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(3),
  },
  box: {
    margin: "1rem 0",
    width: 220,
  },
  preview: {
    width: "100%",
  },
  paper: {
    position: "absolute",
    width: 650,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const borderStyles = {
  bgcolor: "background.paper",
  border: 1,
};

const QuestionForm = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const subjects = useSelector(selectSubjects);
  const editedComment = useSelector(selectEditedComment);
  const loginUser = useSelector(selectLoginUser);

  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>("");

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setImage(file);
      dispatch(
        editComment({
          ...editedComment,
          commentImagePath: {
            ...editedComment.commentImagePath,
            url: file.name,
          },
        })
      );
    }
  };

  const previewImage = useCallback((e) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);

  const changeUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadImage(e);
    previewImage(e);
    e.target.value = "";
  };

  const createFormData = (): FormData => {
    const uploadData = new FormData();
    uploadData.append("subjectId", String(editedComment.subjectId));
    uploadData.append("uid", editedComment.uid);
    uploadData.append("commentContent", editedComment.commentContent);
    uploadData.append(
      "commentIsSettled",
      String(editedComment.commentIsSettled)
    );
    editedComment.commentImagePath.url &&
      uploadData.append("commentImagePath", image as Blob);

    return uploadData;
  };

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
    <div>
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
      <FormControl sx={{ m: 1, width: 500 }}>
        <UploadButton name="image" onChange={changeUploadFile}>
          画像アップロード
        </UploadButton>
      </FormControl>
      {preview ? (
        <Box
          sx={{ ...borderStyles, borderRadius: 1, borderColor: "grey.400" }}
          className={classes.box}
        >
          <IconButton color="inherit" onClick={() => setPreview("")}>
            <CancelIcon />
          </IconButton>
          <img src={preview} alt="preview img" className={classes.preview} />
        </Box>
      ) : null}
      <Button
        variant="contained"
        color="default"
        onClick={() => {
          dispatch(handleModalClose());
          dispatch(
            editComment({
              ...editedComment,
              subjectId: 0,
              uid: "",
              parentCommentId: null,
              commentContent: "",
              commentIsSettled: false,
              commentImagePath: { url: null },
            })
          );
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
    </div>
  );
};

export default QuestionForm;
