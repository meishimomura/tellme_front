import React, { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchAsyncGetComments,
  selectComments,
} from "features/comment/commentSlice";
import {
  fetchAsyncGetNotifications,
  selectNotifications,
} from "features/notification/notificationSlice";
import {
  fetchAsyncGetNotifySelves,
  fetchAsyncUpdateNotifySelf,
  selectNotifySelves,
} from "features/notifySelf/notifySelfSlice";

import { Link } from "react-router-dom";
import styles from "./StudentHome.module.css";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(1, 3),
    margin: theme.spacing(3, 0),
    backgroundColor: "#3daafb",
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    padding: theme.spacing(0, 1, 0, 0),
  },
  new: {
    marginTop: theme.spacing(2),
  },
  paper: {
    minHeight: 250,
  },
}));

const StudentHome: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const notifySelves = useSelector(selectNotifySelves);
  const notifications = useSelector(selectNotifications);
  const comments = useSelector(selectComments);

  const n = 5;
  const displasyNotifySelves = notifySelves.data.slice(0, n);
  const displayNotifications = notifications.data.slice(0, n);
  const displayComments = comments.data.slice(0, n);

  const formatDatetime = (createdAt: string) => {
    return createdAt.replace(
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})\+(\d{2}):(\d{2})/g,
      "$1/$2/$3 $4:$5:$6"
    );
  };

  const maxLen = 200;
  const omit = (text: string) => {
    if (text.length > maxLen) {
      return text.substr(0, maxLen) + "...";
    } else {
      return text;
    }
  };

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetComments());
      await dispatch(fetchAsyncGetNotifications());
      await dispatch(fetchAsyncGetNotifySelves());
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <h2 className={styles.student_home__h2}>通知</h2>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableBody>
                  {displasyNotifySelves.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      hover
                      onClick={() => {
                        dispatch(
                          fetchAsyncUpdateNotifySelf({
                            id: row.id,
                            notifyType: 1,
                            notifyIsChecked: true,
                            toUid: row.toUid,
                            fromUid: row.fromUid,
                            commentId: row.commentId,
                            parentCommentId: row.parentCommentId,
                            createdAt: row.createdAt,
                            updatedAt: row.updatedAt,
                            fromUserName: row.fromUserName,
                          })
                        );
                      }}
                    >
                      <Link
                        to={"/comment/" + row.parentCommentId}
                        className={styles.student_home__nav}
                      >
                        <TableCell
                          className={styles.student_home__not_checkcell}
                        >
                          <div
                            className={
                              row.notifyIsChecked
                                ? styles.student_home__checked
                                : styles.student_home__not_check
                            }
                          ></div>
                        </TableCell>
                        <TableCell>
                          <span>{formatDatetime(row.createdAt)}</span>
                        </TableCell>
                        <TableCell>
                          あなたの投稿に{row.fromUserName}先生が回答しました。
                        </TableCell>
                      </Link>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => {}}
          >
            <MailOutlineIcon className={classes.icon} />
            通知一覧
          </Button>
        </Grid>
        <Grid item xs={12} lg={6}>
          <h2 className={styles.student_home__h2}>学校からのお知らせ</h2>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableBody>
                  {displayNotifications.map((row, rowIndex) => (
                    <TableRow key={rowIndex} hover>
                      <Link
                        to={"/comment/" + row.id}
                        className={styles.student_home__nav}
                      >
                        <TableCell
                          className={styles.student_home__not_checkcell}
                        >
                          <div
                            className={
                              row.studentUid !== null
                                ? styles.student_home__checked
                                : styles.student_home__not_check
                            }
                          ></div>
                        </TableCell>
                        <TableCell>{formatDatetime(row.createdAt)}</TableCell>
                        <TableCell>{row.userName}先生</TableCell>
                        <TableCell>{row.notificationTitle}</TableCell>
                      </Link>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => {}}
          >
            <NotificationsNoneIcon className={classes.icon} />
            お知らせ一覧
          </Button>
        </Grid>
      </Grid>
      <Grid container className={styles.student_home__new}>
        <Grid item xs={12}>
          <h2 className={styles.student_home__h2}>新着の投稿</h2>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableBody>
                  {displayComments.map((row, rowIndex) => (
                    <TableRow key={rowIndex} hover>
                      <Link
                        to={"/comment/" + row.id}
                        className={styles.student_home__nav}
                      >
                        <TableCell>
                          <div
                            className={[
                              styles.student_home__answer,
                              row.commentIsSettled
                                ? styles.student_home__answered
                                : styles.student_home__not_answered,
                            ].join(" ")}
                          >
                            <span>
                              {row.commentIsSettled ? "解決済" : "未解決"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={styles.student_home__subject}>
                            <span>{row.subjectName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatDatetime(row.createdAt)}</TableCell>
                        <TableCell>{omit(row.commentContent)}</TableCell>
                      </Link>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => {}}
          >
            <CreateIcon className={classes.icon} />
            投稿一覧
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentHome;
