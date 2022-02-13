import React, { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncGetComments,
  selectComments,
} from "features/comment/commentSlice";

import { makeStyles, Theme } from "@material-ui/core/styles";
import styles from "./TeacherHome.module.css";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

const useStyles = makeStyles((theme: Theme) => ({}));

const TeacherHome: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const comments = useSelector(selectComments);

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetComments());
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <div>
      <h2 className={styles.teacher_home__h2}>未回答の質問</h2>
      <Paper>
        <TableContainer>
          <Table>
            <TableBody>
              {comments.data.map((comment, i) => (
                <TableRow key={i} hover>
                  <Link
                    to={"/comment/" + comment.id}
                    className={styles.teacher_home__nav}
                  >
                    <TableCell>{comment.voteCount}知りたい！</TableCell>
                    <TableCell>
                      {comment.commentIsSettled ? "解決済み" : "未解決"}
                    </TableCell>
                    <TableCell>{comment.createdAt}</TableCell>
                    <TableCell>{comment.subjectName}</TableCell>
                    <TableCell>{comment.commentContent}</TableCell>
                  </Link>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TeacherHome;
