import React from "react";

import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    display: "none",
  },
}));

interface Props {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadButton: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <label htmlFor={`upload-button-${props.name}`}>
      <input
        accept="image/*"
        className={classes.input}
        id={`upload-button-${props.name}`}
        name={props.name}
        multiple
        type="file"
        onChange={props.onChange}
      />
      <Button variant="contained" component="span" {...props}>
        {props.children}
      </Button>
    </label>
  );
};

export default UploadButton;
