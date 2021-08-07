import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import * as PropTypes from "prop-types";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function AppDrawer({
  open,
  onClose,
  onMyScoreboardsClick,
  myBoardsOpen,
  scoreboardsData,
  setDrawerIsOpen,
  setIsAddScoreboardDialogOpen,
}) {
  let history = useHistory();
  const classes = useStyles();
  const drawerList = [
    {
      text: "Home",
      icon: <HomeIcon />,
      callback: () => {
        history.push("/");
        setDrawerIsOpen(false);
      },
    },
    {
      text: "Create New Scoreboard",
      icon: <AddIcon />,
      callback: () => {
        setIsAddScoreboardDialogOpen(true);
      },
    },
  ];
  const renderListItem = ({ text, icon, callback }) => {
    return (
      <ListItem button key={text} onClick={callback}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    );
  };
  const renderMyScoreboardsListItem = (scoreboard) => (
    <ListItem button className={classes.nested}>
      <ListItemIcon>
        <DashboardOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={scoreboard.title} />
    </ListItem>
  );

  return (
    <Drawer anchor={"left"} open={open} onClose={onClose}>
      <List>
        {drawerList.map(renderListItem)}
        <ListItem button onClick={onMyScoreboardsClick}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"My Scoreboards"} />
          {myBoardsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={myBoardsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {scoreboardsData &&
              scoreboardsData.map(renderMyScoreboardsListItem)}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}

AppDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  drawerList: PropTypes.any,
  renderListItem: PropTypes.func,
  onMyScoreboardsClick: PropTypes.func,
  myBoardsOpen: PropTypes.bool,
  scoreboardsData: PropTypes.any,
  renderMyScoreboardsListItem: PropTypes.func,
};
