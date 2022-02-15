import React, { useState, useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";

import { fetchAsyncGetUser } from "features/auth/authSlice";
import {
  selectModalState,
  selectFormState,
  fetchAsyncGetSubject,
  handleModalClose,
} from "features/common/commonSlice";
import {
  selectEditedComment,
  editComment,
} from "features/comment/commentSlice";

import DrawerHeader from "features/common/DrawerHeader";
import QuestionForm from "features/common/QuestionForm";
import ReplyForm from "features/common/ReplyForm";
import ImageUp from "features/common/ImageUp";

import { useTheme } from "@material-ui/core/styles";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    position: "absolute",
    width: 650,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Default: React.FC = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const modalState = useSelector(selectModalState);
  const formState = useSelector(selectFormState);
  const editedComment = useSelector(selectEditedComment);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  useEffect(() => {
    setModalOpen(modalState.modalOpen);
  }, [modalState]);

  const formComponent = () => {
    switch (formState.formNumber) {
      case 1:
        return <QuestionForm />;
      case 2:
        return <ReplyForm />;
      case 3:
        return <ImageUp />;
    }
  };

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetUser());
      await dispatch(fetchAsyncGetSubject());
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <div>
      <DrawerHeader>{children}</DrawerHeader>
      <Modal
        open={modalOpen}
        onClose={() => {
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
        <div style={modalStyle} className={classes.paper}>
          {formComponent()}
        </div>
      </Modal>
    </div>
  );
};

export default Default;
