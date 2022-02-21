import React, { useEffect, ReactNode } from "react";
import { AppDispatch } from "app/store";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { selectLoginUser, fetchAsyncSignOut } from "features/auth/authSlice";
import { selectSubjects, handleModalOpen } from "features/common/commonSlice";

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
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpIcon from "@mui/icons-material/Help";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: ReactNode;
}

const DrawerHeader: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = async () => {
    await dispatch(fetchAsyncSignOut());
  };

  const current = {
    textDecoration: "none",
    background: "rgb(61 170 251 / 11%)",
    width: "100%",
    display: "inline-block",
  };

  const user = useSelector(selectLoginUser);
  const subjects = useSelector(selectSubjects);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <div className={styles.drawerHeader__userBox}>
        <p className={styles.drawerHeader__name}>
          {user.data.userName}
          {!user.data.userIsStudent && <>先生</>}
        </p>
        <p className={styles.drawerHeader__scholl}>{user.data.schoolName}</p>
        <p className={styles.drawerHeader__scholl}>
          {user.data.userIsStudent && user.data.groupName}
        </p>
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
        {subjects.data.map((subject, index) => (
          <NavLink
            exact
            to={"/room/" + subject.id}
            className={styles.drawerHeader__nav}
            activeStyle={current}
            key={index}
          >
            <ListItem button key={subject.id}>
              <ListItemIcon>
                <SensorDoorRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={subject.subjectName + "の部屋"} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <div className={styles.drawerHeader__userBox}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          className={styles.drawerHeader__button}
          onClick={() => {
            dispatch(
              handleModalOpen({
                formNumber: 1,
                targetImageSrc: "",
              })
            );
          }}
        >
          {user.data.userIsStudent ? "質問を投稿する" : "お知らせを投稿"}
        </Button>
      </div>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <SettingsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="設定" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="使い方" />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="ログアウト" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar
          style={{ color: "#ffffff", backgroundColor: "#3da9fc" }}
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
