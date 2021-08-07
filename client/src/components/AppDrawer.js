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

export default function AppDrawer(props) {
  return (
    <Drawer anchor={"left"} open={props.open} onClose={props.onClose}>
      <List>
        {props.drawerList.map(props.renderListItem)}
        <ListItem button onClick={props.onMyScoreboardsClick}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"My Scoreboards"} />
          {props.myBoardsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={props.myBoardsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {props.scoreboardsData &&
              props.scoreboardsData.map(props.renderMyScoreboardsListItem)}
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
