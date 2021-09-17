import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import * as PropTypes from "prop-types";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useQuery } from "@apollo/client";
import { GET_SCOREBOARDS } from "../gql/queries/scoreboard.queries";
import { translateScoreboardTitleToUrl } from "../utils";

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
  setDrawerIsOpen,
  setIsAddScoreboardDialogOpen,
}) {
  let history = useHistory();
  const classes = useStyles();
  const {
    loading,
    error,
    data: { getScoreboards: scoreboardsData } = {},
  } = useQuery(GET_SCOREBOARDS);
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
      disabled: scoreboardsData && scoreboardsData.length > 4,
      callback: () => {
        setIsAddScoreboardDialogOpen(true);
      },
    },
  ];
  const renderListItem = ({ text, icon, callback, disabled }) => {
    return (
      <ListItem disabled={disabled} button key={text} onClick={callback}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    );
  };
  const renderMyScoreboardsListItem = ({ title }) => (
    <ListItem
      button
      className={classes.nested}
      onClick={() => {
        history.push(`/my-boards/${translateScoreboardTitleToUrl(title)}`);
        setDrawerIsOpen(false);
      }}
    >
      <ListItemIcon>
        <DashboardOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={title} />
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
