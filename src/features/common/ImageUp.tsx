import React from "react";
import { AppDispatch } from "app/store";
import { useSelector, useDispatch } from "react-redux";
import { selectFormState } from "features/common/commonSlice";

import { handleModalClose } from "features/common/commonSlice";

import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    margin: "1rem auto",
    maxWidth: 500,
  },
  image: {
    width: "100%",
  },
}));

const borderStyles = {
  bgcolor: "background.paper",
  border: 1,
};

const ImageUp: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();
  const formState = useSelector(selectFormState);
  return (
    <div>
      <Box
        sx={{ ...borderStyles, borderRadius: 1, borderColor: "grey.400" }}
        className={classes.box}
      >
        <IconButton
          color="inherit"
          onClick={() => {
            dispatch(handleModalClose());
          }}
        >
          <CancelIcon />
        </IconButton>
        <img
          src={formState.targetImageSrc}
          className={classes.image}
          alt="img up"
        />
      </Box>
    </div>
  );
};

export default ImageUp;
