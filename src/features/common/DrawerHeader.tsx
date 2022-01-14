import React from "react";
import { AppDispatch } from "app/store";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { makeStyles, useTheme } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import styles from "features/common/DrawerHeader.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import grey from "@material-ui/core/colors/grey";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SensorDoorRoundedIcon from "@mui/icons-material/SensorDoorRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const useStyles = makeStyles((theme: Theme) => ({
  // button: {
  //   padding: theme.spacing(1.5, 3),
  //   margin: theme.spacing(3, 2),
  // },
}));

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: any;
}

const DrawerHeader: React.FC<Props> = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const classes = useStyles();

  const current = {
    color: "#0679EB",
    textDecoration: "none",
    background: grey[100],
    width: "100%",
    display: "inline-block",
  };

  // ダミー
  const subjects = [
    { subjectsId: 1, subjectsName: "1年国語" },
    { subjectsId: 2, subjectsName: "1年数学" },
    { subjectsId: 3, subjectsName: "1年理科" },
    { subjectsId: 4, subjectsName: "1年社会" },
    { subjectsId: 5, subjectsName: "1年英語" },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <div className={styles.drawerHeader__userBox}>
        <p className={styles.drawerHeader__name}>下村芽生</p>
        <p className={styles.drawerHeader__scholl}>HAL名古屋</p>
        <p className={styles.drawerHeader__scholl}>IW13A203</p>
      </div>
      <Divider />
      <List>
        <NavLink
          exact
          to="/home"
          className={styles.drawerHeader__nav}
          activeStyle={current}
        >
          <ListItem button>
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="ホーム" />
          </ListItem>
        </NavLink>
        <NavLink
          exact
          to="/"
          className={styles.drawerHeader__nav}
          activeStyle={current}
        >
          <ListItem button>
            <ListItemIcon>
              <MailOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="通知" />
          </ListItem>
        </NavLink>
        <NavLink
          exact
          to="/"
          className={styles.drawerHeader__nav}
          activeStyle={current}
        >
          <ListItem button>
            <ListItemIcon>
              <NotificationsRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="学校からのお知らせ" />
          </ListItem>
        </NavLink>
        {subjects.map((subject, index) => (
          <NavLink
            exact
            to={"/room/" + subject.subjectsId}
            className={styles.drawerHeader__nav}
            activeStyle={current}
            key={index}
          >
            <ListItem button key={subject.subjectsId}>
              <ListItemIcon>
                <SensorDoorRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={subject.subjectsName + "の部屋"} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Button
        // className={classes.button}
        variant="contained"
        size="small"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => {
          // dispatch(
          //   handleOpen({
          //     formNumber: 1,
          //   })
          // );
        }}
      >
        質問を投稿する
      </Button>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>ああ</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              しりたいもん
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </div>
  );
};

export default DrawerHeader;
