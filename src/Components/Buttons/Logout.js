import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Logout from "@material-ui/icons/ArrowBackIosRounded";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: "white !important"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Fab
        onClick={() => props.handleLogout()}
        size="small"
        color="white"
        className={classes.fab}
      >
        <Logout />
      </Fab>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButtons);
