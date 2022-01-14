import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchAsyncSignIn } from "./authSlice";

const useStyles = makeStyles((theme: any) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 4),
    color: "#ffffff",
  },
}));

export const Auth: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setCredential({ ...credential, [name]: value });
  };

  const login = async () => {
    await dispatch(fetchAsyncSignIn(credential));
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <h1>{/* <img src={Logo} alt="ロゴ" width="300px" /> */}</h1>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="メールアドレス"
              type="text"
              name="email"
              value={credential.email}
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="パスワード"
              type="password"
              name="password"
              value={credential.password}
              onChange={handleInputChange}
              autoComplete="current-password"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              size="large"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              ログイン
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Auth;
